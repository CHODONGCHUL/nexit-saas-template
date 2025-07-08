"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PenTool,
  Filter,
  BarChart3,
  Plus,
  FileText,
  Eye,
  RefreshCw,
} from "lucide-react";
import { Post } from "@/types/postType";
import { useGetPosts, useCreatePost } from "@/hooks/post-hook";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

export default function AdminBlogManagement() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<
    "published" | "draft" | "all"
  >("all");
  const { data: posts, isLoading, error, refetch } = useGetPosts(statusFilter);
  const createPost = useCreatePost();

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
          toast.success("✅ 새 포스트가 생성되었습니다");
        },
        onError: (error) => {
          console.error("Draft 포스트 생성 실패:", error);
          toast.error("❌ 새 포스트 생성에 실패했습니다.");
        },
      }
    );
  };

  // 통계 계산
  const publishedCount =
    posts?.filter((post) => post.status === "published").length || 0;
  const draftCount =
    posts?.filter((post) => post.status === "draft").length || 0;
  const totalCount = posts?.length || 0;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">블로그 관리</h1>
            <p className="text-muted-foreground">
              모든 포스트를 관리하고 새 글을 작성하세요.
            </p>
          </div>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">블로그 관리</h1>
            <p className="text-muted-foreground">
              모든 포스트를 관리하고 새 글을 작성하세요.
            </p>
          </div>
        </div>
        <div className="text-center py-12 border rounded-lg bg-red-50">
          <p className="text-red-500 mb-4">포스트를 불러오는데 실패했습니다.</p>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            다시 시도
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <FileText className="h-8 w-8" />
            블로그 관리
          </h1>
          <p className="text-muted-foreground">
            모든 포스트를 관리하고 새 글을 작성하세요.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/blog">
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              공개 블로그 보기
            </Button>
          </Link>
          <Button onClick={handleCreateNewPost} disabled={createPost.isPending}>
            <Plus className="mr-2 h-4 w-4" />
            {createPost.isPending ? "생성 중..." : "새 글 작성"}
          </Button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 포스트</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount}</div>
            <p className="text-xs text-muted-foreground">
              총 {totalCount}개의 포스트
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">발행됨</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {publishedCount}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalCount > 0
                ? `전체의 ${Math.round((publishedCount / totalCount) * 100)}%`
                : "0%"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">초안</CardTitle>
            <BarChart3 className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {draftCount}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalCount > 0
                ? `전체의 ${Math.round((draftCount / totalCount) * 100)}%`
                : "0%"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 필터 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground mr-2">필터:</span>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
            >
              전체 ({totalCount})
            </Button>
            <Button
              variant={statusFilter === "published" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("published")}
            >
              발행됨 ({publishedCount})
            </Button>
            <Button
              variant={statusFilter === "draft" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("draft")}
            >
              초안 ({draftCount})
            </Button>
          </div>
        </div>

        <Button
          onClick={() => refetch()}
          variant="outline"
          size="sm"
          disabled={isLoading}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          새로고침
        </Button>
      </div>

      {/* 데이터 테이블 */}
      <Card>
        <CardContent className="p-0">
          {posts && posts.length > 0 ? (
            <DataTable
              columns={columns}
              data={posts}
              searchKey="title"
              searchPlaceholder="포스트 제목으로 검색..."
            />
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                {statusFilter === "draft"
                  ? "아직 초안 포스트가 없습니다."
                  : statusFilter === "published"
                  ? "아직 발행된 포스트가 없습니다."
                  : "아직 포스트가 없습니다."}
              </p>
              <Button
                onClick={handleCreateNewPost}
                disabled={createPost.isPending}
              >
                <Plus className="mr-2 h-4 w-4" />
                {createPost.isPending ? "생성 중..." : "첫 포스트 작성하기"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
