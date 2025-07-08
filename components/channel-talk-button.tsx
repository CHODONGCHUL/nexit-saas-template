"use client";

import { MessageCircle } from "lucide-react";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

export function ChannelTalkButton() {
  const handleChannelTalkClick = () => {
    // 채널톡 열기
    if (typeof window !== "undefined" && (window as any).ChannelIO) {
      (window as any).ChannelIO("showMessenger");
    }
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={handleChannelTalkClick}
        className="cursor-pointer"
        tooltip="문의하기"
      >
        <MessageCircle className="size-4" />
        <span>문의하기</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
