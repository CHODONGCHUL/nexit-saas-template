import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getPostById,
  getPosts,
  generateUniqueSlug,
  checkSlugUniqueness,
} from "@/services/post";
import { toast } from "sonner";

// Post 생성
export function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

// Post 업데이트
export function useUpdatePost() {
  return useMutation({
    mutationFn: ({
      postId,
      postData,
    }: {
      postId: string;
      postData: {
        title: string;
        slug?: string;
        excerpt?: string;
        content: any;
        featuredImage?: string;
        status?: string;
      };
    }) => updatePost(postId, postData),
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}

// Post 삭제
export function useDeletePost() {
  return useMutation({
    mutationFn: deletePost,
    onError: (error: Error) => {
      toast.error(error.message || "포스트 삭제에 실패했습니다.");
    },
  });
}

// 슬러그 생성 (미리보기용)
export function useGenerateUniqueSlug() {
  return useMutation({
    mutationFn: ({ title, excludeId }: { title: string; excludeId?: string }) =>
      generateUniqueSlug(title, excludeId),
    onError: (error: Error) => {
      toast.error(error.message || "슬러그 생성에 실패했습니다.");
    },
  });
}

// Post 조회 (slug로)
export function useGetPost(slug: string) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () => getPost(slug),
    enabled: !!slug,
  });
}

// Post 조회 (ID로)
export function useGetPostById(postId: string) {
  return useQuery({
    queryKey: ["post", "id", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
}

// Post 목록 조회
export function useGetPosts(status?: "published" | "draft" | "all") {
  return useQuery({
    queryKey: ["posts", status],
    queryFn: () => getPosts(status),
  });
}

// 슬러그 중복 검사 (실시간 검증용)
export function useCheckSlugUniqueness() {
  return useMutation({
    mutationFn: ({ slug, excludeId }: { slug: string; excludeId?: string }) =>
      checkSlugUniqueness(slug, excludeId),
    onError: (error: Error) => {
      toast.error(error.message || "슬러그 검증에 실패했습니다.");
    },
  });
}
