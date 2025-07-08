"use client";

import * as React from "react";
import {
  BookOpen,
  Command,
  FileText,
  HelpCircle,
  Home,
  Settings2,
  Headphones,
  CreditCard,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { SidebarActions } from "@/components/sidebar-actions";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { User } from "@supabase/supabase-js";

const data = {
  navMain: [
    {
      title: "대시보드",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "구독 관리",
      url: "/dashboard/subscription",
      icon: CreditCard,
    },
    {
      title: "설정",
      url: "/dashboard/settings",
      icon: Settings2,
      items: [
        {
          title: "프로필",
          url: "/dashboard/settings/profile",
        },
      ],
    },
    {
      title: "도움말",
      url: "/dashboard/support",
      icon: HelpCircle,
      items: [
        {
          title: "FAQ",
          url: "/dashboard/support/faq",
        },
        {
          title: "이용약관",
          url: "/dashboard/support/terms",
        },
        {
          title: "개인정보처리방침",
          url: "/dashboard/support/privacy",
        },
        {
          title: "문의하기",
          url: "/dashboard/support/contact",
        },
      ],
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User | null;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  // 관리자 메뉴 제거 - 기본 메뉴만 사용
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Command className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">NEXIT</span>
                <span className="truncate text-xs text-sidebar-muted-foreground">
                  SaaS Platform
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarActions />
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
