"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Check, ArrowRightIcon } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import AnimationContainer from "@/components/animation-container";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ConfettiEffects,
  confettiService,
} from "@/components/landing-page/confetti-effects";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const DiscountPricingSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        confettiService.launchSideCannons();
      }, 500);
    }
  }, [inView]);

  return (
    <div ref={ref} className="relative">
      <ConfettiEffects autoStart={false} />
      <AnimationContainer delay={0.2}>
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                period: "3개월",
                price: 79000,
                originalPrice: 150000,
                colors: { firstColor: "#ff00aa", secondColor: "#00FFF1" },
              },
              {
                period: "6개월",
                price: 139000,
                originalPrice: 300000,
                colors: { firstColor: "#7928CA", secondColor: "#FF0080" },
              },
              {
                period: "1년",
                price: 239000,
                originalPrice: 600000,
                colors: { firstColor: "#00FFF1", secondColor: "#7928CA" },
              },
            ].map((offer, index) => (
              <div key={offer.period} className="relative">
                <div
                  className="absolute -z-10 -inset-10 rounded-[2rem] blur-[40px] opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(0deg, ${offer.colors.firstColor}, ${offer.colors.secondColor})`,
                    backgroundSize: "150% 300%",
                    animation:
                      "background-position-spin 4500ms infinite alternate ease-in-out",
                  }}
                />
                <MagicCard
                  className="group p-6 rounded-xl overflow-hidden"
                  gradientFrom={offer.colors.firstColor}
                  gradientTo={offer.colors.secondColor}
                  gradientOpacity={0.9}
                >
                  <div className="flex h-full flex-col justify-between space-y-4 cursor-pointer relative z-10">
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="font-medium text-xl text-foreground">
                          {offer.period}
                        </h3>
                        <Badge className="!bg-red-500/75 !text-white font-bold">
                          {Math.round(
                            ((offer.originalPrice - offer.price) /
                              offer.originalPrice) *
                              100
                          )}
                          % 할인
                        </Badge>
                      </div>
                      <div className="flex items-baseline space-x-2">
                        <span className="line-through text-muted-foreground text-lg">
                          {offer.originalPrice.toLocaleString()}원
                        </span>
                      </div>
                      <div className="mt-1 flex items-baseline">
                        <span className="font-medium text-3xl text-foreground">
                          {offer.price.toLocaleString()}원
                        </span>
                      </div>
                      <Separator className="my-4" />
                      <ul className="space-y-2.5">
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">
                            프로 요금제 모든 기능
                          </span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">
                            기간 내 무제한 업데이트
                          </span>
                        </li>
                        <li className="flex items-center">
                          <Check className="mr-2 h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">
                            우선 지원
                          </span>
                        </li>
                      </ul>
                    </div>
                    <InteractiveHoverButton className="w-full font-semibold py-4">
                      구독하기
                    </InteractiveHoverButton>
                  </div>
                </MagicCard>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-muted-foreground">
            ※ 한정 수량으로 진행되는 이벤트로, 사전 공지 없이 종료될 수
            있습니다.
          </p>
        </div>
      </AnimationContainer>
    </div>
  );
};

export default DiscountPricingSection;
