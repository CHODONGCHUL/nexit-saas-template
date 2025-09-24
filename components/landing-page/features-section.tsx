import { Sparkles } from "lucide-react";
import { CARDS } from "@/components/ui/bento-grid";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import InteractiveMagicBadge from "@/components/ui/interactive-magic-badge";
import AnimationContainer from "@/components/animation-container";
import MaxWidthWrapper from "@/components/max-width-wrapper";

const FeaturesSection = () => {
  return (
    <MaxWidthWrapper className="pt-10">
      <AnimationContainer delay={0.1}>
        <div
          id="features"
          className="flex w-full flex-col items-center justify-center py-8 lg:items-center"
        >
          <InteractiveMagicBadge
            title="핵심 기능"
            icon={<Sparkles className="h-4 w-4 text-primary" />}
          />
          <h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
            배달의 새로운 기준, 카카오맵 완전 자동화
          </h2>
          <p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
            AutoNavi는 배달 라이더의 효율을 극대화하기 위해 송신자/수신자 자동 연동부터 UID 인증 기반 보안까지, 배달 환경에 최적화된<br /> 기능을 제공합니다.
          </p>
        </div>
      </AnimationContainer>
      <AnimationContainer delay={0.2}>
        <BentoGrid className="py-8">
          {CARDS.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </AnimationContainer>
    </MaxWidthWrapper>
  );
};

export default FeaturesSection;