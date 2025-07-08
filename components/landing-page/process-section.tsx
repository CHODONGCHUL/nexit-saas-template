import { FileText, Code, Zap, DollarSign } from "lucide-react";
import InteractiveMagicBadge from "@/components/ui/interactive-magic-badge";
import MagicHoverCard from "@/components/ui/magic-hover-card";
import AnimationContainer from "@/components/animation-container";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export const PROCESS = [
  {
    title: "즉시 시작 가능한 구조",
    description:
      "Supabase DB 설정부터 Next.js 프로젝트 구조까지 모든 것이 미리 설정되어 있어 바로 개발을 시작할 수 있습니다.",
    icon: Code,
  },
  {
    title: "한국형 인증 시스템",
    description:
      "카카오 로그인, 이메일 인증 등 한국 사용자에게 친숙한 인증 방식을 모두 지원합니다.",
    icon: Zap,
  },
  {
    title: "국내 결제 연동",
    description:
      "Stripe 대신 Creem.io를 사용하여 국내 카드 결제와 해외 결제를 모두 지원합니다.",
    icon: DollarSign,
  },
] as const;

const ProcessSection = () => {
  return (
    <MaxWidthWrapper className="py-40">
      <AnimationContainer delay={0.1}>
        <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center py-8 lg:items-center">
          <InteractiveMagicBadge
            title="개발 과정"
            icon={<FileText className="h-4 w-4 text-primary" />}
          />
          <h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
            3단계로 완성하는 SaaS
          </h2>
          <p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
            복잡한 설정 없이 3단계만 거치면 바로 서비스를 런칭할 수 있습니다.
            MVP부터 정식 서비스까지 빠르게 구현하세요.
          </p>
        </div>
      </AnimationContainer>
      <div className="grid w-full grid-cols-1 gap-4 py-8 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {PROCESS.map((process, id) => (
          <AnimationContainer delay={0.2 * id} key={id}>
            <MagicHoverCard className="group p-8 md:py-8">
              <div className="flex w-full flex-col items-start justify-center">
                <process.icon
                  strokeWidth={1.5}
                  className="h-10 w-10 text-foreground"
                />
                <div className="relative flex flex-col items-start">
                  <span className="-top-6 absolute right-0 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border pt-0.5 font-medium text-2xl text-foreground">
                    {id + 1}
                  </span>
                  <h3 className="mt-6 font-medium text-base text-foreground">
                    {process.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground text-sm">
                    {process.description}
                  </p>
                </div>
              </div>
            </MagicHoverCard>
          </AnimationContainer>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default ProcessSection;
