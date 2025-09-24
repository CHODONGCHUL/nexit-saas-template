"use client";

import { useEffect } from "react";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const fixPointerEvents = () => {
      const body = document.querySelector("body");
      if (body && body.style.pointerEvents === "none") {
        body.style.pointerEvents = "auto";
      }
    };

    // 초기 실행
    fixPointerEvents();

    // body style 속성이 바뀔 때마다 다시 적용
    const observer = new MutationObserver(fixPointerEvents);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full">
      <Navbar />
        <div className="pt-32">{children}</div>
      <Footer />
    </div>
  );
}
