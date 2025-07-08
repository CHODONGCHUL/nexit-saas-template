"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { extractImagesFromContent } from "@/lib/tiptap-utils";

interface PostSettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // 폼 데이터
  status: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  content?: any; // TipTap 콘텐츠
  // 폼 핸들러
  onStatusChange: (status: string) => void;
  onSlugChange: (slug: string) => void;
  onExcerptChange: (excerpt: string) => void;
  onFeaturedImageChange: (featuredImage: string) => void;
  // 액션 핸들러
  onSave: () => void;
  onDelete?: () => void;
  // 상태
  mode: "create" | "edit";
  isLoading?: boolean;
  isDeleting?: boolean;
}

export function PostSettingsSheet({
  open,
  onOpenChange,
  status,
  slug,
  excerpt,
  featuredImage,
  content,
  onStatusChange,
  onSlugChange,
  onExcerptChange,
  onFeaturedImageChange,
  onSave,
  onDelete,
  mode,
  isLoading = false,
  isDeleting = false,
}: PostSettingsSheetProps) {
  // 콘텐츠에서 이미지 추출
  const contentImages = React.useMemo(() => {
    if (!content) return [];
    return extractImagesFromContent(content);
  }, [content]);

  // 대표 이미지 선택 핸들러
  const handleImageSelect = (imageUrl: string) => {
    onFeaturedImageChange(imageUrl);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-96 flex flex-col">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle>포스트 설정</SheetTitle>
          <SheetDescription>포스트의 상세 설정을 관리하세요.</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="status">상태</Label>
                <Select value={status} onValueChange={onStatusChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="상태를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">임시저장</SelectItem>
                    <SelectItem value="published">발행</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="slug">URL 슬러그</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => onSlugChange(e.target.value)}
                  placeholder="비워두면 제목에서 자동 생성됩니다"
                />
                <p className="text-xs text-muted-foreground">
                  비워두면 제목에서 자동으로 생성됩니다
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="excerpt">요약</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => onExcerptChange(e.target.value)}
                  placeholder="비워두면 내용에서 자동으로 생성됩니다"
                  rows={3}
                  className="min-h-20 resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  포스트의 짧은 요약을 작성하세요. 카드와 미리보기에 사용됩니다.
                </p>
              </div>

              <div className="space-y-3">
                <Label htmlFor="featured-image">대표 이미지</Label>

                {/* 콘텐츠 내 이미지 갤러리 */}
                {contentImages.length > 0 && (
                  <div className="space-y-3">
                    <Label className="text-sm text-muted-foreground">
                      콘텐츠에서 이미지 선택:
                    </Label>
                    <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                      {contentImages.map((imageUrl, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleImageSelect(imageUrl)}
                          className={`relative aspect-video rounded-md border-2 overflow-hidden transition-all hover:opacity-80 ${
                            featuredImage === imageUrl
                              ? "border-primary ring-2 ring-primary/20"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <img
                            src={imageUrl}
                            alt={`콘텐츠 이미지 ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // 이미지 로드 실패 시 대체 텍스트 표시
                              e.currentTarget.style.display = "none";
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xs">
                                    이미지 로드 실패
                                  </div>
                                `;
                              }
                            }}
                          />
                          {featuredImage === imageUrl && (
                            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                              <div className="bg-primary text-primary-foreground rounded-full p-1">
                                <Check className="h-3 w-3" />
                              </div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 수동 URL 입력 */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    또는 직접 URL 입력:
                  </Label>
                  <Input
                    id="featured-image"
                    value={featuredImage}
                    onChange={(e) => onFeaturedImageChange(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* 선택된 이미지 미리보기 */}
                {featuredImage && (
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      선택된 대표 이미지:
                    </Label>
                    <div className="relative aspect-video w-full rounded-md border overflow-hidden">
                      <img
                        src={featuredImage}
                        alt="대표 이미지 미리보기"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-sm">
                                이미지를 불러올 수 없습니다
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onFeaturedImageChange("")}
                      className="w-full"
                    >
                      대표 이미지 제거
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="flex flex-col gap-3 p-6 border-t">
          {mode === "edit" && onDelete && (
            <Button
              variant="destructive"
              onClick={onDelete}
              disabled={isDeleting}
              className="flex items-center gap-2 w-full"
            >
              <Trash2 className="h-4 w-4" />
              {isDeleting ? "삭제 중..." : "삭제"}
            </Button>
          )}
          <Button
            onClick={onSave}
            disabled={isLoading}
            className="flex items-center gap-2 w-full"
          >
            {isLoading
              ? mode === "create"
                ? "발행 중..."
                : "저장 중..."
              : mode === "create"
              ? "발행"
              : "저장"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
