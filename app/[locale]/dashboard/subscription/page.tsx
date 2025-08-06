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
import { Separator } from "@/components/ui/separator";
import {
  useCurrentUser,
  useUserSubscription,
  useCurrentUserProfile,
} from "@/hooks/user-hook";
import { getCustomerPortalUrl } from "@/services/creem";
import { toast } from "sonner";
import { CreditCard, Calendar, Settings, Crown, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { useState } from "react";
import { useLocale } from "next-intl";

export default function SubscriptionPage() {
  const { data: user, isLoading } = useCurrentUser();
  const { data: subscription, isLoading: subscriptionLoading } =
    useUserSubscription(user?.id);
  const { data: profile } = useCurrentUserProfile();
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);
  const locale = useLocale();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      case "past_due":
        return "bg-yellow-100 text-yellow-800";
      case "paused":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "활성";
      case "canceled":
        return "취소됨";
      case "past_due":
        return "결제 지연";
      case "paused":
        return "일시정지";
      default:
        return "알 수 없음";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency === "KRW" ? "KRW" : "USD",
    }).format(amount / 100);
  };

  const handleCustomerPortal = async () => {
    if (!profile?.profile?.customer_id) {
      toast.error("고객 ID를 찾을 수 없습니다.");
      return;
    }

    setIsLoadingPortal(true);
    try {
      const portalUrl = await getCustomerPortalUrl(profile.profile.customer_id);
      window.open(portalUrl, "_blank");
    } catch (error) {
      toast.error("고객 포털 접속에 실패했습니다.");
      console.error("Customer portal error:", error);
    } finally {
      setIsLoadingPortal(false);
    }
  };

  if (isLoading || subscriptionLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">구독 관리</h1>
          <p className="text-muted-foreground">
            구독 플랜과 결제 정보를 관리하세요.
          </p>
        </div>
        <div className="grid gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!subscription || !subscription.status) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">구독 관리</h1>
          <p className="text-muted-foreground">
            구독 플랜과 결제 정보를 관리하세요.
          </p>
        </div>
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            현재 활성화된 구독이 없습니다.{" "}
            <Link href="/pricing" className="font-semibold underline">
              여기에서 플랜을 선택하세요
            </Link>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">구독 관리</h1>
        <p className="text-muted-foreground">
          구독 플랜과 결제 정보를 관리하세요.
        </p>
      </div>

      <div className="grid gap-6">
        {/* 현재 플랜 정보 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                <CardTitle>현재 플랜</CardTitle>
              </div>
              <Badge className={getStatusColor(subscription.status!)}>
                {getStatusText(subscription.status!)}
              </Badge>
            </div>
            <CardDescription>
              현재 구독 중인 플랜의 상세 정보입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">플랜명</p>
                <p className="font-semibold text-lg">
                  {subscription.product_name || "Unknown Plan"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">가격</p>
                <p className="font-semibold text-lg">
                  {subscription.amount
                    ? formatAmount(
                        subscription.amount,
                        subscription.currency || "USD"
                      )
                    : "N/A"}
                  <span className="text-sm text-muted-foreground">
                    /{subscription.interval === "month" ? "월" : "년"}
                  </span>
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">현재 결제 주기</p>
              </div>
              <p className="font-medium">
                {subscription.current_period_start &&
                subscription.current_period_end
                  ? `${formatDate(
                      subscription.current_period_start
                    )} - ${formatDate(subscription.current_period_end)}`
                  : "N/A"}
              </p>
            </div>

            {subscription.canceled_at && (
              <Alert>
                <AlertDescription>
                  구독이 {formatDate(subscription.canceled_at)}에
                  취소되었습니다.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* 구독 관리 액션 */}
        <Card>
          <CardHeader>
            <CardTitle>구독 관리</CardTitle>
            <CardDescription>
              플랜을 변경하거나 관리하려면 요금제 페이지를 방문하세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                className="w-full"
                onClick={handleCustomerPortal}
                disabled={!profile?.profile?.customer_id || isLoadingPortal}
              >
                <Crown className="h-4 w-4 mr-2" />
                {isLoadingPortal ? "접속 중..." : "플랜 변경하기"}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleCustomerPortal}
                disabled={!profile?.profile?.customer_id || isLoadingPortal}
              >
                <Settings className="h-4 w-4 mr-2" />
                {isLoadingPortal ? "접속 중..." : "결제 관리"}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              구독 변경, 취소 등의 관리는 고객 포털에서 가능합니다.
            </p>
            {!profile?.profile?.customer_id && (
              <Alert>
                <AlertDescription>
                  결제 관리 기능을 사용하려면 먼저 구독을 신청해야 합니다.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
