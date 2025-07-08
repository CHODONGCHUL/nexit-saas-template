"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Post } from "@/types/postType";

interface BlogCardProps {
  post: Post;
}

// TipTap content에서 텍스트 추출 함수
function extractTextFromContent(content: any): string {
  if (!content) return "";

  let text = "";

  function traverse(node: any) {
    if (node.type === "text") {
      text += node.text;
    } else if (node.content) {
      node.content.forEach(traverse);
    }
  }

  if (content.content) {
    content.content.forEach(traverse);
  }

  return text;
}

// 텍스트를 지정된 길이로 자르고 줄임표 추가
function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

export function BlogCard({ post }: BlogCardProps) {
  // 요약이 없으면 content에서 텍스트 추출
  const getExcerpt = () => {
    if (post.excerpt) return post.excerpt;
    const contentText = extractTextFromContent(post.content);
    return truncateText(contentText);
  };

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <Card className="h-full overflow-hidden transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:shadow-primary/10 border-0 shadow-md hover:bg-card/95 backdrop-blur-sm">
        {/* 썸네일 이미지 */}
        {post.featured_image && (
          <div className="aspect-video overflow-hidden relative">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        <CardContent className="p-6 relative z-10">
          {/* 제목 */}
          <h3 className="text-lg font-semibold line-clamp-2 mb-3 group-hover:text-primary transition-all duration-300 transform group-hover:translate-x-1">
            {post.title}
          </h3>

          {/* 요약/내용 미리보기 */}
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed transition-all duration-300 group-hover:text-foreground/80">
            {getExcerpt()}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
