"use client";

import { ArrowRightIcon } from "lucide-react";
import { MouseEventHandler, ReactNode } from "react";
import { confettiService } from "@/components/landing-page/confetti-effects";

interface Props {
  title: string;
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const InteractiveMagicBadge = ({ title, icon, onClick }: Props) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    confettiService.fireAllConfetti();
    if (onClick) onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      className="relative inline-flex h-8 select-none overflow-hidden rounded-full p-[1.5px] focus:outline-none"
    >
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#6d28d9_0%,#d8b4fe_50%,#6d28d9_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-4 py-1 text-sm font-medium text-slate-950 backdrop-blur-3xl dark:bg-slate-950 dark:text-white">
        {icon && <span className="mr-1">{icon}</span>}
        {title}
        <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </span>
    </button>
  );
};

export default InteractiveMagicBadge;
