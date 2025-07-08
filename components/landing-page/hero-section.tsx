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
          <button className="group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_(0_0%_20%)_inset] transition-colors duration-200">
            <span>
              <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
            </span>
            <span className="backdrop absolute inset-[1px] rounded-full bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-900" />
            <span className="absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-tr from-primary/20 blur-md"></span>
            <span className="z-10 flex items-center justify-center gap-1 py-0.5 text-neutral-100 text-sm">
              ✨ 한국 개발자를 위한 SaaS 템플릿
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </span>
          </button>
          <h1 className="!leading-[1.15] w-full text-balance py-6 text-center font-heading font-medium text-2xl text-foreground tracking-normal sm:text-4xl md:text-5xl lg:text-6xl">
            한국에서도 바로{" "}
            <span className="inline-bloc bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent font-bold">
              SaaS
            </span>
            를{" "}
            <SparklesText
              text="런칭"
              className="inline text-2xl sm:text-4xl md:text-5xl lg:text-6xl"
              colors={{ first: "#FFD700", second: "#FFA500" }}
              sparklesCount={4}
            />
            하세요.
          </h1>
          <p className="mb-12 text-balance text-lg text-muted-foreground tracking-tight md:text-xl">
            Supabase + Next.js + Creem.io 기반
            <br className="hidden md:block" />
            <span className="hidden md:block">
              카카오 로그인, 국내 결제까지 모든 기능이 준비된 All-in-One 템플릿
            </span>
          </p>
          <div className="z-50 flex items-center justify-center gap-4 whitespace-nowrap">
            <Link href="/dashboard" className="contents">
              <ShinyButton className="px-8 py-4">
                <div className="flex items-center text-lg font-medium">
                  대시보드로 이동
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </div>
              </ShinyButton>
            </Link>
          </div>
        </AnimationContainer>

        <AnimationContainer
          delay={0.2}
          className="relative w-full bg-transparent px-2 pt-20 pb-20 md:py-32"
        >
          <div className="gradient -translate-x-1/2 absolute inset-0 left-1/2 h-1/4 w-3/4 animate-image-glow blur-[5rem] md:top-[10%] md:h-1/3"></div>
          <div className="-m-2 lg:-m-4 rounded-xl bg-opacity-50 p-2 ring-1 ring-foreground/20 ring-inset backdrop-blur-3xl lg:rounded-2xl">
            <BorderBeam size={250} duration={12} delay={9} />
            <div className="relative w-full aspect-video rounded-md bg-foreground/10 ring-1 ring-border lg:rounded-xl overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/fcYGxroxiRg?autoplay=1&mute=1&loop=1&playlist=fcYGxroxiRg&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
                title="NEXIT SaaS Template Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full rounded-md lg:rounded-xl"
              />
            </div>
            <div className="-bottom-4 absolute inset-x-0 z-40 h-1/2 w-full bg-gradient-to-t from-background" />
            <div className="md:-bottom-8 absolute inset-x-0 bottom-0 z-50 h-1/4 w-full bg-gradient-to-t from-background" />
          </div>
        </AnimationContainer>
      </div>
    </MaxWidthWrapper>
  );
};

export default HeroSection;
