"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { TitleEditor } from "@/components/tiptap/tiptap-templates/title-editor/title-editor";
import { useGenerateUniqueSlug } from "@/hooks/post-hook";
import { X, Settings, Trash2, ArrowLeft, Send } from "lucide-react";
import { PostSettingsSheet } from "./post-settings-sheet";

interface PostEditorProps {
  mode: "create" | "edit";
  initialData?: {
    title: string;
    slug: string;
    excerpt: string;
    content: any;
    featuredImage: string;
    status: string;
    id?: string;
  };
  onSave: (data: {
    title: string;
    slug?: string;
    excerpt?: string;
    content: any;
    featuredImage?: string;
    status?: string;
  }) => void;
  onDelete?: () => void;
  isLoading?: boolean;
  isDeleting?: boolean;
}

export function PostEditor({
  mode,
  initialData,
  onSave,
  onDelete,
  isLoading = false,
  isDeleting = false,
}: PostEditorProps) {
  const router = useRouter();
  const { mutateAsync: generateSlugMutation } = useGenerateUniqueSlug();

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState<any>(initialData?.content || null);
  const [featuredImage, setFeaturedImage] = useState(
    initialData?.featuredImage || ""
  );
  const [status, setStatus] = useState<string>(initialData?.status || "draft");
  const [showSettings, setShowSettings] = useState(false);
  const [isSlugManuallyChanged, setIsSlugManuallyChanged] = useState(false);

  // 초기 데이터가 변경될 때 상태 업데이트
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setSlug(initialData.slug);
      setExcerpt(initialData.excerpt);
      setContent(initialData.content);
      setFeaturedImage(initialData.featuredImage);
      setStatus(initialData.status || "draft");
    }
  }, [initialData]);

  // 제목 변경 시 슬러그 미리보기 생성 (사용자가 슬러그를 수동으로 변경하지 않은 경우에만)
  const handleTitleChange = async (newTitle: string) => {
    setTitle(newTitle);

    // 슬러그가 수동으로 변경되지 않았고, 제목이 있을 때만 미리보기 생성
    if (!isSlugManuallyChanged && newTitle.trim()) {
      if (
        mode === "create" ||
        (mode === "edit" && newTitle !== initialData?.title)
      ) {
        try {
          const previewSlug = await generateSlugMutation({
            title: newTitle,
            excludeId: mode === "edit" ? initialData?.id : undefined,
          });
          setSlug(previewSlug);
        } catch (error) {
          // 에러는 hook에서 toast로 처리됨
          console.error("슬러그 미리보기 생성 실패:", error);
        }
      }
    }
  };

  // 슬러그 수동 변경 처리
  const handleSlugChange = (newSlug: string) => {
    setSlug(newSlug);
    setIsSlugManuallyChanged(true);
  };

  // 에디터 내용 변경 처리
  const handleContentChange = (newContent: any) => {
    setContent(newContent);
  };

  // 저장 처리 - 단순화됨
  const handleSave = () => {
    if (!title.trim() || !content) {
      toast.error("제목과 내용을 입력해주세요.");
      return;
    }

    // 서비스 레이어에서 모든 슬러그 처리를 담당
    onSave({
      title,
      slug: slug.trim() || undefined, // 빈 값이면 undefined로 전달하여 서비스에서 자동 생성
      excerpt,
      content,
      featuredImage,
      status,
    });
  };

  // 이전 페이지로 돌아가기
  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* 상단 헤더 */}
      <div className="sticky top-0 z-50 bg-background border-b shrink-0">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGoBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              이전
            </Button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(true)}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              설정
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              size="sm"
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              {isLoading
                ? status === "published"
                  ? "저장 중..."
                  : "발행 중..."
                : status === "published"
                ? "저장하기"
                : "발행하기"}
            </Button>
          </div>
        </div>
      </div>

      {/* PostSettingsSheet */}
      <PostSettingsSheet
        open={showSettings}
        onOpenChange={setShowSettings}
        status={status}
        slug={slug}
        excerpt={excerpt}
        featuredImage={featuredImage}
        content={content}
        onStatusChange={setStatus}
        onSlugChange={handleSlugChange}
        onExcerptChange={setExcerpt}
        onFeaturedImageChange={setFeaturedImage}
        onSave={handleSave}
        onDelete={onDelete}
        mode={mode}
        isLoading={isLoading}
        isDeleting={isDeleting}
      />

      <div className="flex flex-1 min-h-0">
        {/* 메인 에디터 영역 */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex-1 min-h-0">
            <TitleEditor
              content={content}
              onChange={handleContentChange}
              fullscreen={true}
              title={title}
              onTitleChange={handleTitleChange}
              postId={initialData?.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
