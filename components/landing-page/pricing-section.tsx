import { PartyPopper, MessageCircle } from "lucide-react";
import InteractiveMagicBadge from "@/components/ui/interactive-magic-badge";
import AnimationContainer from "@/components/animation-container";
import MaxWidthWrapper from "@/components/max-width-wrapper";

const PricingSection = () => {
  return (
    <MaxWidthWrapper className="py-10">
      <AnimationContainer delay={0.1}>
        <div
          id="pricing"
          className="mx-auto flex w-full max-w-xl flex-col items-center justify-center py-8 lg:items-center"
        >
          <InteractiveMagicBadge
            title="합리적인 요금제"
            icon={<PartyPopper className="h-4 w-4 text-primary" />}
          />
          <h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
            AutoNavi 요금제
          </h2>
          <p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
            무료 체험 기간 동안 사용자 기기와의 호환성을 <br /> 충분히 확인해 보세요.
          </p>
        </div>
      </AnimationContainer>

      {/* 요금제 카드 */}
      <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
        {/* Starter */}
        <div className="flex flex-col items-center rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Starter</h3>
          <p className="mt-2 text-2xl font-bold">$6 / 월</p>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            한 달 단위로 이용 가능한 기본 플랜입니다. <br />
            소규모 사용자 및 테스트 목적에 적합합니다.
          </p>
          <button className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-white hover:opacity-90">
            Starter 결제하기
          </button>
        </div>

        {/* Pro */}
        <div className="flex flex-col items-center rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">Pro</h3>
          <p className="mt-2 text-2xl font-bold">$5 / 월</p>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            매달 자동 결제되는 구독 플랜입니다. <br />
            장기적으로 안정적인 사용을 원하실 때 추천드립니다.
          </p>
          <button className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-white hover:opacity-90">
            Pro 구독하기
          </button>
        </div>

        {/* 계좌이체 */}
        <div className="flex flex-col items-center rounded-lg border p-6 shadow-sm">
          <h3 className="text-xl font-semibold">계좌이체</h3>
          <p className="mt-2 text-2xl font-bold">문의 필요</p>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            계좌이체 전용 플랜입니다. <br />
            <br />
            📧 메일: heysandmole@gmail.com <br />
            📞 전화: 010-2174-4838 <br />
            💳 계좌: 케이뱅크 100-300-039351
          </p>
          <button className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-white hover:opacity-90">
            계좌이체 문의
          </button>
        </div>
      </div>

      <AnimationContainer delay={0.3}>
        <div className="mx-auto mt-8 flex w-full max-w-5xl flex-wrap items-start justify-center gap-6 md:items-center lg:justify-evenly">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-foreground" />
            <span className="text-muted-foreground">
              Starter · Pro는 카드결제, 개인 송금은은 계좌이체로 진행됩니다.
            </span>
          </div>
        </div>
      </AnimationContainer>
    </MaxWidthWrapper>
  );
};

export default PricingSection;
