"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";
import { Separator } from "./ui/separator";
import {
  InstagramButton,
  ThreadsButton,
  YouTubeButton,
} from "./social-buttons";
import { NexitLogo } from "./nexit-logo";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-6 mt-auto">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* 데스크탑 푸터 (md 이상 화면에서 표시) */}
        <div className="hidden md:grid md:grid-cols-4 gap-6">
          {/* 브랜드 & 간략한 설명 */}
          <div>
            <NexitLogo className="w-14 h-10 mt-[-10px]" />
            {/* <p className="text-sm text-muted-foreground">
              AI 기반 콘텐츠 제작 & SEO 최적화 도구
            </p> */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center text-xs text-muted-foreground">
                <Mail className="h-3 w-3 mr-1.5" /> contact@algorixm.com
              </div>
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-7 w-fit mt-2"
                asChild
              >
                <Link href="/contact">문의하기</Link>
              </Button>
            </div>
          </div>

          {/* 주요 링크 */}
          <div>
            <h3 className="font-medium text-base mb-2">바로가기</h3>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li>
                <Link href="/pricing" className="hover:underline">
                  가격안내
                </Link>
              </li>
              <li>
                <Link href="/home" className="hover:underline">
                  기능설명
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:underline">
                  대시보드
                </Link>
              </li>
              <li>
                <Link href="/keyword" className="hover:underline">
                  키워드 분석
                </Link>
              </li>
            </ul>
          </div>

          {/* 정책 링크 */}
          <div>
            <h3 className="font-medium text-base mb-2">정책</h3>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li>
                <Link href="/privacy" className="hover:underline">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">
                  이용약관
                </Link>
              </li>
            </ul>
          </div>

          {/* 소셜 링크 */}
          <div>
            <h3 className="font-medium text-base mb-2">소셜</h3>
            <div className="flex flex-col space-y-2">
              <YouTubeButton />
              <InstagramButton />
              <ThreadsButton />
            </div>
          </div>
        </div>

        {/* 모바일 푸터 (md 미만 화면에서 표시) */}
        <div className="md:hidden">
          {/* 로고 */}
          <NexitLogo className="w-full h-10 mb-6" />

          {/* 소셜 링크 */}
          <div className="grid grid-cols-1 gap-3 mb-6 px-6">
            <YouTubeButton />
            <InstagramButton />
            <ThreadsButton />
          </div>

          {/* 사업자 정보 추가 */}
          <div className="text-xs text-muted-foreground text-center space-y-1 mb-4">
            <p>상호명: 알고리즘</p>
          </div>

          {/* 저작권 정보 */}
          <p className="text-xs text-muted-foreground text-center mb-4">
            © {new Date().getFullYear()} NEXIT. All rights reserved.
          </p>

          {/* 모바일 링크 (모바일에서만 표시) */}
          <div className="flex items-center justify-center text-xs">
            <Link
              href="/home"
              className="text-muted-foreground hover:text-primary"
            >
              서비스
            </Link>
            <Separator orientation="vertical" className="h-3 mx-3" />
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-primary"
            >
              약관
            </Link>
            <Separator orientation="vertical" className="h-3 mx-3" />
            <Link
              href="/contact"
              className="text-muted-foreground hover:text-primary"
            >
              문의하기
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border hidden md:flex md:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} NEXIT. All rights reserved.
          </p>
          <Link
            href="/contact"
            className="text-xs text-muted-foreground hover:text-primary"
          >
            문의하기
          </Link>
        </div>
      </div>
    </footer>
  );
}
