"use client";

import * as React from "react";
import { useId } from "react";

import { cn } from "@/lib/utils";

import { Textarea } from "./textarea";

// 확장된 인터페이스 정의 - null 타입을 허용
export interface TextareaAutoHeightProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "defaultValue"
  > {
  value?: string | number | readonly string[] | null;
  defaultValue?: string | number | readonly string[] | null;
}

const TextareaAutoHeight = React.forwardRef<
  HTMLTextAreaElement,
  TextareaAutoHeightProps
>(({ className, value, defaultValue, ...props }, ref) => {
  const mirrorId = useId();
  const [height, setHeight] = React.useState<number>();
  const scrollTolerance = 15;

  // null 값 처리를 위해 value와 defaultValue를 안전하게 변환
  const safeValue = value === null ? "" : value;
  const safeDefaultValue = defaultValue === null ? "" : defaultValue;

  React.useEffect(() => {
    const clientHeight = document?.getElementById(mirrorId)?.clientHeight ?? 0;
    setHeight(clientHeight + scrollTolerance);
  }, [mirrorId, safeValue]);

  const baseClassname = "";

  return (
    <div className="relative w-full">
      <Textarea
        className={cn("overflow-hidden", className)}
        ref={ref}
        style={{
          height: `${height}px`,
        }}
        value={safeValue}
        defaultValue={safeDefaultValue}
        {...props}
      />
      <div
        id={mirrorId}
        className={cn(
          "whitespace-pre-wrap absolute top-0 left-0 invisible",
          baseClassname,
          className
        )}
      >
        {safeValue}&nbsp;
      </div>
    </div>
  );
});
TextareaAutoHeight.displayName = "TextareaAutoHeight";

export { TextareaAutoHeight };
