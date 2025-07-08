import { createClient } from "@/lib/supabase/client";
import { Post } from "@/types/postType";

const supabase = createClient();

// ISR on-demand revalidate 함수
const revalidatePost = async (slug: string, locale: string = "ko") => {
  try {
    const response = await fetch("/api/blog/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug, locale }),
    });

    if (!response.ok) {
      console.error("Revalidation failed:", await response.text());
    }
  } catch (error) {
    console.error("Revalidation error:", error);
  }
};

// Post 생성
export const createPost = async (postData: {
  title: string;
  slug?: string;
  excerpt?: string;
  content: any;
  featuredImage?: string;
  status?: string;
}): Promise<Post> => {
  try {
    // 사용자 인증 확인
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("로그인이 필요합니다.");
    }

    // 슬러그 처리 - 제공되지 않았거나 빈 값이면 제목에서 자동 생성
    let finalSlug = postData.slug?.trim();
    if (!finalSlug) {
      finalSlug = await generateUniqueSlug(postData.title);
    } else {
      // 슬러그가 제공된 경우 중복 검사
      const isUnique = await checkSlugUniqueness(finalSlug);
      if (!isUnique) {
        throw new Error(
          "이미 존재하는 슬러그입니다. 다른 슬러그를 사용해주세요."
        );
      }
    }

    const { data: post, error } = await supabase
      .from("posts")
      .insert({
        title: postData.title,
        content: postData.content,
        slug: finalSlug,
        excerpt: postData.excerpt?.trim() || null,
        status: postData.status || "published",
        featured_image: postData.featuredImage?.trim() || null,
        author_id: user.id,
        published_at:
          postData.status === "draft" ? null : new Date().toISOString(),
      })
      .select("*")
      .single();

    if (error) throw new Error(`포스트 생성에 실패했습니다: ${error.message}`);

    // ISR revalidate 실행
    await revalidatePost(finalSlug);

    return post;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("포스트 생성 중 예상치 못한 오류가 발생했습니다.");
  }
};

// Post 업데이트
export const updatePost = async (
  postId: string,
  postData: {
    title: string;
    slug?: string;
    excerpt?: string;
    content: any;
    featuredImage?: string;
    status?: string;
  }
): Promise<Post> => {
  try {
    // 슬러그 처리 - 제공되지 않았거나 빈 값이면 제목에서 자동 생성
    let finalSlug = postData.slug?.trim();
    if (!finalSlug) {
      finalSlug = await generateUniqueSlug(postData.title, postId);
    } else {
      // 슬러그가 제공된 경우 중복 검사 (현재 포스트 제외)
      const isUnique = await checkSlugUniqueness(finalSlug, postId);
      if (!isUnique) {
        throw new Error(
          "이미 존재하는 슬러그입니다. 다른 슬러그를 사용해주세요."
        );
      }
    }

    const { data: post, error } = await supabase
      .from("posts")
      .update({
        title: postData.title,
        slug: finalSlug,
        excerpt: postData.excerpt?.trim() || null,
        content: postData.content,
        featured_image: postData.featuredImage?.trim() || null,
        status: postData.status,
        updated_at: new Date().toISOString(),
        // status가 published로 변경될 때만 published_at 설정 (기존에 없던 경우)
        ...(postData.status === "published" && {
          published_at: new Date().toISOString(),
        }),
      })
      .eq("id", postId)
      .select("*")
      .single();

    if (error)
      throw new Error(`포스트 업데이트에 실패했습니다: ${error.message}`);

    // ISR revalidate 실행
    await revalidatePost(finalSlug);

    return post;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("포스트 업데이트 중 예상치 못한 오류가 발생했습니다.");
  }
};

// Post 삭제
export const deletePost = async (postId: string): Promise<void> => {
  const { error } = await supabase.from("posts").delete().eq("id", postId);
  if (error) throw error;
};

// Post 조회 (slug로)
export const getPost = async (slug: string): Promise<Post | null> => {
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // No rows found
    throw error;
  }

  return post;
};

// Post 조회 (ID로)
export const getPostById = async (postId: string): Promise<Post | null> => {
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw error;
  }

  return post;
};

// Post 목록 조회
export const getPosts = async (
  status?: "published" | "draft" | "all"
): Promise<Post[]> => {
  let query = supabase.from("posts").select("*");

  // status 필터 적용
  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  // 정렬 순서: published는 published_at 우선, draft는 updated_at 우선
  if (status === "draft") {
    query = query.order("updated_at", { ascending: false });
  } else {
    query = query
      .order("published_at", { ascending: false })
      .order("created_at", { ascending: false });
  }

  const { data: posts, error } = await query;

  if (error) throw error;
  return posts || [];
};

// 슬러그 생성 (한글 유지)
export const generateSlug = (title: string): string => {
  // 한글, 영문, 숫자는 유지하고 특수문자만 하이픈으로 변경
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") // 공백을 하이픈으로
    .replace(/[^\w\u3131-\u3163\uac00-\ud7a3-]/g, "-") // 한글, 영문, 숫자, 하이픈만 유지
    .replace(/-+/g, "-") // 연속된 하이픈을 하나로
    .replace(/^-|-$/g, ""); // 시작과 끝의 하이픈 제거
};

// 고유한 슬러그 생성
export const generateUniqueSlug = async (
  title: string,
  excludeId?: string
): Promise<string> => {
  let baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;

  // 기본 슬러그가 비어있으면 기본값 사용
  if (!slug || slug.length === 0) {
    slug = "untitled";
    baseSlug = "untitled";
  }

  // 슬러그가 고유할 때까지 반복
  while (!(await checkSlugUniqueness(slug, excludeId))) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

// 슬러그 중복 확인
export const checkSlugUniqueness = async (
  slug: string,
  excludeId?: string
): Promise<boolean> => {
  let query = supabase.from("posts").select("id").eq("slug", slug);

  if (excludeId) {
    query = query.neq("id", excludeId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return (data?.length || 0) === 0;
};
