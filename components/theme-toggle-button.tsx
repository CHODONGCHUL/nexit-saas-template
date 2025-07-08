"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="cursor-pointer"
        tooltip={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
      >
        {theme === "dark" ? (
          <Sun className="size-4" />
        ) : (
          <Moon className="size-4" />
        )}
        <span>{theme === "dark" ? "라이트 모드" : "다크 모드"}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
