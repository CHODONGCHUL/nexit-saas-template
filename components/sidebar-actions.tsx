"use client";

import { SidebarMenu } from "@/components/ui/sidebar";
import { ThemeToggleButton } from "./theme-toggle-button";
import { ChannelTalkButton } from "./channel-talk-button";

export function SidebarActions() {
  return (
    <SidebarMenu>
      <ThemeToggleButton />
      <ChannelTalkButton />
    </SidebarMenu>
  );
}
