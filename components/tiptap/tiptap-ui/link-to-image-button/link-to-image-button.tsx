"use client";

import * as React from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/tiptap/tiptap-ui-primitive/button";
import { ImagePlusIcon } from "@/components/tiptap/tiptap-icons/image-plus-icon";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

interface LinkToImageButtonProps {
  editor?: Editor | null;
  position: { top: number; left: number };
  visible: boolean;
  linkUrl: string;
  onConvert?: () => void;
}

const LinkToImageFloatingButton: React.FC<LinkToImageButtonProps> = ({
  editor: providedEditor,
  position,
  visible,
  linkUrl,
  onConvert,
}) => {
  const editor = useTiptapEditor(providedEditor);
  const [isConverting, setIsConverting] = React.useState(false);

  const handleConvertToImage = React.useCallback(async () => {
    if (!editor || !linkUrl || isConverting) return;

    try {
      setIsConverting(true);

      // URL 유효성 검사
      let validUrl: URL;
      try {
        validUrl = new URL(linkUrl);
      } catch (error) {
        throw new Error("유효하지 않은 URL입니다.");
      }

      // HTTP/HTTPS만 허용
      if (!["http:", "https:"].includes(validUrl.protocol)) {
        throw new Error("HTTP 또는 HTTPS URL만 허용됩니다.");
      }

      // 이미지 파일 확장자 확인 (간단한 체크)
      const imageExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".webp",
        ".svg",
        ".bmp",
      ];
      const pathname = validUrl.pathname.toLowerCase();
      const hasImageExtension = imageExtensions.some((ext) =>
        pathname.endsWith(ext)
      );

      // 확장자가 없거나 이미지 확장자가 아닌 경우 경고 (하지만 진행은 허용)
      if (!hasImageExtension) {
        const proceed = confirm(
          "이 링크가 이미지 파일인지 확실하지 않습니다. 계속 진행하시겠습니까?"
        );
        if (!proceed) {
          return;
        }
      }

      // 현재 선택된 링크를 외부 이미지 URL로 교체
      editor.chain().focus().deleteSelection().setImage({ src: linkUrl }).run();

      onConvert?.();
    } catch (error) {
      console.error("링크를 이미지로 변환하는 중 오류 발생:", error);
      alert(
        error instanceof Error
          ? error.message
          : "이미지 변환 중 오류가 발생했습니다."
      );
    } finally {
      setIsConverting(false);
    }
  }, [editor, linkUrl, isConverting, onConvert]);

  if (!visible || !editor) return null;

  return (
    <div
      className="fixed z-50 bg-background border rounded-md shadow-lg p-1"
      style={{
        top: position.top,
        left: position.left,
        transform: "translateY(-100%)",
      }}
    >
      <Button
        type="button"
        data-style="ghost"
        onClick={handleConvertToImage}
        disabled={isConverting}
        tooltip="링크를 이미지로 변환"
        className="flex items-center gap-2 px-2 py-1 text-sm"
      >
        <ImagePlusIcon className="w-4 h-4" />
        {isConverting ? "변환 중..." : "이미지로 변환"}
      </Button>
    </div>
  );
};

export { LinkToImageFloatingButton };
