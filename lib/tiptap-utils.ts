import type { Attrs, Node } from "@tiptap/pm/model";
import type { Editor } from "@tiptap/react";
import { generateHTML } from "@tiptap/html";
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

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Checks if a mark exists in the editor schema
 * @param markName - The name of the mark to check
 * @param editor - The editor instance
 * @returns boolean indicating if the mark exists in the schema
 */
export const isMarkInSchema = (
  markName: string,
  editor: Editor | null
): boolean => {
  if (!editor?.schema) return false;
  return editor.schema.spec.marks.get(markName) !== undefined;
};

/**
 * Checks if a node exists in the editor schema
 * @param nodeName - The name of the node to check
 * @param editor - The editor instance
 * @returns boolean indicating if the node exists in the schema
 */
export const isNodeInSchema = (
  nodeName: string,
  editor: Editor | null
): boolean => {
  if (!editor?.schema) return false;
  return editor.schema.spec.nodes.get(nodeName) !== undefined;
};

/**
 * Gets the active attributes of a specific mark in the current editor selection.
 *
 * @param editor - The Tiptap editor instance.
 * @param markName - The name of the mark to look for (e.g., "highlight", "link").
 * @returns The attributes of the active mark, or `null` if the mark is not active.
 */
export function getActiveMarkAttrs(
  editor: Editor | null,
  markName: string
): Attrs | null {
  if (!editor) return null;
  const { state } = editor;
  const marks = state.storedMarks || state.selection.$from.marks();
  const mark = marks.find((mark) => mark.type.name === markName);

  return mark?.attrs ?? null;
}

/**
 * Checks if a node is empty
 */
export function isEmptyNode(node?: Node | null): boolean {
  return !!node && node.content.size === 0;
}

/**
 * Utility function to conditionally join class names into a single string.
 * Filters out falsey values like false, undefined, null, and empty strings.
 *
 * @param classes - List of class name strings or falsey values.
 * @returns A single space-separated string of valid class names.
 */
export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Finds the position and instance of a node in the document
 * @param props Object containing editor, node (optional), and nodePos (optional)
 * @param props.editor The TipTap editor instance
 * @param props.node The node to find (optional if nodePos is provided)
 * @param props.nodePos The position of the node to find (optional if node is provided)
 * @returns An object with the position and node, or null if not found
 */
export function findNodePosition(props: {
  editor: Editor | null;
  node?: Node | null;
  nodePos?: number | null;
}): { pos: number; node: Node } | null {
  const { editor, node, nodePos } = props;

  if (!editor || !editor.state?.doc) return null;

  // Zero is valid position
  const hasValidNode = node !== undefined && node !== null;
  const hasValidPos = nodePos !== undefined && nodePos !== null;

  if (!hasValidNode && !hasValidPos) {
    return null;
  }

  if (hasValidPos) {
    try {
      const nodeAtPos = editor.state.doc.nodeAt(nodePos!);
      if (nodeAtPos) {
        return { pos: nodePos!, node: nodeAtPos };
      }
    } catch (error) {
      // 노드 위치 확인 중 오류 발생
      return null;
    }
  }

  // 문서에서 노드 검색
  let foundPos = -1;
  let foundNode: Node | null = null;

  editor.state.doc.descendants((currentNode, pos) => {
    if (currentNode === node) {
      foundPos = pos;
      foundNode = currentNode;
      return false;
    }
    return true;
  });

  return foundPos !== -1 && foundNode !== null
    ? { pos: foundPos, node: foundNode }
    : null;
}

/**
 * Handles image upload with progress tracking and abort capability
 * @param file The file to upload
 * @param onProgress Optional callback for tracking upload progress
 * @param abortSignal Optional AbortSignal for cancelling the upload
 * @param postId Optional post ID to organize images in directories
 * @returns Promise resolving to the URL of the uploaded image
 */
