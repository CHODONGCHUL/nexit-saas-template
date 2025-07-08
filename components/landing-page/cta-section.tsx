import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { ShinyButton } from "@/components/ui/shiny-button";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import AnimationContainer from "@/components/animation-container";
import MaxWidthWrapper from "@/components/max-width-wrapper";

const CTASection = () => {
  return (
    <MaxWidthWrapper className="scrollbar-hide mt-20 max-w-[100vw] overflow-x-hidden">
      <AnimationContainer delay={0.1}>
        <div className="relative flex w-full flex-col items-center justify-center py-16 text-center">
          <TypewriterEffect
            words={[
              { text: "더" },
              { text: "이상" },
              { text: "시간을" },
              { text: "낭비하지" },
              { text: "마세요." },
              { text: "NEXIT", className: "!text-[#70e82b] font-bold" },
              { text: "으로" },
              { text: "지금" },
              { text: "시작하세요!" },
            ]}
            className="!leading-[1.2] text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-heading font-medium tracking-tight"
            cursorClassName="bg-primary h-8 sm:h-10 md:h-12 lg:h-14"
          />
          <p className="mx-auto mt-6 max-w-md text-muted-foreground">
            한국 개발자를 위한 완전한 SaaS 스타터 키트입니다.
            <br />
            <strong>이제 복잡한 설정 없이도 바로 서비스를 런칭</strong>할 수
            있습니다.
            <br />* 지금 최대 60%의 할인을 받을 수 있습니다! *
          </p>
          <div className="mt-6">
            <Link href="/dashboard" className="contents">
              <ShinyButton className="px-8 py-4">
                <div className="flex items-center text-lg font-medium">
                  대시보드로 이동
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </div>
              </ShinyButton>
            </Link>
          </div>
        </div>
        <div className="mt-10 relative z-50">
          <TextHoverEffect text="NEXIT" />
        </div>
      </AnimationContainer>
    </MaxWidthWrapper>
  );
};

export default CTASection;
