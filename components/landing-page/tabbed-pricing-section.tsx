"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import { Loader2, Star, Zap, Crown, Check } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import AnimationContainer from "@/components/animation-container";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { getCurrentUser } from "@/services/user";
import { useCreemCheckout } from "@/hooks/creem-hook";
import {
  ConfettiEffects,
  confettiService,
} from "@/components/landing-page/confetti-effects";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  description: string;
  icon: React.ReactNode;
  pricing: {
    amount: number | "contact";
    productId?: string;
  };
  features: PlanFeature[];
  colors: {
    firstColor: string;
    secondColor: string;
  };
}

const TabbedPricingSection = () => {
  const router = useRouter();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
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
      description: "1회용 월 사용권",
      icon: <Star className="h-6 w-6" />,
      pricing: {
        amount: 6,
        productId: "prod_JNEkp2tWTwN96RCshQ1jE", // ✅ Starter (Live)
      },
      features: [
        { text: "AutoNavi 한 달 체험권 (1회 결제)", included: true },
        { text: "자동 갱신 없음", included: true },
        { text: "카드결제 지원", included: true },
      ],
      colors: { firstColor: "#3B82F6", secondColor: "#1E40AF" },
    },
    {
      name: "Pro",
      description: "매달 자동 구독 플랜",
      icon: <Zap className="h-6 w-6" />,
      pricing: {
        amount: 5,
        productId: "prod_5yT3yYRN3mBKsjR0AwfPhJ", // ✅ Pro (Live)
      },
      features: [
        { text: "AutoNavi 매달 구독", included: true },
        { text: "자동 갱신", included: true },
        { text: "카드결제 지원", included: true },
      ],
      colors: { firstColor: "#7C3AED", secondColor: "#5B21B6" },
    },
    {
      name: "계좌이체",
      description: "계좌이체 전용 플랜",
      icon: <Crown className="h-6 w-6" />,
      pricing: { amount: "contact" },
      features: [
        { text: "메일: heysandmole@gmail.com", included: true },
        { text: "전화: 010-2174-4838", included: true },
        {
          text: "계좌: 케이뱅크 100-300-039351 (예금주: 사장님)",
          included: true,
        },
      ],
      colors: { firstColor: "#dc5726", secondColor: "#993a1b" },
    },
  ];

  const handleSubscribe = async (planName: string, productId?: string) => {
    if (planName === "계좌이체") {
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
          productId,
          userId: user.id,
          email: user.email || "",
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/dashboard?canceled=true`,
          metadata: { plan: planName },
        },
        {
          onSuccess: (data) => {
            if (data?.url) {
              window.location.href = data.url;
            } else {
              toast.error("결제 URL이 없습니다.");
            }
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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              요금제 선택
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              원하는 방식으로 AutoNavi를 이용해보세요
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
            {plans.map((plan) => (
              <MagicCard
                key={plan.name}
                className="group p-8 rounded-2xl h-full overflow-hidden"
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

                    <div className="mb-6 min-h-[50px]">
                      {plan.pricing.amount === "contact" ? (
                        <span className="font-bold text-2xl text-foreground">
                          문의 필요
                        </span>
                      ) : (
                        <span className="font-bold text-3xl text-foreground">
                          {formatPrice(plan.pricing.amount as number)}{" "}
                          {plan.name === "Starter" ? "/1회" : "/월"}
                        </span>
                      )}
                    </div>

                    <Separator className="my-6" />

                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center space-x-3"
                        >
                          <Check className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-foreground">
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <InteractiveHoverButton
                    className="w-full font-semibold py-4"
                    onClick={() =>
                      handleSubscribe(plan.name, plan.pricing.productId)
                    }
                    disabled={checkoutLoading}
                  >
                    {checkoutLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        처리 중...
                      </div>
                    ) : plan.name === "계좌이체" ? (
                      "계좌이체 문의"
                    ) : (
                      `${plan.name} 결제하기`
                    )}
                  </InteractiveHoverButton>
                </div>
              </MagicCard>
            ))}
          </div>
        </div>
      </AnimationContainer>
    </div>
  );
};

export default TabbedPricingSection;
