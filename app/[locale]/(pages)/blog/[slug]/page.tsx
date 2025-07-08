import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/postType";
import { tiptapJsonToHtml } from "@/lib/tiptap-utils";
import { AdminEditButton } from "@/components/blog/admin-edit-button";

// Tiptap node styles for blog content
import "@/components/tiptap/tiptap-node/paragraph-node/paragraph-node.scss";
import "@/components/tiptap/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap/tiptap-node/image-node/image-node.scss";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const supabase = await createClient();
  const resolvedParams = await params;

  const decodedSlug = decodeURIComponent(resolvedParams.slug);

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", decodedSlug)
    .eq("status", "published")
    .single();

  if (!post) {
    return { title: "포스트를 찾을 수 없습니다" };
  }

  return {
    title: post.title,
    description: post.excerpt || post.title,
  };
}

export async function generateStaticParams() {
  return [];
}

export const revalidate = 86400; // 24시간 (24 * 60 * 60);
export const dynamic = "force-static";
export const dynamicParams = true;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const supabase = await createClient();
  const resolvedParams = await params;

  // URL 디코딩 (한글 URL 지원)
  const decodedSlug = decodeURIComponent(resolvedParams.slug);

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", decodedSlug)
    .eq("status", "published")
    .single();

  if (error || !post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Tiptap JSON을 HTML로 변환
  const contentHtml = tiptapJsonToHtml(post.content);

  return (
    <div className="relative min-h-screen">
      {/* 배경 썸네일 - 고정 위치 */}
      {post.featured_image && (
        <div className="fixed inset-0 w-full h-screen max-h-[70vh] overflow-hidden z-0">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
        </div>
      )}

      {/* Admin 버튼 */}
      <div className="relative z-20 container mx-auto py-8">
        <div className="flex justify-end">
          <AdminEditButton postSlug={post.slug} />
        </div>
      </div>

      {/* 제목과 날짜 영역 - 배경 위에 표시 */}
      <div
        className={`relative z-10 flex items-center ${
          post.featured_image ? "h-screen max-h-[70vh] pt-20" : "py-16"
        }`}
      >
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <h1
              className={`text-4xl md:text-6xl font-bold mb-6 leading-tight ${
                post.featured_image
                  ? "text-white drop-shadow-lg"
                  : "text-foreground"
              }`}
            >
              {post.title}
            </h1>

            {post.excerpt && (
              <p
                className={`text-xl md:text-2xl mb-6 leading-relaxed ${
                  post.featured_image
                    ? "text-white/90 drop-shadow-md"
                    : "text-muted-foreground"
                }`}
              >
                {post.excerpt}
              </p>
            )}

            <div
              className={`flex items-center gap-4 ${
                post.featured_image
                  ? "text-white/80 drop-shadow-md"
                  : "text-muted-foreground border-b pb-6"
              }`}
            >
              <time
                dateTime={post.published_at || post.created_at}
                className="text-lg"
              >
                {formatDate(post.published_at || post.created_at)}
              </time>
            </div>
          </div>
        </div>
      </div>

      {/* 본문 영역 - 스크롤되는 콘텐츠 */}
      <article className="relative z-20 bg-background min-h-screen rounded-t-3xl -mt-8 pt-16">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="tiptap ProseMirror prose prose-lg max-w-none mb-16">
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </div>

          {/* 블로그 목록으로 버튼 */}
          <div className="flex justify-center pb-16">
            <Link href="/blog">
              <Button variant="outline" size="lg" className="px-8 py-3">
                ← 블로그 목록으로
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
