import React from "react";
import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Post } from "@/types/postType";
import { AdminActionButtons } from "@/components/blog/admin-action-buttons";
import { BlogCard } from "@/components/blog/blog-card";

export const metadata: Metadata = {
  title: "블로그",
  description: "최신 블로그 포스트를 확인해보세요.",
};

// ISR on-demand 설정
export const revalidate = false;
export const dynamic = "force-static";

export default async function BlogPage() {
  const supabase = await createClient();

  // 서버 컴포넌트에서 published 포스트만 fetch (ISR)
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("블로그 포스트 로드 실패:", error);
    return <div>포스트를 불러오는데 실패했습니다.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      {/* 헤더 영역 */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">블로그</h1>
          <p className="text-lg text-muted-foreground">
            최신 소식과 유용한 정보를 확인해보세요.
          </p>
        </div>
        {/* Admin 글쓰기 버튼 */}
        <AdminActionButtons />
      </div>

      {/* Published 포스트 목록 (ISR) */}
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">
            아직 게시된 포스트가 없습니다.
          </p>
          <AdminActionButtons />
        </div>
      )}
    </div>
  );
}
