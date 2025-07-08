import Image from "next/image";
import AnimationContainer from "@/components/animation-container";
import MaxWidthWrapper from "@/components/max-width-wrapper";

const TECH_STACK = [
  {
    name: "Supabase",
    logo: "https://supabase.com/brand-assets/supabase-logo-icon.png",
  },
  {
    name: "Next.js",
    logo: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png",
  },
  {
    name: "TypeScript",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
  },
  {
    name: "Tailwind CSS",
    logo: "https://tailwindcss.com/_next/static/media/tailwindcss-mark.3c5441fc7a190fb1800d4a5c7f07ba4b1345a9c8.svg",
  },
  {
    name: "Creem.io",
    logo: "https://creem.io/favicon.ico",
  },
  {
    name: "Vercel",
    logo: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png",
  },
] as const;

const CompaniesSection = () => {
  return (
    <MaxWidthWrapper>
      <AnimationContainer delay={0.4}>
        <div className="py-14">
          <div className="mx-auto px-4 md:px-8">
            <h2 className="text-center font-heading font-medium text-neutral-400 text-sm uppercase">
              검증된 기술 스택으로 구축된 템플릿
            </h2>
            <div className="mt-8">
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-6 md:gap-x-16">
                {TECH_STACK.map((tech) => (
                  <li
                    key={tech.name}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="w-16 h-16 relative">
                      {/* <Image
                        src={tech.logo}
                        alt={tech.name}
                        fill
                        className="object-contain"
                      /> */}
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">
                      {tech.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-center text-muted-foreground text-sm mt-6 max-w-2xl mx-auto">
              업계 표준 기술들과 한국 특화 서비스들을 조합하여 안정적이고 확장
              가능한 SaaS를 빠르게 구축할 수 있습니다.
            </p>
          </div>
        </div>
      </AnimationContainer>
    </MaxWidthWrapper>
  );
};

export default CompaniesSection;
