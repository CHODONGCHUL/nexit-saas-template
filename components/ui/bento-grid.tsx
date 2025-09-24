import { buttonVariants } from "@/components/ui/button";
import {
  MapPinIcon,
  RouteIcon,
  SmartphoneIcon,
  RefreshCwIcon,
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
import { cn } from "@/lib/utils";

export const CARDS = [
  {
    Icon: MapPinIcon,
    name: "배민 카카오맵 자동화",
    description: (
      <>
        배민 주문 수락 → 카카오맵 길찾기 자동 실행.<br />
        번거로운 클릭을 없애고 배달 효율을 극대화하세요.
      </>
    ),
    href: "/dashboard?feature=baemin",
    cta: "",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Card className="absolute top-10 left-10 origin-top border border-border rounded-md p-4 
        bg-gradient-to-br from-teal-50 to-white dark:from-teal-950 dark:to-black 
        transition-all duration-300 group-hover:scale-105">
        <CardHeader>
          <CardTitle className="text-neutral-800 dark:text-white">
            배민 자동화
          </CardTitle>
          <CardDescription className="text-neutral-600 dark:text-gray-300">
            카카오맵 길찾기까지 원클릭 자동화
          </CardDescription>
        </CardHeader>
      </Card>
    ),
  },
  {
    Icon: RouteIcon,
    name: "쿠팡 티맵 자동화",
    description: (
      <>
        쿠팡이츠 주문도 자동 인식 → 티맵 실행까지 빠르게 연결.<br />
        경로 클릭 없이 바로 안내 시작!
      </>
    ),
    href: "/dashboard?feature=coupang",
    cta: "",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute top-10 right-10 w-[70%] rounded-md border border-border overflow-hidden 
        transition-all duration-300 group-hover:scale-105">
        <img
          src="/tmap-demo.png"
          alt="티맵 자동화 데모"
          className="w-full h-48 object-contain"
        />
      </div>
    ),
  },
  {
    Icon: SmartphoneIcon,
    name: "모든 배달앱 연동",
    description: (
      <>
        카카오맵 · 카카오내비 · 티맵 완벽 지원.<br />
        배민/쿠팡/일반대행 등 모든 앱과 호환.
      </>
    ),
    href: "/dashboard?feature=integration",
    cta: "",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute top-4 right-2 h-[280px] w-[500px] rounded-lg overflow-hidden border border-border 
        transition-all duration-300 group-hover:scale-105">
        <img
          src="/app-integration.png"
          alt="배달앱 통합 연동"
          className="w-full h-full object-contain"
        />
      </div>
    ),
  },
  {
    Icon: RefreshCwIcon,
    name: "통합 관리 & 빠른 업데이트",
    description: (
      <>
        하나의 시스템에서 모든 기기를 통합 관리.<br />
        업계 최상 속도로 업데이트 & 24시간 빠른 응답 지원.
      </>
    ),
    href: "/dashboard?feature=management",
    cta: "",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Card className="absolute top-10 right-0 origin-top border border-border rounded-md p-4 
        bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950 dark:to-black 
        transition-all duration-300 group-hover:scale-105">
        <CardHeader>
          <CardTitle className="text-neutral-800 dark:text-white">
            통합 관리
          </CardTitle>
          <CardDescription className="text-neutral-600 dark:text-gray-300">
            빠른 성장 · 고객만족도 최상
          </CardDescription>
        </CardHeader>
      </Card>
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
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: ReactNode;
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
      <Icon className="h-12 w-12 origin-left text-primary transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="font-semibold text-neutral-800 dark:text-white text-xl">
        {name}
      </h3>
      <p className="max-w-lg text-neutral-600 dark:text-gray-300">
        {description}
      </p>
    </div>
    <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-white/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid };
