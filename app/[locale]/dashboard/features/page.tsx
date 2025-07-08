"use client";

import {
  MembershipGuard,
  useFeatureAccess,
} from "@/components/user/membership-guard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Users,
  BarChart3,
  Shield,
  Zap,
  Crown,
  Lock,
  Check,
} from "lucide-react";

export default function FeaturesPage() {
  const starterAccess = useFeatureAccess("starter");
  const proAccess = useFeatureAccess("pro");
  const enterpriseAccess = useFeatureAccess("enterprise");

  const features = [
    {
      title: "기본 프로젝트 관리",
      description: "프로젝트 생성, 수정, 삭제 기능",
      icon: <FileText className="h-5 w-5" />,
      level: "free" as const,
      available: true,
    },
    {
      title: "고급 분석 대시보드",
      description: "상세한 통계와 분석 도구",
      icon: <BarChart3 className="h-5 w-5" />,
      level: "starter" as const,
      available: starterAccess.hasAccess,
    },
    {
      title: "팀 협업 기능",
      description: "팀원 초대, 권한 관리, 실시간 협업",
      icon: <Users className="h-5 w-5" />,
      level: "pro" as const,
      available: proAccess.hasAccess,
    },
    {
      title: "고급 보안 기능",
      description: "2FA, 감사 로그, 고급 권한 관리",
      icon: <Shield className="h-5 w-5" />,
      level: "pro" as const,
      available: proAccess.hasAccess,
    },
    {
      title: "API 통합",
      description: "REST API, Webhook, 서드파티 통합",
      icon: <Zap className="h-5 w-5" />,
      level: "pro" as const,
      available: proAccess.hasAccess,
    },
    {
      title: "엔터프라이즈 지원",
      description: "24/7 전담 지원, 커스텀 통합",
      icon: <Crown className="h-5 w-5" />,
      level: "enterprise" as const,
      available: enterpriseAccess.hasAccess,
    },
  ];

  const getLevelBadge = (level: string) => {
    const colors = {
      free: "bg-gray-100 text-gray-800",
      starter: "bg-blue-100 text-blue-800",
      pro: "bg-purple-100 text-purple-800",
      enterprise: "bg-orange-100 text-orange-800",
    };

    const labels = {
      free: "무료",
      starter: "Starter",
      pro: "Pro",
      enterprise: "Enterprise",
    };

    return (
      <Badge className={colors[level as keyof typeof colors]}>
        {labels[level as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">기능 둘러보기</h1>
        <p className="text-muted-foreground">
          멤버십 레벨에 따라 사용할 수 있는 기능들을 확인해보세요.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card
            key={index}
            className={`relative ${!feature.available ? "opacity-75" : ""}`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {feature.icon}
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
                {feature.available ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Lock className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <CardDescription>{feature.description}</CardDescription>
                {getLevelBadge(feature.level)}
              </div>
            </CardHeader>
            <CardContent>
              {feature.level === "free" ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    모든 사용자가 이용할 수 있는 기본 기능입니다.
                  </p>
                  <Button className="w-full" variant="outline">
                    사용해보기
                  </Button>
                </div>
              ) : (
                <MembershipGuard
                  requiredLevel={feature.level}
                  showUpgrade={false}
                  fallback={
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        이 기능을 사용하려면 {feature.level} 플랜 이상이
                        필요합니다.
                      </p>
                      <Button className="w-full" variant="outline" disabled>
                        <Lock className="h-4 w-4 mr-2" />
                        잠김
                      </Button>
                    </div>
                  }
                >
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      이 기능을 자유롭게 사용할 수 있습니다.
                    </p>
                    <Button className="w-full">사용해보기</Button>
                  </div>
                </MembershipGuard>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pro 전용 섹션 예시 */}
      <Card>
        <CardHeader>
          <CardTitle>Pro 전용 고급 분석</CardTitle>
          <CardDescription>
            상세한 사용자 분석과 리포트를 확인하세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MembershipGuard requiredLevel="pro">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">월간 사용자</h3>
                  <p className="text-2xl font-bold">1,234</p>
                  <p className="text-sm text-green-600">+12% 전월 대비</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">수익</h3>
                  <p className="text-2xl font-bold">$5,678</p>
                  <p className="text-sm text-green-600">+8% 전월 대비</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">전환율</h3>
                  <p className="text-2xl font-bold">3.2%</p>
                  <p className="text-sm text-red-600">-0.1% 전월 대비</p>
                </div>
              </div>
            </div>
          </MembershipGuard>
        </CardContent>
      </Card>

      {/* Enterprise 전용 섹션 예시 */}
      <Card>
        <CardHeader>
          <CardTitle>Enterprise 전용 관리 도구</CardTitle>
          <CardDescription>
            고급 관리 및 보안 기능을 사용하세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MembershipGuard requiredLevel="enterprise">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Enterprise 고객을 위한 전용 관리 도구와 고급 보안 기능들입니다.
              </p>
              <div className="flex space-x-2">
                <Button>감사 로그 보기</Button>
                <Button variant="outline">보안 설정</Button>
                <Button variant="outline">사용자 관리</Button>
              </div>
            </div>
          </MembershipGuard>
        </CardContent>
      </Card>
    </div>
  );
}