export const handleImageUpload = async (
  file: File,
  onProgress?: (event: { progress: number }) => void,
  abortSignal?: AbortSignal,
  postId?: string
): Promise<string> => {
  // Validate file
  if (!file) {
    throw new Error("이미지 파일이 제공되지 않았습니다.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `파일 크기가 허용된 최대 크기를 초과합니다 (${
        MAX_FILE_SIZE / (1024 * 1024)
      }MB)`
    );
  }

  // Validate file type
  if (!file.type.startsWith("image/")) {
    throw new Error("이미지 파일만 업로드할 수 있습니다.");
  }

  try {
    // Dynamic import to avoid bundling supabase client in non-browser environments
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();

    // Check if user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new Error("이미지 업로드를 위해 로그인이 필요합니다.");
    }

    // Create unique filename with optional post ID directory
    const fileExt = file.name.split(".").pop() || "jpg";
    const shortId = Math.random().toString(36).substring(2, 8); // 6자리 랜덤 문자열
    const baseFileName = `img_${Date.now()}_${shortId}.${fileExt}`;
    const fileName = postId ? `${postId}/${baseFileName}` : baseFileName;

    // Simulate progress for upload start
    onProgress?.({ progress: 10 });

    // Check if upload should be cancelled
    if (abortSignal?.aborted) {
      throw new Error("업로드가 취소되었습니다.");
    }

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("blog-images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`이미지 업로드에 실패했습니다: ${uploadError.message}`);
    }

    // Simulate progress for upload completion
    onProgress?.({ progress: 80 });

    // Check if upload should be cancelled after upload but before URL generation
    if (abortSignal?.aborted) {
      // Clean up uploaded file if cancelled
      await supabase.storage.from("blog-images").remove([fileName]);
      throw new Error("업로드가 취소되었습니다.");
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("blog-images").getPublicUrl(fileName);

    if (!publicUrl) {
      throw new Error("이미지 URL을 생성할 수 없습니다.");
    }

    // Complete progress
    onProgress?.({ progress: 100 });

    return publicUrl;
  } catch (error) {
    if (abortSignal?.aborted) {
      throw new Error("업로드가 취소되었습니다.");
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("이미지 업로드 중 알 수 없는 오류가 발생했습니다.");
  }
};

/**
 * Converts a File to base64 string
 * @param file The file to convert
 * @param abortSignal Optional AbortSignal for cancelling the conversion
 * @returns Promise resolving to the base64 representation of the file
 */
export const convertFileToBase64 = (
  file: File,
  abortSignal?: AbortSignal
): Promise<string> => {
  if (!file) {
    return Promise.reject(new Error("No file provided"));
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    const abortHandler = () => {
      reader.abort();
      reject(new Error("Upload cancelled"));
    };

    if (abortSignal) {
      abortSignal.addEventListener("abort", abortHandler);
    }

    reader.onloadend = () => {
      if (abortSignal) {
        abortSignal.removeEventListener("abort", abortHandler);
      }

      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert File to base64"));
      }
    };

    reader.onerror = (error) =>
      reject(new Error(`File reading error: ${error}`));
    reader.readAsDataURL(file);
  });
};

/**
 * Extracts all image sources from TipTap JSON content
 * @param content The TipTap JSON content object
 * @returns Array of image source URLs
 */
export function extractImagesFromContent(content: any): string[] {
  if (!content || !content.content) return [];

  const images: string[] = [];

  function traverse(node: any) {
    if (node.type === "image" && node.attrs?.src) {
      images.push(node.attrs.src);
    }

    if (node.content && Array.isArray(node.content)) {
      node.content.forEach(traverse);
    }
  }

  content.content.forEach(traverse);
  return images;
}

// Tiptap JSON을 HTML로 변환하는 함수
export function tiptapJsonToHtml(json: any): string {
  if (!json) return "";

  // 문자열인 경우 그대로 반환 (기존 HTML 콘텐츠 호환성)
  if (typeof json === "string") {
    return json;
  }

  try {
    const html = generateHTML(json, [
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
    ]);

    return html;
  } catch (error) {
    console.error("Tiptap JSON to HTML 변환 실패:", error);
    return "";
  }
}
