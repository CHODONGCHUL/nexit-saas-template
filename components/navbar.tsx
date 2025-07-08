"use client";

import { useEffect, useState, useRef } from "react";
import { Menu } from "./ui/navbar-menu";
import Link from "next/link";
import SigninDialog from "./user/signin-dialog";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { Menu as MenuIcon, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import SigninForm from "./user/signin-form";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import DropdownAvatar from "./user/dropdown-avatar";
import { NexitLogo } from "./nexit-logo";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileUserMenuOpen, setMobileUserMenuOpen] = useState(false);
  const [showSigninDialog, setShowSigninDialog] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navbarStyles = {
    transform: isVisible ? "translateY(0)" : "translateY(-100%)",
    transition: "transform 0.3s ease-in-out",
  };

  return (
    <>
      <Dialog open={showSigninDialog} onOpenChange={setShowSigninDialog}>
        <DialogContent className="max-w-[374px] p-3 z-[70]">
          <DialogTitle className="sr-only">로그인</DialogTitle>
          <DialogDescription className="sr-only">
            계정에 로그인하세요
          </DialogDescription>
          <SigninForm setOpen={setShowSigninDialog} />
        </DialogContent>
      </Dialog>

      <div
        className="fixed top-0 left-0 right-0 z-[60] flex-1 flex justify-center pt-8 md:flex hidden"
        style={navbarStyles}
      >
        <Menu setActive={setActive}>
          <Link
            href={"/home"}
            className="text-lg font-bold mr-2"
            onMouseEnter={() => setActive(null)}
          >
            <NexitLogo className="w-15 h-10 mr-12" />
          </Link>
          <Link
            href="/dashboard"
            className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            onMouseEnter={() => setActive(null)}
          >
            내 대시보드
          </Link>
          <Link
            href="/blog"
            className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            onMouseEnter={() => setActive(null)}
          >
            블로그
          </Link>

          <Link
            href="/pricing"
            className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            onMouseEnter={() => setActive(null)}
          >
            요금제
          </Link>

          <button
            className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white contact-button"
            onMouseEnter={() => setActive(null)}
          >
            문의하기
          </button>

          {mounted && (
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun size={16} className="text-neutral-300 hover:text-white" />
              ) : (
                <Moon
                  size={16}
                  className="text-neutral-700 hover:text-neutral-900"
                />
              )}
            </div>
          )}

          <div className="ml-4 pl-8" onMouseEnter={() => setActive(null)}>
            {user ? (
              <div className="flex items-center gap-2">
                안녕하세요, {user.user_metadata.name}님!
                {/* 👋 */}
                <Image
                  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Waving%20Hand.png"
                  alt="Waving Hand"
                  width="30"
                  height="30"
                  className="pb-2 mr-2"
                  unoptimized
                />
                <DropdownAvatar user={user} />
              </div>
            ) : (
              <div className="flex gap-2">
                <SigninDialog />
              </div>
            )}
          </div>
        </Menu>
      </div>

      <div
        className="fixed top-0 left-0 right-0 z-[60] flex md:hidden w-full bg-white/80 dark:bg-black/80 backdrop-blur-md px-4 py-3"
        style={navbarStyles}
      >
        <div className="flex items-center justify-between w-full">
          <Link href={"/home"} className="text-lg font-bold">
            <NexitLogo className="w-10 h-10" />
          </Link>
          <div className="flex items-center gap-4">
            {mounted && (
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun
                    size={18}
                    className="text-neutral-300 hover:text-white"
                  />
                ) : (
                  <Moon
                    size={18}
                    className="text-neutral-700 hover:text-neutral-900"
                  />
                )}
              </div>
            )}
            <button
              onClick={toggleMobileMenu}
              className="text-neutral-700 dark:text-neutral-300 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed top-14 left-0 right-0 z-[59] md:hidden bg-white dark:bg-black py-4 px-4 shadow-lg animate-fade-in-down">
          <div className="flex flex-col space-y-4">
            <Link
              href="/dashboard"
              className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white px-2 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              내 대시보드
            </Link>

            <Link
              href="/blog"
              className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white px-2 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              블로그
            </Link>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-2">
              <div className="font-medium px-2 py-2 text-neutral-700 dark:text-neutral-300">
                서비스
              </div>
              <div className="pl-4 space-y-2 mt-1">
                <Link
                  href="/#"
                  className="block px-2 py-1 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  AI 블로그 포스팅
                </Link>
                <Link
                  href="/keyword"
                  className="block px-2 py-1 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  키워드 분석
                </Link>
                <Link
                  href="/#"
                  className="block px-2 py-1 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  마케팅 컨설팅
                </Link>
                <Link
                  href="https://x-tion.com"
                  className="block px-2 py-1 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AI/자동화/웹 개발
                </Link>
              </div>
            </div>

            <Link
              href="/pricing"
              className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white px-2 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              요금제
            </Link>

            <button
              className="text-left text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white px-2 py-2"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              문의하기
            </button>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-2">
              {user ? (
                <div
                  className="px-2 flex justify-between items-center cursor-pointer py-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md"
                  onClick={() => setMobileUserMenuOpen(true)}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Waving%20Hand.png"
                      alt="Waving Hand"
                      width="24"
                      height="24"
                      unoptimized
                    />
                    <span>안녕하세요, {user.user_metadata.name}님!</span>
                  </div>
                  <DropdownAvatar
                    user={user}
                    open={mobileUserMenuOpen}
                    onOpenChange={setMobileUserMenuOpen}
                  />
                </div>
              ) : (
                <div className="px-2">
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setTimeout(() => setShowSigninDialog(true), 100);
                    }}
                    className="w-full"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    로그인
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm z-[58] md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
