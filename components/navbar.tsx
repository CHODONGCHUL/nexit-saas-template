"use client";

import { useEffect, useState, useRef } from "react";
import { Menu } from "./ui/navbar-menu";
import Link from "next/link";
import SigninDialog from "./user/signin-dialog";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { Menu as MenuIcon, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import SigninForm from "./user/signin-form";
import DropdownAvatar from "./user/dropdown-avatar";
import AutoNaviLogo from "./autonavi-logo";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      {/* 로그인 다이얼로그 */}
      <Dialog open={showSigninDialog} onOpenChange={setShowSigninDialog}>
        <DialogContent className="max-w-[374px] p-3 z-[70]">
          <DialogTitle className="sr-only">로그인</DialogTitle>
          <DialogDescription className="sr-only">
            계정에 로그인하세요
          </DialogDescription>
          <SigninForm setOpen={setShowSigninDialog} />
        </DialogContent>
      </Dialog>

      {/* 데스크탑 메뉴 */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] flex-1 flex justify-center pt-6 md:flex hidden"
        style={navbarStyles}
      >
        <Menu setActive={setActive} className="flex items-center">
          {/* 로고 클릭 시 홈("/") 이동 */}
          <Link href="/" onMouseEnter={() => setActive(null)}>
            <AutoNaviLogo className="w-[280px] h-[100px] mr-10" />
          </Link>

          {/* 네비게이션 메뉴 */}
          <Link
            href="/dashboard"
            className="text-lg font-semibold text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            onMouseEnter={() => setActive(null)}
          >
            내 대시보드
          </Link>
          <Link
            href="/about"
            className="text-lg font-semibold text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            onMouseEnter={() => setActive(null)}
          >
            앱 소개
          </Link>
          <Link
            href="/pricing"
            className="text-lg font-semibold text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            onMouseEnter={() => setActive(null)}
          >
            요금제
          </Link>
          <Link
            href="/contact"
            className="text-lg font-semibold text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            onMouseEnter={() => setActive(null)}
          >
            문의하기
          </Link>

          {/* 다크모드 토글 */}
          {mounted && (
            <div
              className="flex items-center cursor-pointer ml-6"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun size={22} className="text-neutral-300 hover:text-white" />
              ) : (
                <Moon
                  size={22}
                  className="text-neutral-700 hover:text-neutral-900"
                />
              )}
            </div>
          )}

          {/* 로그인 / 유저 메뉴 */}
          <div className="ml-6" onMouseEnter={() => setActive(null)}>
            {user ? (
              <div className="flex items-center gap-3 text-base">
                안녕하세요, {user.user_metadata.name}님!
                <Image
                  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Waving%20Hand.png"
                  alt="Waving Hand"
                  width="32"
                  height="32"
                  className="pb-1 mr-2"
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

      {/* 모바일 메뉴 (상단 바) */}
      <div
        className={`fixed top-0 left-0 right-0 z-[60] flex md:hidden w-full bg-white/80 dark:bg-black/80 backdrop-blur-md px-4 py-3
              ${mobileMenuOpen ? "pointer-events-none" : "pointer-events-auto"}`}
        style={navbarStyles}
      >
        <div className="flex items-center justify-between w-full">
          <Link href="/">
            <AutoNaviLogo className="w-[160px] h-[60px]" />
          </Link>
          <div className="flex items-center gap-4">
            {mounted && (
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun size={20} className="text-neutral-300 hover:text-white" />
                ) : (
                  <Moon
                    size={20}
                    className="text-neutral-700 hover:text-neutral-900"
                  />
                )}
              </div>
            )}
            <button
              onClick={toggleMobileMenu}
              className="text-neutral-700 dark:text-neutral-300 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center
                   bg-white/95 dark:bg-black/90 backdrop-blur-md 
                   transition-all duration-300 pointer-events-auto`}
        >
          <nav className="w-full max-w-sm flex flex-col items-center gap-8">
            <Link
              href="/dashboard"
              className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 hover:text-blue-600 transition"
              onClick={() => setTimeout(() => setMobileMenuOpen(false), 200)}
            >
              내 대시보드
            </Link>
            <Link
              href="/about"
              className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 hover:text-blue-600 transition"
              onClick={() => setTimeout(() => setMobileMenuOpen(false), 200)}
            >
              앱 소개
            </Link>
            <Link
              href="/pricing"
              className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 hover:text-blue-600 transition"
              onClick={() => setTimeout(() => setMobileMenuOpen(false), 200)}
            >
              요금제
            </Link>
            <Link
              href="/contact"
              className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 hover:text-blue-600 transition"
              onClick={() => setTimeout(() => setMobileMenuOpen(false), 200)}
            >
              문의하기
            </Link>

            {user ? (
              <DropdownAvatar user={user} />
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowSigninDialog(true);
                }}
                className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition"
              >
                로그인
              </button>
            )}
          </nav>
        </div>
      )}
    </>
  );
}