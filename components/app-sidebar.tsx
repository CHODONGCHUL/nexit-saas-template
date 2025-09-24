"use client";

import * as React from "react";
import { HelpCircle, Settings2, CreditCard } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

const data = {
  navMain: [
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
        { title: "FAQ", url: "/dashboard/support/faq" },
        { title: "이용약관", url: "/dashboard/support/terms" },
        { title: "개인정보처리방침", url: "/dashboard/support/privacy" },
        { title: "문의하기", url: "/dashboard/support/contact" },
      ],
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: User | null;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* ✅ 상단에는 AutoNavi만 */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link
              href="/dashboard"
              className="flex justify-center py-4 text-xl font-bold"
            >
              AutoNavi
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ✅ 메인 메뉴 */}
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* ✅ 하단에만 유저 프로필 */}
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
