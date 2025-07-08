import React from "react";
import { Button } from "../ui/button";

interface InstagramButtonProps {
  url?: string;
  className?: string;
}

export function InstagramButton({
  url = "https://www.instagram.com/",
  className,
}: InstagramButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={`justify-start h-8 ${className}`}
      asChild
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
          fill="none"
        >
          <defs>
            <linearGradient
              id="instagram-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f9ce34" />
              <stop offset="25%" stopColor="#ee2a7b" />
              <stop offset="50%" stopColor="#6228d7" />
              <stop offset="100%" stopColor="#6228d7" />
            </linearGradient>
          </defs>
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="5"
            ry="5"
            stroke="url(#instagram-gradient)"
            strokeWidth="2"
            fill="none"
          />
          <circle
            cx="12"
            cy="12"
            r="4"
            stroke="url(#instagram-gradient)"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="18.5" cy="5.5" r="1.5" fill="url(#instagram-gradient)" />
        </svg>
        Instagram
      </a>
    </Button>
  );
}
