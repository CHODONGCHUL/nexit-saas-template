import React from "react";

interface NexitLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export const NexitLogo: React.FC<NexitLogoProps> = ({
  className = "",
  width = 64,
  height = 32,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 250"
      width={width}
      height={height}
      className={className}
    >
      <g transform="matrix(1, 0, 0, 1, 0.795232, -100)">
        <text
          style={{
            fill: "currentColor",
            fontFamily: "Pretendard",
            fontSize: "27.9465px",
            fontWeight: 800,
            letterSpacing: "-4.6px",
            lineHeight: "44.7143px",
            whiteSpace: "pre",
          }}
          transform="matrix(6.873066, 0, 0, 7.156543, -696.993347, -981.855286)"
          x="120.729"
          y="178.577"
        >
          EXIT
        </text>
        <text
          style={{
            fill: "currentColor",
            fontFamily: "Pretendard",
            fontSize: "200px",
            fontWeight: 800,
            whiteSpace: "pre",
          }}
          x="40.656"
          y="296.097"
        >
          N
        </text>
      </g>
    </svg>
  );
};

export default NexitLogo;
