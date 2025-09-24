import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { ShinyButton } from "@/components/ui/shiny-button";
import { SparklesText } from "@/components/ui/sparkles-text";
import { BorderBeam } from "@/components/ui/border-beam";
import AnimationContainer from "@/components/animation-container";
import MaxWidthWrapper from "@/components/max-width-wrapper";

interface HeroSectionProps {
  user?: any;
}

const HeroSection = ({ user }: HeroSectionProps) => {
  return (
    <MaxWidthWrapper>
      <div
        id="home"
        className="flex w-full flex-col items-center justify-center bg-gradient-to-t from-background text-center"
      >
        <AnimationContainer className="flex w-full flex-col items-center justify-center text-center">
          {/* ✅ hero-banner 텍스트 색상 모드별 대응 */}
          <button className="hero-banner group relative grid overflow-hidden rounded-full px-4 py-1 transition-colors duration-200">
            <span className="z-10 flex items-center justify-center gap-1 py-0.5 text-sm text-neutral-800 dark:text-neutral-100">
              ✨ 배달 자동화의 새로운 시작
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </span>
          </button>

          <h1 className="!leading-[1.15] w-full text-balance py-6 text-center font-heading font-medium text-2xl text-foreground tracking-normal sm:text-4xl md:text-5xl lg:text-6xl">
            배달을 더 빠르게, 더 안전하게 –{" "}
            <span className="inline-block bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent font-bold">
              AutoNavi
            </span>
            <SparklesText
              text=""
              className="inline text-2xl sm:text-4xl md:text-5xl lg:text-6xl"
              colors={{ first: "#FFD700", second: "#FFA500" }}
              sparklesCount={0}
            />
          </h1>

          <p className="mb-12 text-balance text-lg text-muted-foreground tracking-tight md:text-xl">
            카카오맵 완전 자동화로 배달 효율을 극대화하세요.
          </p>

          <div className="flex items-center justify-center gap-4 whitespace-nowrap">
            <Link
              href="https://play.google.com/store/apps/details?id=com.autonavi.app"
              className="contents"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ShinyButton className="download-btn px-8 py-4">
                <div className="flex items-center text-lg font-medium">
                  지금 다운로드
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </div>
              </ShinyButton>
            </Link>
          </div>
        </AnimationContainer>

        {/* ✅ MP4 동적 이미지 영역 */}
        <AnimationContainer
          delay={0.2}
          className="relative w-full bg-transparent px-2 pt-20 pb-20 md:py-32"
        >
          <div className="-m-2 lg:-m-4 rounded-xl bg-opacity-50 p-2 ring-1 ring-foreground/20 ring-inset backdrop-blur-3xl lg:rounded-2xl">
            <BorderBeam size={250} duration={12} delay={9} />
            <div className="relative w-full aspect-video rounded-md bg-foreground/10 ring-1 ring-border lg:rounded-xl overflow-hidden">
              <video
                src="/autonavi-demo.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover rounded-md lg:rounded-xl"
              />
            </div>
          </div>
        </AnimationContainer>
      </div>
    </MaxWidthWrapper>
  );
};

export default HeroSection;
