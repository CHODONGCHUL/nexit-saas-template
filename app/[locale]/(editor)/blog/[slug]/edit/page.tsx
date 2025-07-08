"use client";

import React, { use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PostEditor } from "@/components/post/post-editor";
import { useGetPost, useUpdatePost, useDeletePost } from "@/hooks/post-hook";

interface EditBlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function EditBlogPost({ params }: EditBlogPostProps) {
  const { slug: paramSlug } = use(params);
  const router = useRouter();

  const decodedSlug = decodeURIComponent(paramSlug);

  const { data: post, isLoading: isLoadingPost } = useGetPost(decodedSlug);
  const updatePost = useUpdatePost();
  const deletePost = useDeletePost();

  const handleSave = (data: {
    title: string;
    slug?: string;
    excerpt?: string;
    content: any;
    featuredImage?: string;
  }) => {
    if (!post?.id) return;

    updatePost.mutate(
      { postId: post.id, postData: data },
      {
        onSuccess: (updatedPost) => {
          toast.success("포스트가 성공적으로 수정되었습니다!");
          router.push(`/blog/${updatedPost.slug}`);
        },
        onError: (error) => {
          console.error("포스트 수정 실패:", error);
          toast.error("포스트 수정에 실패했습니다.");
        },
      }
    );
  };

  const handleDelete = () => {
    if (!post?.id) return;
    if (!confirm("정말로 이 포스트를 삭제하시겠습니까?")) return;

    deletePost.mutate(post.id, {
      onSuccess: () => {
        toast.success("포스트가 삭제되었습니다.");
        router.push("/blog");
      },
      onError: (error) => {
        console.error("포스트 삭제 실패:", error);
        toast.error("포스트 삭제에 실패했습니다.");
      },
    });
  };

  if (isLoadingPost) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
        <div className="text-center">로딩 중...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
        <div className="text-center">포스트를 찾을 수 없습니다.</div>
      </div>
    );
  }

  const initialData = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || "",
    content: post.content || null,
    featuredImage: post.featured_image || "",
    status: post.status || "draft",
    id: post.id,
  };

  return (
    <PostEditor
      mode="edit"
      initialData={initialData}
      onSave={handleSave}
      onDelete={handleDelete}
      isLoading={updatePost.isPending}
      isDeleting={deletePost.isPending}
    />
  );
}
