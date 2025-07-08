import { Extension } from "@tiptap/react";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Slice, Fragment } from "@tiptap/pm/model";
import { marked } from "marked";
import { generateJSON } from "@tiptap/core";

// TipTap 확장들 import (generateJSON에서 사용)
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Underline } from "@tiptap/extension-underline";
import { Link } from "@/components/tiptap/tiptap-extension/link-extension";

interface ClipboardExtensionOptions {
  enableMarkdownParsing: boolean;
}

// 마크다운 패턴들
const MARKDOWN_PATTERNS = {
  heading: /^#{1,6}\s/,
  list: /^[\s]*[-*+]\s/,
  orderedList: /^[\s]*\d+\.\s/,
  blockquote: /^>\s/,
  codeBlock: /^```/,
  bold: /\*\*.*\*\*|\__.*\__/,
  italic: /\*.*\*|\_.*\_/,
  link: /\[.*\]\(.*\)/,
  inlineCode: /`.*`/,
};

// TipTap 확장들 배열 (generateJSON에서 사용)
const TIPTAP_EXTENSIONS = [
  StarterKit,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Underline,
  TaskList,
  TaskItem.configure({ nested: true }),
  Highlight.configure({ multicolor: true }),
  Image,
  Typography,
  Superscript,
  Subscript,
  Link.configure({ openOnClick: false }),
];

// 간단한 마크다운 감지 함수
function isMarkdown(text: string): boolean {
  const lines = text.split("\n");

  // 여러 줄 중 하나라도 마크다운 패턴을 포함하면 마크다운으로 간주
  return lines.some((line) => {
    return Object.values(MARKDOWN_PATTERNS).some((pattern) =>
      pattern.test(line)
    );
  });
}

// 마크다운을 TipTap JSON으로 변환 (TipTap 공식 함수 사용)
async function markdownToTipTapJson(markdown: string): Promise<any> {
  try {
    // marked를 사용해 HTML로 변환
    const html = await marked(markdown);

    // TipTap의 공식 generateJSON 함수 사용
    const json = generateJSON(html, TIPTAP_EXTENSIONS);
    return json;
  } catch (error) {
    console.error("마크다운 변환 실패:", error);
    return null;
  }
}

export const ClipboardExtension = Extension.create<ClipboardExtensionOptions>({
  name: "clipboardExtension",

  addOptions() {
    return {
      enableMarkdownParsing: true,
    };
  },

  addProseMirrorPlugins() {
    const { editor } = this;
    const options = this.options;

    return [
      new Plugin({
        key: new PluginKey("clipboardExtension"),
        props: {
          handlePaste: (view, event, slice) => {
            const text = event.clipboardData?.getData("text/plain") || "";

            if (!text.trim()) {
              return false;
            }

            const trimmedText = text.trim();

            // 마크다운 처리
            if (options.enableMarkdownParsing && isMarkdown(text)) {
              markdownToTipTapJson(text)
                .then((tipTapJson) => {
                  if (tipTapJson && tipTapJson.content) {
                    editor.commands.insertContent(tipTapJson.content);
                  }
                })
                .catch((error) => {
                  console.error("마크다운 변환 실패:", error);
                  // 실패 시 기본 텍스트로 삽입
                  editor.commands.insertContent(text);
                });
              return true;
            }

            return false;
          },
        },
      }),
    ];
  },
});
