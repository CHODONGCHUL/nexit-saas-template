"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  FileText,
  BarChart3,
  Shield,
  Activity,
  TrendingUp,
  Eye,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { useGetPosts } from "@/hooks/post-hook";

export default function AdminDashboard() {
  const { data: posts } = useGetPosts("all");

  // 통계 계산
  const totalPosts = posts?.length || 0;
  const publishedPosts =
    posts?.filter((post) => post.status === "published").length || 0;
  const draftPosts =
    posts?.filter((post) => post.status === "draft").length || 0;

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Shield className="h-8 w-8 text-red-600" />
            관리자 대시보드
          </h1>
          <p className="text-muted-foreground">
            사이트 전체를 관리하고 모니터링하세요.
          </p>
        </div>
        <Badge variant="outline" className="text-red-600 border-red-600">
          <Shield className="h-3 w-3 mr-1" />
          Admin Mode
        </Badge>
      </div>

      {/* 빠른 액세스 버튼들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/admin/blog">
          <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
            <FileText className="h-6 w-6" />
            <span className="text-sm">블로그 관리</span>
          </Button>
        </Link>
        <Link href="/blog">
          <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
            <Eye className="h-6 w-6" />
            <span className="text-sm">공개 블로그 보기</span>
          </Button>
        </Link>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 포스트</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              {publishedPosts}개 발행, {draftPosts}개 초안
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">발행된 포스트</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {publishedPosts}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalPosts > 0
                ? `전체의 ${Math.round((publishedPosts / totalPosts) * 100)}%`
                : "0%"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">최근 업데이트</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {posts && posts.length > 0
                ? new Date(
                    Math.max(
                      ...posts.map((p) =>
                        new Date(p.updated_at || p.created_at).getTime()
                      )
                    )
                  ).toLocaleDateString("ko-KR")
                : "없음"}
            </div>
            <p className="text-xs text-muted-foreground">
              가장 최근 포스트 업데이트
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 최근 활동 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              최근 포스트
            </CardTitle>
          </CardHeader>
          <CardContent>
            {posts && posts.length > 0 ? (
              <div className="space-y-3">
                {posts.slice(0, 5).map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {post.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(
                          post.updated_at || post.created_at
                        ).toLocaleDateString("ko-KR")}
                      </p>
                    </div>
                    <Badge
                      variant={
                        post.status === "published" ? "default" : "secondary"
                      }
                      className="ml-2"
                    >
                      {post.status === "published" ? "발행" : "초안"}
                    </Badge>
                  </div>
                ))}
                <Link href="/admin/blog">
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    모든 포스트 보기
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                아직 포스트가 없습니다.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              빠른 작업
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/admin/blog/new">
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />새 포스트 작성
                </Button>
              </Link>
              <Link href="/admin/blog">
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  블로그 관리
                </Button>
              </Link>
              <Link href="/blog">
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  공개 사이트 보기
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="w-full justify-start" variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  일반 대시보드
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
