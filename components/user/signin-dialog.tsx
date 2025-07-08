"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import SigninForm from "./signin-form";
import { LogIn } from "lucide-react";

interface SigninDialogProps {
  variant?: "outline" | "ghost" | "link";
  classNames?: string;
  text?: string;
  onOpen?: () => void;
}

export default function SigninDialog(props: SigninDialogProps) {
  const { variant, classNames, text = "로그인", onOpen } = props;
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen && onOpen) {
      onOpen();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={variant} className={classNames}>
          <LogIn className="h-4 w-4 mr-2" />
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[374px] sm:max-w-[374px] p-3 z-60">
        <DialogTitle className="sr-only">{text}</DialogTitle>
        <DialogDescription className="sr-only">
          계정에 로그인하세요
        </DialogDescription>
        <SigninForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
