"use client";

import { SidebarMenu } from "@/components/ui/sidebar";
import { ThemeToggleButton } from "./theme-toggle-button";

export function SidebarActions() {
  return (
    <SidebarMenu>
      <ThemeToggleButton />
    </SidebarMenu>
  );
}