"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useCurrentUser } from "@/hooks/user-hook";
import { useEffect } from "react";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import useChannelTalk from "@/hooks/use-channel-talk";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: user, isLoading, error } = useCurrentUser();
  const pathname = usePathname();

  // 경로에 따른 브레드크럼 생성
  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs = [
      { title: "대시보드", href: "/dashboard", isLast: segments.length === 1 },
    ];

    if (segments.length > 1) {
      // dashboard 이후의 경로들을 처리
      for (let i = 1; i < segments.length; i++) {
        const segment = segments[i];
        const isLast = i === segments.length - 1;

        // 경로 매핑
        let title = segment;
        switch (segment) {
          case "settings":
            title = "설정";
            break;
          case "profile":
            title = "프로필";
            break;
          case "security":
            title = "보안";
            break;
          case "subscription":
            title = "구독";
            break;
          case "notifications":
            title = "알림";
            break;
          case "support":
            title = "도움말";
            break;
          case "faq":
            title = "FAQ";
            break;
          case "terms":
            title = "이용약관";
            break;
          case "privacy":
            title = "개인정보처리방침";
            break;
          case "contact":
            title = "문의하기";
            break;
          case "blog":
            title = "블로그";
            break;
          case "features":
            title = "기능";
            break;
          default:
            title = segment;
        }

        const href = "/" + segments.slice(0, i + 1).join("/");
        breadcrumbs.push({
          title,
          href,
          isLast,
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  // 로딩 상태 처리는 UI로만 표시

  // 에러 상태 처리
  useEffect(() => {
    if (error) {
      toast.error("❌ 사용자 정보를 불러오는데 실패했습니다", {
        description: "페이지를 새로고침하거나 다시 로그인해보세요.",
        duration: 5000,
      });
    }
  }, [error]);

  useChannelTalk();

  if (isLoading) {
    return (
      <SidebarProvider>
        <AppSidebar user={null} />
        <SidebarInset>
          <div className="flex items-center justify-center h-screen">
            <div className="flex items-center gap-2 text-lg">
              <Loader2 className="h-6 w-6 animate-spin" />
              로딩 중...
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  if (error) {
    return (
      <SidebarProvider>
        <AppSidebar user={null} />
        <SidebarInset>
          <div className="flex items-center justify-center h-screen">
            <div className="text-lg text-red-500">
              ❌ 사용자 정보를 불러오는데 실패했습니다.
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user || null} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <div key={crumb.href} className="flex items-center">
                    <BreadcrumbItem className="block">
                      {crumb.isLast ? (
                        <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={crumb.href}>
                          {crumb.title}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!crumb.isLast && <BreadcrumbSeparator className="block" />}
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mb-32">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
