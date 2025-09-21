"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import { Check, Loader2, Star, Zap, Crown } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import AnimationContainer from "@/components/animation-container";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  ConfettiEffects,
  confettiService,
} from "@/components/landing-page/confetti-effects";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { getCurrentUser } from "@/services/user";
import { toast } from "sonner";
import { useCreemCheckout } from "@/hooks/creem-hook";

type BillingInterval = "month" | "year";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  description: string;
  icon: React.ReactNode;
  popular?: boolean;
  pricing: {
    month: { amount: number | "contact"; productId?: string };
    year: { amount: number | "contact"; productId?: string; discount?: number };
  };
  features: PlanFeature[];
  colors: {
    firstColor: string;
    secondColor: string;
  };
}

const TabbedPricingSection = () => {
  const router = useRouter();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("month");
  const { mutate: createCheckout, isPending: checkoutLoading } =
    useCreemCheckout();

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        confettiService.launchSideCannons();
      }, 500);
    }
  }, [inView]);

  const plans: Plan[] = [
    {
      name: "Starter",
      description: "개인 개발자와 소규모 프로젝트를 위한 플랜",
      icon: <Star className="h-6 w-6" />,
      pricing: {
        month: { amount: 17, productId: "prod_6aObr2bs7q1JkhxiBtGve5" },
        year: {
          amount: 122,
          productId: "prod_1dnNdAxzn7iVtXLXLWrnXB",
          discount: 28,
        },
      },
      features: [
        { text: "프로젝트 3개", included: true },
        { text: "월 10GB 스토리지", included: true },
        { text: "기본 지원", included: true },
        { text: "커뮤니티 접근", included: true },
        { text: "고급 분석", included: false },
        { text: "우선 지원", included: false },
        { text: "커스텀 도메인", included: false },
        { text: "팀 협업 기능", included: false },
      ],
      colors: {
        firstColor: "#3B82F6",
        secondColor: "#1E40AF",
      },
    },
    {
      name: "Pro",
      description: "AutoNavi 월간 구독",
      icon: <Zap className="h-6 w-6" />,
      popular: true,
      pricing: {
        month: { amount: 5, productId: "prod_5DM4VniI4WgXdQOooxjS0o" },
        year: {
          amount: 54,
          productId: "prod_5DM4VniI4WgXdQOooxjS0o",
          discount: 10,
        },
      },
      features: [
        { text: "무제한 프로젝트", included: true },
        { text: "월 100GB 스토리지", included: true },
        { text: "우선 지원", included: true },
        { text: "고급 분석", included: true },
        { text: "커스텀 도메인", included: true },
        { text: "팀 협업 기능", included: true },
        { text: "API 접근", included: true },
        { text: "고급 보안 기능", included: true },
      ],
      colors: {
        firstColor: "#7C3AED",
        secondColor: "#5B21B6",
      },
    },
    {
      name: "Enterprise",
      description: "특별한 요구사항을 위한 맞춤형 플랜",
      icon: <Crown className="h-6 w-6" />,
      pricing: {
        month: { amount: "contact" },
        year: { amount: "contact" },
      },
      features: [
        { text: "24/7 전담 지원", included: true },
        { text: "고급 분석 및 리포팅", included: true },
        { text: "멀티 커스텀 도메인", included: true },
        { text: "고급 팀 협업 기능", included: true },
        { text: "전체 API 접근", included: true },
        { text: "엔터프라이즈 보안", included: true },
        { text: "맞춤형 통합", included: true },
        { text: "전담 계정 매니저", included: true },
      ],
      colors: {
        firstColor: "#dc5726",
        secondColor: "#993a1b",
      },
    },
  ];

  const handleSubscribe = async (planName: string, productId?: string) => {
    if (planName === "Enterprise") {
      router.push("/contact");
      return;
    }

    if (!productId) {
      toast.error("제품 ID가 없습니다.");
      return;
    }

    try {
      const user = await getCurrentUser();
      if (!user) {
        toast.error("로그인이 필요합니다.");
        return;
      }

      createCheckout(
        {
          productId: productId,
          userId: user.id,
          email: user.email || "",
          successUrl: `${window.location.origin}/dashboard?success=true`,
          metadata: {
            plan: `${planName} ${
              billingInterval === "month" ? "Monthly" : "Yearly"
            }`,
          },
        },
        {
          onSuccess: (data) => {
            window.location.href = data.url;
          },
          onError: (error) => {
            console.error("Checkout error:", error);
            toast.error("결제 페이지로 이동하는 중 오류가 발생했습니다.");
          },
        }
      );
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("결제 페이지로 이동하는 중 오류가 발생했습니다.");
    }
  };

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div ref={ref} className="relative">
      <ConfettiEffects autoStart={false} />
      <AnimationContainer delay={0.2}>
        <div className="mx-auto max-w-7xl">
          {/* 섹션 제목 */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              요금제 선택
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              프로젝트 규모에 맞는 최적의 플랜을 선택하세요
            </p>
          </div>

          {/* 월간/연간 전환 */}
          <div className="flex justify-center mb-8">
            <div className="bg-muted p-1 rounded-lg inline-flex">
              <Button
                variant={billingInterval === "month" ? "default" : "ghost"}
                size="sm"
                onClick={() => setBillingInterval("month")}
              >
                월간 결제
              </Button>
              <Button
                variant={billingInterval === "year" ? "default" : "ghost"}
                size="sm"
                onClick={() => setBillingInterval("year")}
              >
                연간 결제
                <Badge className="ml-2 bg-green-500 text-white text-xs">
                  최대 40% 할인
                </Badge>
              </Button>
            </div>
          </div>

          {/* 플랜 카드 */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
            {plans.map((plan) => {
              const currentPricing = plan.pricing[billingInterval];
              const discount =
                billingInterval === "year" &&
                typeof currentPricing.amount === "number" &&
                "discount" in currentPricing
                  ? (currentPricing as any).discount
                  : undefined;

              return (
                <MagicCard
                  key={plan.name}
                  className={`group p-8 rounded-2xl h-full overflow-hidden ${
                    plan.popular ? "ring-2 ring-purple-500 ring-opacity-50" : ""
                  }`}
                  gradientFrom={plan.colors.firstColor}
                  gradientTo={plan.colors.secondColor}
                  gradientOpacity={0.1}
                >
                  <div className="flex h-full flex-col justify-between space-y-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                          {plan.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-2xl text-foreground">
                            {plan.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {plan.description}
                          </p>
                        </div>
                      </div>

                      {/* 가격 */}
                      <div className="mb-6 min-h-[50px]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline space-x-2">
                            {currentPricing.amount === "contact" ? (
                              <span className="font-bold text-3xl text-foreground">
                                문의 필요
                              </span>
                            ) : (
                              <>
                                <span className="font-bold text-4xl text-foreground">
                                  {formatPrice(currentPricing.amount as number)}
                                </span>
                                <span className="text-muted-foreground">
                                  /{billingInterval === "month" ? "월" : "년"}
                                </span>
                              </>
                            )}
                          </div>

                          {billingInterval === "year" &&
                            discount &&
                            typeof currentPricing.amount === "number" && (
                              <div className="text-right">
                                <Badge className="bg-green-100 text-green-800 text-sm mb-1">
                                  {discount}% 할인 적용
                                </Badge>
                                <p className="text-xs text-muted-foreground">
                                  월간 대비{" "}
                                  {formatPrice(
                                    (plan.pricing.month.amount as number) *
                                      12 -
                                      (currentPricing.amount as number)
                                  )}{" "}
                                  절약
                                </p>
                              </div>
                            )}
                        </div>
                      </div>

                      <Separator className="my-6" />

                      {/* 기능 */}
                      <ul className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center space-x-3"
                          >
                            <Check
                              className={`h-4 w-4 ${
                                feature.included
                                  ? "text-green-500"
                                  : "text-gray-300"
                              }`}
                            />
                            <span
                              className={`text-sm ${
                                feature.included
                                  ? "text-foreground"
                                  : "text-muted-foreground line-through"
                              }`}
                            >
                              {feature.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 버튼 */}
                    <InteractiveHoverButton
                      className="w-full font-semibold py-4"
                      onClick={() =>
                        handleSubscribe(plan.name, currentPricing.productId)
                      }
                      disabled={checkoutLoading}
                    >
                      {checkoutLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          처리 중...
                        </div>
                      ) : plan.name === "Enterprise" ? (
                        "문의하기"
                      ) : (
                        `${plan.name} 시작하기`
                      )}
                    </InteractiveHoverButton>
                  </div>
                </MagicCard>
              );
            })}
          </div>
        </div>
      </AnimationContainer>
    </div>
  );
};

export default TabbedPricingSection;
