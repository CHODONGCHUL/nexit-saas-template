import { buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Command } from "@/components/ui/command";
import {
  ArrowRightIcon,
  CalendarIcon,
  Link2Icon,
  SearchIcon,
  WaypointsIcon,
} from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/lib/utils";
import { Integrations } from "./integrations";

export const CARDS = [
  {
    Icon: Link2Icon,
    name: "콘텐츠 자동화",
    description:
      "인공지능이 고품질 콘텐츠를 자동으로 생성해 블로그를 채워줍니다.",
    href: "/dashboard?component=blogPosts",
    cta: "더 알아보기",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Card className="absolute top-10 left-10 origin-top rounded-none rounded-tl-md border border-border border-r-0 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_0%,#000_100%)] group-hover:scale-105">
        <CardHeader>
          <CardTitle>블로그 자동화</CardTitle>
          <CardDescription>
            키워드만 입력하면 AI가 최적화된 글을 작성합니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="-mt-4">
          <Label>콘텐츠 작성 주제</Label>
          <Input
            type="text"
            placeholder="키워드를 입력하세요..."
            className="w-full focus-visible:ring-0 focus-visible:ring-transparent"
          />
        </CardContent>
      </Card>
    ),
  },
  {
    Icon: SearchIcon,
    name: "키워드 분석 도구",
    description:
      "트렌드 키워드 분석과 경쟁사 콘텐츠 연구로 최적의 SEO 콘텐츠를 생성하세요.",
    href: "/keyword",
    cta: "더 알아보기",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Command className="group-hover:-translate-x-10 absolute top-10 right-10 w-[70%] origin-to translate-x-0 border border-border p-2 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]">
        <Input placeholder="키워드 분석하기..." />
        <div className="mt-1 cursor-pointer">
          <div className="rounded-md px-4 py-2 hover:bg-muted">
            월간 검색량: 5,400회
          </div>
          <div className="rounded-md px-4 py-2 hover:bg-muted">
            경쟁강도: 중간
          </div>
          <div className="rounded-md px-4 py-2 hover:bg-muted">
            CPC: 2,300원
          </div>
          <div className="rounded-md px-4 py-2 hover:bg-muted">
            연관 키워드: 12개
          </div>
          <div className="rounded-md px-4 py-2 hover:bg-muted">
            트렌드 점수: 87점
          </div>
          <div className="rounded-md px-4 py-2 hover:bg-muted">
            수익성 지수: 높음
          </div>
        </div>
      </Command>
    ),
  },
  {
    Icon: WaypointsIcon,
    name: "통합 관리 시스템",
    description: "여러 블로그 플랫폼과 수익화 서비스를 한 곳에서 관리하세요.",
    href: "/dashboard",
    cta: "더 알아보기",
    className: "col-span-3 lg:col-span-2 max-w-full overflow-hidden",
    background: (
      <Integrations className="absolute top-4 right-2 h-[300px] w-[600px] border-none pl-28 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105 md:pl-0" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "자동 발행 일정",
    description:
      "최적의 시간에 자동으로 콘텐츠가 발행되도록 일정을 관리하세요.",
    className: "col-span-3 lg:col-span-1",
    href: "/dashboard?component=automation",
    cta: "더 알아보기",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute top-10 right-0 origin-top rounded-md border border-border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      />
    ),
  },
];

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl border border-border/60",
      "bg-white dark:bg-black [box-shadow:0_-20px_80px_-20px_#0000000f_inset] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className
    )}
  >
    <div>{background}</div>
    <div className="group-hover:-translate-y-10 pointer-events-none z-10 flex flex-col gap-1 p-6 transition-all duration-300">
      <Icon className="h-12 w-12 origin-left text-neutral-400 dark:text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="font-semibold text-neutral-800 dark:text-neutral-300 text-xl">
        {name}
      </h3>
      <p className="max-w-lg text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
    </div>

    <div
      className={cn(
        "absolute bottom-0 flex w-full translate-y-10 flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      )}
    >
      <Link
        href={href}
        className={buttonVariants({
          size: "sm",
          variant: "ghost",
          className: "cursor-pointer",
        })}
      >
        {cta}
        <ArrowRightIcon className="ml-2 h-4 w-4" />
      </Link>
    </div>
    <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-white/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid };
