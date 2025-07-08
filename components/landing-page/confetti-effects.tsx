"use client";

import { useEffect, useState } from "react";
import type confettiType from "canvas-confetti";

let isInitialized = false;
let confettiInstance: typeof confettiType | null = null;

interface ConfettiEffectsProps {
  autoStart?: boolean;
  delay?: number;
}

export function ConfettiEffects({
  autoStart = true,
  delay = 500,
}: ConfettiEffectsProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // 브라우저 환경에서만 canvas-confetti 동적 import
  useEffect(() => {
    if (typeof window === "undefined" || isInitialized) return;

    const loadConfetti = async () => {
      try {
        // 동적 import
        const confettiModule = (await import("canvas-confetti")).default;
        confettiInstance = confettiModule;
        isInitialized = true;
        setIsLoaded(true);

        // autoStart가 true인 경우 사이드 캐논 효과 자동 시작
        if (autoStart) {
          setTimeout(() => {
            confettiService.launchSideCannons();
          }, delay);
        }
      } catch (error) {
        console.error("Failed to load confetti:", error);
      }
    };

    loadConfetti();

    // cleanup
    return () => {
      // 컴포넌트가 언마운트될 때는 초기화 상태를 유지
      // 페이지 새로고침 등이 발생할 때만 초기화 상태 리셋
    };
  }, [autoStart, delay]);

  // 빈 div 반환 - 실제 confetti는 canvas-confetti 라이브러리가 직접 생성
  return null;
}

// 외부에서 직접 호출할 수 있는 함수들
export const confettiService = {
  launchSideCannons: () => {
    if (!confettiInstance || typeof window === "undefined") return;

    const end = Date.now() + 2.5 * 1000;
    const colors = ["#81e047", "#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confettiInstance!({
        particleCount: 5,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confettiInstance!({
        particleCount: 5,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  },

  fireCenterConfetti: () => {
    if (!confettiInstance || typeof window === "undefined") return;

    confettiInstance({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#81e047", "#a786ff", "#fd8bbc", "#eca184"],
    });
  },

  fireAllConfetti: () => {
    confettiService.fireCenterConfetti();
    confettiService.launchSideCannons();
  },
};
