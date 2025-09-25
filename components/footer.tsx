"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";
import { Separator } from "./ui/separator";
import { InstagramButton, YouTubeButton } from "./social-buttons";
import AutoNaviLogo from "./autonavi-logo"; // ✅ default import로 맞춤

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background py-6 mt-auto">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* 데스크탑 푸터 */}
        <div className="hidden md:grid md:grid-cols-4 gap-6">
          {/* 브랜드 & 설명 */}
          <div>
            <AutoNaviLogo className="w-40 h-14 mb-3" />
            <div className="flex flex-col space-y-2">
              <div className="flex items-center text-xs text-muted-foreground">
                <Mail className="h-3 w-3 mr-1.5" />
                heysandmole@gmail.com
              </div>
            </div>
          </div>

          {/* 주요 링크 제거 */}

          {/* 정책 */}
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

          {/* 소셜 */}
          <div>
            <h3 className="font-medium text-base mb-2">소셜</h3>
            <div className="flex flex-col space-y-2">
              <YouTubeButton url="https://www.youtube.com/channel/UCw1xnLJzNN6SKcdWzp4CK4A" />
              <InstagramButton url="#" />
            </div>
          </div>
        </div>

        {/* 모바일 푸터 */}
        <div className="md:hidden">
          <AutoNaviLogo className="w-full h-12 mb-6" />

          <div className="grid grid-cols-1 gap-3 mb-6 px-6">
            <YouTubeButton url="https://www.youtube.com/channel/UCw1xnLJzNN6SKcdWzp4CK4A" />
            <InstagramButton url="#" />
          </div>

          <div className="text-xs text-muted-foreground text-center space-y-1 mb-4">
            <p>상호명: AutoNavi</p>
            <p>문의: heysandmole@gmail.com</p>
          </div>

          <p className="text-xs text-muted-foreground text-center mb-4">
            © {new Date().getFullYear()} AutoNavi. All rights reserved.
          </p>
        </div>

        {/* 저작권 (데스크탑) */}
        <div className="mt-6 pt-4 border-t border-border hidden md:flex md:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AutoNavi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
