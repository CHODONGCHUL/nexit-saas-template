import { FileText, Zap, LogIn, Repeat2, MapPin } from "lucide-react";
import InteractiveMagicBadge from "@/components/ui/interactive-magic-badge";
import MagicHoverCard from "@/components/ui/magic-hover-card";
import AnimationContainer from "@/components/animation-container";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export const PROCESS = [
  {
    title: "앱 설치",
    description: (
      <>
        Google Play 스토어에서 AutoNavi 앱을 다운로드 및 <br />설치합니다.권장 설정에 따라 앱 접근
        권한을 허용해주세요.
      </>
    ),
    icon: Zap,
  },
  {
    title: "로그인",
    description: (
      <>
        사용할 핸드폰(메인폰, 서브폰)에서<br />
        구글 계정으로 로그인합니다.<br />
        로그인 후에는 자동으로 사용 기간이 확인됩니다.
      </>
    ),
    icon: LogIn,
  },
  {
    title: "출발지/도착지 자동 연동",
    description: (
      <>
        배달 앱의 출발지/도착지 정보를<br />
        자동으로 인식하고, 카카오맵에 연동하여 길찾기를 시작합니다.
      </>
    ),
    icon: Repeat2,
  },
  {
    title: "자동 안내 시작",
    description: (
      <>
        복잡한 터치 없이 바로 목적지까지 경로 안내가 시작됩니다.<br />
        운전에만 집중하세요.
      </>
    ),
    icon: MapPin,
  },
] as const;

const ProcessSection = () => {
  return (
    <MaxWidthWrapper className="py-40">
      <AnimationContainer delay={0.1}>
        <div className="mx-auto flex w-full max-w-xl flex-col items-center justify-center py-8 lg:items-center">
          <InteractiveMagicBadge
            title="사용 방법"
            icon={<FileText className="h-4 w-4 text-primary" />}
          />
          <h2 className="!leading-[1.1] mt-6 text-center font-heading font-medium text-3xl text-foreground md:text-5xl lg:text-center">
            4단계로 시작하는<br />배달 자동화
          </h2>
          <p className="mt-4 max-w-lg text-center text-lg text-muted-foreground lg:text-center">
            AutoNavi는 복잡한 설정 없이 4단계만 거치면 바로 배달 자동화를 경험할 수 있습니다.
          </p>
        </div>
      </AnimationContainer>
      <div className="grid w-full grid-cols-1 gap-4 py-8 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
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
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
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
