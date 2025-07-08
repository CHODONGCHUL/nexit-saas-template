"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PenTool, Settings } from "lucide-react";
import { useCreatePost } from "@/hooks/post-hook";
import { useUserRole } from "@/hooks/user-hook";
import Link from "next/link";

export function AdminActionButtons() {
  const router = useRouter();
  const { data: userRole } = useUserRole();
  const createPost = useCreatePost();

  const isAdmin = userRole?.role === "admin";

  // Admin이 아닌 경우 렌더링하지 않음
  if (!isAdmin) {
    return null;
  }

  const handleCreateNewPost = () => {
    createPost.mutate(
      {
        title: "제목없음",
        content: "",
        status: "draft",
      },
      {
        onSuccess: (post) => {
          router.push(`/blog/${post.slug}/edit`);
        },
        onError: (error) => {
          console.error("Draft 포스트 생성 실패:", error);
          toast.error("새 포스트 생성에 실패했습니다.");
        },
      }
    );
  };

  return (
    <div className="flex items-center gap-2">
      <Link href="/dashboard/blog">
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          관리
        </Button>
      </Link>
      <Button onClick={handleCreateNewPost} disabled={createPost.isPending}>
        <PenTool className="mr-2 h-4 w-4" />
        {createPost.isPending ? "생성 중..." : "글쓰기"}
      </Button>
    </div>
  );
}
