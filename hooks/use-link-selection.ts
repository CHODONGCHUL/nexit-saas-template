"use client";

import { useState, useEffect, useCallback } from "react";
import { Editor } from "@tiptap/react";
import { getMarkRange } from "@tiptap/react";

interface LinkSelectionState {
  isLinkSelected: boolean;
  linkUrl: string;
  position: { top: number; left: number };
}

export const useLinkSelection = (editor: Editor | null) => {
  const [linkSelection, setLinkSelection] = useState<LinkSelectionState>({
    isLinkSelected: false,
    linkUrl: "",
    position: { top: 0, left: 0 },
  });

  const updateLinkSelection = useCallback(() => {
    if (!editor) {
      setLinkSelection({
        isLinkSelected: false,
        linkUrl: "",
        position: { top: 0, left: 0 },
      });
      return;
    }

    const { state, view } = editor;
    const { selection } = state;

    // 링크가 활성화되어 있는지 확인
    const isLinkActive = editor.isActive("link");

    if (!isLinkActive || selection.empty) {
      setLinkSelection({
        isLinkSelected: false,
        linkUrl: "",
        position: { top: 0, left: 0 },
      });
      return;
    }

    // 링크의 속성 가져오기
    const linkAttrs = editor.getAttributes("link");
    const linkUrl = linkAttrs.href || "";

    // 선택 영역의 위치 계산
    const { from } = selection;
    const start = view.coordsAtPos(from);

    setLinkSelection({
      isLinkSelected: true,
      linkUrl,
      position: {
        top: start.top - 10, // floating button이 선택 영역 위에 나타나도록
        left: start.left,
      },
    });
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    // 에디터 상태 변경 시 링크 선택 상태 업데이트
    const handleUpdate = () => {
      updateLinkSelection();
    };

    editor.on("selectionUpdate", handleUpdate);
    editor.on("transaction", handleUpdate);

    // 초기 상태 설정
    updateLinkSelection();

    return () => {
      editor.off("selectionUpdate", handleUpdate);
      editor.off("transaction", handleUpdate);
    };
  }, [editor, updateLinkSelection]);

  const hideLinkSelection = useCallback(() => {
    setLinkSelection({
      isLinkSelected: false,
      linkUrl: "",
      position: { top: 0, left: 0 },
    });
  }, []);

  return {
    ...linkSelection,
    hideLinkSelection,
  };
};
