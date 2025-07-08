import { PartyPopper, MessageCircle } from "lucide-react";
import InteractiveMagicBadge from "@/components/ui/interactive-magic-badge";
import AnimationContainer from "@/components/animation-container";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import TabbedPricingSection from "./tabbed-pricing-section";

const PricingSection = () => {
  return (
    <MaxWidthWrapper className="py-10">
      <AnimationContainer delay={0.1}>
        <div
          id="pricing"
          className="mx-auto flex w-full max-w-xl flex-col items-center justify-center py-8 lg:items-center"
        >
          <InteractiveMagicBadge
            title="특별 할인"
            icon={<PartyPopper className="h-4 w-4 text-primary" />}
          />
          <h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
            얼리버드 특가 템플릿
          </h2>
          <p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
            지금 구매하면 최대 60% 할인된 가격으로 NEXIT SaaS 템플릿의 모든
            소스코드와 가이드를 제공받을 수 있습니다. 한정 수량으로 진행되는
            이번 이벤트, 놓치지 마세요!
          </p>
        </div>
      </AnimationContainer>

      <TabbedPricingSection />

      <AnimationContainer delay={0.3}>
        <div className="mx-auto mt-8 flex w-full max-w-5xl flex-wrap items-start justify-center gap-6 md:items-center lg:justify-evenly">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-foreground" />
            <span className="text-muted-foreground">
              구매 후 즉시 GitHub 저장소 및 상세 가이드 제공
            </span>
          </div>
        </div>
      </AnimationContainer>
    </MaxWidthWrapper>
  );
};

export default PricingSection;
