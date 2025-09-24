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
import Link from "next/link";
import AutoNaviLogo from "@/components/autonavi-logo";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: user, isLoading, error } = useCurrentUser();
  const pathname = usePathname();

  // ✅ 브레드크럼 생성
  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs = [
      { title: "대시보드", href: "/dashboard", isLast: segments.length === 1 },
    ];

    if (segments.length > 1) {
      for (let i = 1; i < segments.length; i++) {
        const segment = segments[i];
        const isLast = i === segments.length - 1;

        let title = segment;
        switch (segment) {
          case "settings":
            title = "설정";
            break;
          case "profile":
            title = "프로필";
            break;
          case "subscription":
            title = "구독";
            break;
          case "support":
            title = "도움말";
            break;
          default:
            title = segment;
        }

        const href = "/" + segments.slice(0, i + 1).join("/");
        breadcrumbs.push({ title, href, isLast });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  // 에러 처리
  useEffect(() => {
    if (error) {
      toast.error("❌ 사용자 정보를 불러오는데 실패했습니다", {
        description: "페이지를 새로고침하거나 다시 로그인해보세요.",
        duration: 5000,
      });
    }
  }, [error]);

  // ✅ 로딩 상태
  if (isLoading) {
    return (
      <SidebarProvider>
        <AppSidebar user={null} />
        <SidebarInset>
          <div className="flex items-center justify-center h-screen">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            로딩 중...
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  // ✅ 에러 상태
  if (error) {
    return (
      <SidebarProvider>
        <AppSidebar user={null} />
        <SidebarInset>
          <div className="flex items-center justify-center h-screen text-red-500">
            ❌ 사용자 정보를 불러오는데 실패했습니다.
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  // ✅ 정상 상태
  return (
    <SidebarProvider>
      <AppSidebar user={user || null} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-4 px-4 bg-background z-10">
          {/* 로고 */}
          <Link href="/" className="flex items-center mr-8">
            <AutoNaviLogo className="w-[160px] h-[48px]" />
          </Link>

          <Separator orientation="vertical" className="h-6" />

          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />

          {/* 브레드크럼 */}
          <Breadcrumb>
            <BreadcrumbList className="flex flex-wrap items-center gap-1">
              {breadcrumbs.map((crumb) => (
                <div key={crumb.href} className="flex items-center">
                  <BreadcrumbItem>
                    {crumb.isLast ? (
                      <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={crumb.href}>
                        {crumb.title}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!crumb.isLast && <BreadcrumbSeparator />}
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* ✅ 본문에 padding-top & 중앙 정렬 추가 */}
        <main className="flex-1 p-4 md:p-6 pt-20 overflow-x-hidden max-w-5xl mx-auto w-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
