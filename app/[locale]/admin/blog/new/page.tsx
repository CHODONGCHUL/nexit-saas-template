"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PenTool, ArrowLeft, Loader2 } from "lucide-react";
import { useCreatePost } from "@/hooks/post-hook";
import Link from "next/link";

export default function AdminNewPost() {
  const router = useRouter();
  const createPost = useCreatePost();

  useEffect(() => {
    // 페이지가 로드되면 자동으로 새 포스트 생성
    createPost.mutate(
      {
        title: "제목없음",
        content: "",
        status: "draft",
      },
      {
        onSuccess: (post) => {
          toast.success("✅ 새 포스트가 생성되었습니다");
          router.push(`/blog/${post.slug}/edit`);
        },
        onError: (error) => {
          console.error("Draft 포스트 생성 실패:", error);
          toast.error("❌ 새 포스트 생성에 실패했습니다.");
        },
      }
    );
  }, [createPost, router]);

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <PenTool className="h-8 w-8" />새 포스트 작성
          </h1>
          <p className="text-muted-foreground">
            새로운 블로그 포스트를 생성하는 중입니다...
          </p>
        </div>
        <Link href="/admin/blog">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            블로그 관리로 돌아가기
          </Button>
        </Link>
      </div>

      {/* 생성 중 카드 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />새 포스트 생성 중...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2">
              새 포스트를 생성하고 있습니다
            </p>
            <p className="text-muted-foreground text-center">
              잠시만 기다려주세요. 생성이 완료되면 자동으로 편집 페이지로
              이동합니다.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 실패 시 대안 */}
      {createPost.error && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">생성 실패</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-red-600 mb-4">포스트 생성에 실패했습니다.</p>
              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    createPost.mutate({
                      title: "제목없음",
                      content: "",
                      status: "draft",
                    })
                  }
                  disabled={createPost.isPending}
                >
                  <PenTool className="mr-2 h-4 w-4" />
                  다시 시도
                </Button>
                <Link href="/admin/blog">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    돌아가기
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
