"use client";

import { AdminSidebar } from "@/components/admin-sidebar";
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
import { useCurrentUser, useUserRole } from "@/hooks/user-hook";
import { useEffect } from "react";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { Loader2, Shield } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { data: user, isLoading, error } = useCurrentUser();
  const { data: userRole, isLoading: roleLoading } = useUserRole();
  const pathname = usePathname();
  const router = useRouter();

  // 경로에 따른 브레드크럼 생성
  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs = [
      { title: "관리자", href: "/admin", isLast: segments.length === 1 },
    ];

    if (segments.length > 1) {
      // admin 이후의 경로들을 처리
      for (let i = 1; i < segments.length; i++) {
        const segment = segments[i];
        const isLast = i === segments.length - 1;

        // 경로 매핑
        let title = segment;
        switch (segment) {
          case "blog":
            title = "블로그 관리";
            break;
          case "new":
            title = "새 포스트";
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

  // 관리자 권한 체크
  useEffect(() => {
    if (!roleLoading && userRole && userRole.role !== "admin") {
      toast.error("❌ 관리자 권한이 필요합니다", {
        description: "이 페이지에 접근할 권한이 없습니다.",
        duration: 5000,
      });
      router.push("/dashboard");
    }
  }, [userRole, roleLoading, router]);

  // 에러 상태 처리
  useEffect(() => {
    if (error) {
      toast.error("❌ 사용자 정보를 불러오는데 실패했습니다", {
        description: "페이지를 새로고침하거나 다시 로그인해보세요.",
        duration: 5000,
      });
    }
  }, [error]);

  if (isLoading || roleLoading) {
    return (
      <SidebarProvider>
        <AdminSidebar user={null} />
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
        <AdminSidebar user={null} />
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

  // 권한 체크 중일 때는 로딩 표시
  if (!userRole || userRole.role !== "admin") {
    return (
      <SidebarProvider>
        <AdminSidebar user={null} />
        <SidebarInset>
          <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center gap-4">
              <Shield className="h-12 w-12 text-red-500" />
              <div className="text-lg text-red-500">
                ❌ 관리자 권한이 필요합니다
              </div>
              <p className="text-muted-foreground">
                이 페이지에 접근할 권한이 없습니다.
              </p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <AdminSidebar user={user || null} />
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
