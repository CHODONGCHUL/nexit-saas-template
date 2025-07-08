import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Next.js 네비게이션 API의 경량 래퍼
// 라우팅 설정을 고려하는 API들
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
