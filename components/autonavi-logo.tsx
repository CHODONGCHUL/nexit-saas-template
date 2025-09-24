"use client";

import React from "react";

interface AutoNaviLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const AutoNaviLogo: React.FC<AutoNaviLogoProps> = ({
  className = "",
  width = 220,   // 기본 크기 확장
  height = 80,   // 비율 맞춤
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 400"
      width={width}
      height={height}
      className={`cursor-pointer ${className}`}
    >
      <text
        style={{
          fontFamily: "Pretendard, sans-serif",
          fontSize: "160px",
          fontWeight: 800,
          letterSpacing: "-4px",
        }}
        x="40"
        y="240"
      >
        <tspan fill="#6C63FF">AutoNav</tspan>
        <tspan fill="#00C9A7">i</tspan>
      </text>
    </svg>
  );
};

export default AutoNaviLogo;