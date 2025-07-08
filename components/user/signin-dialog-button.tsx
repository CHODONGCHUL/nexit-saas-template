"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import SigninForm from "./signin-form";
import { ArrowRightIcon } from "lucide-react";

// ShinyButton 애니메이션 속성
const animationProps = {
  initial: { "--x": "100%", "scale": 0.8 },
  animate: { "--x": "-100%", "scale": 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop" as const,
    repeatDelay: 1,
    type: "spring" as const,
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring" as const,
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
};

interface SigninDialogButtonProps {
  className?: string;
  text?: string;
}

export default function SigninDialogButton({
  className,
  text = "무료로 시작하기",
}: SigninDialogButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.button
          className={cn(
            "relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow dark:bg-[radial-gradient(circle_at_50%_0%,(var(--primary)/10%)_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_(var(--primary)/10%)]",
            className
          )}
          {...animationProps}
        >
          <span
            className="relative block size-full text-sm uppercase tracking-wide text-[rgb(0,0,0,65%)] dark:font-light dark:text-[rgb(255,255,255,90%)]"
            style={{
              maskImage:
                "linear-gradient(-75deg,(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),(var(--primary)) calc(var(--x) + 100%))",
            }}
          >
            <div className="flex items-center text-lg font-medium">
              {text}
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </div>
          </span>
          <span
            style={{
              mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
              maskComposite: "exclude",
            }}
            className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,(var(--primary)/10%)_calc(var(--x)+20%),(var(--primary)/50%)_calc(var(--x)+25%),(var(--primary)/10%)_calc(var(--x)+100%))] p-px"
          ></span>
        </motion.button>
      </DialogTrigger>
      <DialogContent className="max-w-[374px] p-3">
        <DialogTitle className="sr-only">회원가입</DialogTitle>
        <DialogDescription className="sr-only">
          계정에 로그인하세요
        </DialogDescription>
        <SigninForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
