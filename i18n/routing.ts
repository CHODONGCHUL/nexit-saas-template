import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // 지원되는 모든 언어 목록
  locales: ["ko", "en"],

  // 일치하는 언어가 없을 때 사용되는 기본 언어
  defaultLocale: "ko",

  localePrefix: "as-needed",
});
