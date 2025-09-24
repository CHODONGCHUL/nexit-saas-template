import React from "react";
import { Metadata } from "next";
import Image from "next/image"; // ✅ favicon 표시용

export const metadata: Metadata = {
  title: "앱 소개",
  description: "AutoNavi 앱 소개 페이지",
};

export default function AppIntroPage() {
  return (
    <div className="container mx-auto py-16 px-6 text-center">
      {/* ✅ 제목 + 로고 같이 */}
      <h1 className="text-4xl font-bold mb-6 flex items-center justify-center gap-3">
        <Image
          src="/favicon.ico" // ✅ public/favicon.ico 사용
          alt="AutoNavi Logo"
          width={40}
          height={40}
          className="inline-block"
        />
        AutoNavi 앱 소개
      </h1>

      <p className="text-lg text-muted-foreground mb-12">
        AutoNavi는 배달 라이더 전용 카카오맵 자동화 내비게이션 솔루션입니다.  
        카카오맵 실행 시 자동으로 경로 탐색, 안내 시작을 지원하여 배달 효율을 극대화합니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 주요 기능 */}
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">주요 기능</h2>
          <ul className="list-disc pl-5 space-y-2 text-left">
            <li>카카오맵 자동 실행 및 경로 안내</li>
            <li>송신/수신 모드 연동</li>
            <li>배달 목적지 자동 감지 및 공유</li>
            <li>안내 시작 자동화</li>
          </ul>
        </div>

        {/* 지원 환경 */}
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">지원 환경</h2>
          <p className="text-left">
            Android 10 이상 기기에서 지원되며,  
            Google 계정 로그인 기반으로 송신/수신 기기를 연동합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
