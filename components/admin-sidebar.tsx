"use client";

import * as React from "react";
import { Command, Home, Shield, PenTool } from "lucide-react";

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

const adminNavData = {
  navMain: [
    {
      title: "관리자 대시보드",
      url: "/admin",
      icon: Home,
      isActive: true,
    },
    {
      title: "콘텐츠 관리",
      url: "/admin/blog",
      icon: PenTool,
      items: [
        {
          title: "블로그 관리",
          url: "/admin/blog",
        },
        {
          title: "새 포스트 작성",
          url: "/admin/blog/new",
        },
      ],
    },
  ],
};

interface AdminSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User | null;
}

export function AdminSidebar({ user, ...props }: AdminSidebarProps) {
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
                  Admin Panel
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={adminNavData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarActions />
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
