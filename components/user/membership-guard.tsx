"use client";

import { ReactNode } from "react";
import { useCurrentUser, useMembershipLevel } from "@/hooks/user-hook";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Lock } from "lucide-react";
import Link from "next/link";

type MembershipLevel = "free" | "starter" | "pro" | "enterprise";

interface MembershipGuardProps {
  children: ReactNode;
  requiredLevel: MembershipLevel;
  fallback?: ReactNode;
  showUpgrade?: boolean;
}

const MEMBERSHIP_HIERARCHY: Record<MembershipLevel, number> = {
  free: 0,
  starter: 1,
  pro: 2,
  enterprise: 3,
};

const MEMBERSHIP_LABELS: Record<MembershipLevel, string> = {
  free: "무료",
  starter: "Starter",
  pro: "Pro",
  enterprise: "Enterprise",
};

export function MembershipGuard({
  children,
  requiredLevel,
  fallback,
  showUpgrade = true,
}: MembershipGuardProps) {
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: currentLevel, isLoading: levelLoading } = useMembershipLevel(
    user?.id
  );

  // 로딩 중일 때
  if (userLoading || levelLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // 로그인하지 않은 경우
  if (!user) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Lock className="h-5 w-5" />
            <CardTitle>로그인 필요</CardTitle>
          </div>
          <CardDescription>
            이 기능을 사용하려면 로그인이 필요합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/sign-in">로그인하기</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  // 멤버십 레벨 확인
  const userLevelValue = MEMBERSHIP_HIERARCHY[currentLevel || "free"];
  const requiredLevelValue = MEMBERSHIP_HIERARCHY[requiredLevel];

  // 접근 권한이 있는 경우
  if (userLevelValue >= requiredLevelValue) {
    return <>{children}</>;
  }

  // 커스텀 fallback이 있는 경우
  if (fallback) {
    return <>{fallback}</>;
  }

  // 기본 업그레이드 안내
  if (showUpgrade) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            <CardTitle>업그레이드 필요</CardTitle>
          </div>
          <CardDescription>
            이 기능을 사용하려면 {MEMBERSHIP_LABELS[requiredLevel]} 플랜 이상이
            필요합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <p>
              현재 플랜:{" "}
              <span className="font-medium">
                {MEMBERSHIP_LABELS[currentLevel || "free"]}
              </span>
            </p>
            <p>
              필요 플랜:{" "}
              <span className="font-medium">
                {MEMBERSHIP_LABELS[requiredLevel]}
              </span>
            </p>
          </div>
          <Button asChild className="w-full">
            <Link href="/pricing">
              <Crown className="h-4 w-4 mr-2" />
              플랜 업그레이드
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
}

/**
 * 특정 기능 사용 가능 여부 확인 훅
 */
export function useFeatureAccess(requiredLevel: MembershipLevel) {
  const { data: user } = useCurrentUser();
  const { data: currentLevel } = useMembershipLevel(user?.id);

  const userLevelValue = MEMBERSHIP_HIERARCHY[currentLevel || "free"];
  const requiredLevelValue = MEMBERSHIP_HIERARCHY[requiredLevel];

  return {
    hasAccess: userLevelValue >= requiredLevelValue,
    currentLevel: currentLevel || "free",
    requiredLevel,
    needsUpgrade: userLevelValue < requiredLevelValue,
  };
}
