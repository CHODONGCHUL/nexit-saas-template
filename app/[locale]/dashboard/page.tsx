"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  User,
  Settings,
  BarChart3,
  Crown,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Activity,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import {
  useCurrentUserProfile,
  useUserSubscription,
  useHasActiveSubscription,
  useMembershipLevel,
} from "@/hooks/user-hook";

function WelcomeSection() {
  const { data: userProfile, isLoading } = useCurrentUserProfile();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
    );
  }

  const displayName =
    userProfile?.user_metadata?.name ||
    userProfile?.user_metadata?.username ||
    userProfile?.profile?.name ||
    userProfile?.profile?.username ||
    "사용자";
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "좋은 아침이에요"
      : currentHour < 18
      ? "안녕하세요"
      : "좋은 저녁이에요";

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">
        {greeting}, {displayName}님! 👋
      </h1>
      <p className="text-muted-foreground">
        오늘도 좋은 하루 보내세요. 여기는 여러분의 대시보드입니다.
      </p>
    </div>
  );
}

function SubscriptionCard() {
  const { data: userProfile } = useCurrentUserProfile();
  const { data: subscription, isLoading: subscriptionLoading } =
    useUserSubscription(userProfile?.id);
  const { data: hasActiveSubscription, isLoading: activeLoading } =
    useHasActiveSubscription(userProfile?.id);
  const { data: membershipLevel, isLoading: levelLoading } = useMembershipLevel(
    userProfile?.id
  );

  if (subscriptionLoading || activeLoading || levelLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">구독 상태</CardTitle>
        <Crown className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          {hasActiveSubscription ? (
            <>
              <CheckCircle className="h-4 w-4 text-green-500" />
              <Badge variant="default" className="bg-green-100 text-green-800">
                활성
              </Badge>
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4 text-orange-500" />
              <Badge variant="secondary">무료 플랜</Badge>
            </>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            멤버십:{" "}
            <span className="font-medium">{membershipLevel || "Free"}</span>
          </p>
          {subscription?.product_name && (
            <p className="text-sm text-muted-foreground">
              플랜:{" "}
              <span className="font-medium">{subscription.product_name}</span>
            </p>
          )}
        </div>
        <Link href="/dashboard/subscription">
          <Button size="sm" className="w-full">
            {hasActiveSubscription ? "구독 관리" : "플랜 업그레이드"}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

function ActivityStatsCard() {
  const { data: userProfile } = useCurrentUserProfile();
  const { data: hasActiveSubscription } = useHasActiveSubscription(
    userProfile?.id
  );

  // 간단한 사용 통계 (실제 구현에서는 데이터베이스에서 가져올 수 있음)
  const joinDate = userProfile?.created_at
    ? new Date(userProfile.created_at)
    : new Date();
  const daysSinceJoin = Math.floor(
    (new Date().getTime() - joinDate.getTime()) / (1000 * 3600 * 24)
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">활동 요약</CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {daysSinceJoin}
            </div>
            <div className="text-xs text-muted-foreground">가입 일수</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {hasActiveSubscription ? "Pro" : "Free"}
            </div>
            <div className="text-xs text-muted-foreground">현재 플랜</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/dashboard/features">
            <Button size="sm" className="w-full">
              <BookOpen className="h-3 w-3 mr-1" />새 기능 둘러보기
            </Button>
          </Link>
          <Link href="/dashboard/support">
            <Button variant="outline" size="sm" className="w-full">
              도움말 센터
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActionsCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">빠른 액션</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Link href="/dashboard/settings">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Settings className="h-3 w-3 mr-2" />
            계정 설정
          </Button>
        </Link>
        <Link href="/dashboard/support">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <BarChart3 className="h-3 w-3 mr-2" />
            고객 지원
          </Button>
        </Link>
        <Link href="/dashboard/features">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <User className="h-3 w-3 mr-2" />
            새로운 기능
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

function RecentActivityCard() {
  // 일반 사용자용 업데이트 & 도움말 카드
  const helpItems = [
    {
      title: "서비스 이용 가이드",
      description: "기본적인 서비스 사용법을 확인해보세요",
      href: "/dashboard/support",
      icon: HelpCircle,
    },
    {
      title: "새로운 기능 알아보기",
      description: "최근 추가된 기능들을 살펴보세요",
      href: "/dashboard/features",
      icon: BookOpen,
    },
    {
      title: "고객 지원",
      description: "문의사항이 있으시면 언제든 연락해주세요",
      href: "/dashboard/support/contact",
      icon: HelpCircle,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>도움말 & 업데이트</CardTitle>
        <CardDescription>
          유용한 정보와 최신 업데이트를 확인하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {helpItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex-shrink-0">
                  <item.icon className="h-5 w-5 text-blue-500 mt-0.5" />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <h4 className="text-sm font-medium">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8">
      <WelcomeSection />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SubscriptionCard />
        <ActivityStatsCard />
        <QuickActionsCard />
      </div>

      <RecentActivityCard />
    </div>
  );
}
