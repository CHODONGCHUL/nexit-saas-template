import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQContent() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">자주 묻는 질문 (FAQ)</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>NEXIT SaaS Template은 무엇인가요?</AccordionTrigger>
          <AccordionContent>
            NEXIT SaaS Template은 한국 개발자를 위한 All-in-One SaaS
            템플릿입니다. Supabase + Next.js + Creem.io를 기반으로 하여,
            한국에서도 바로 서비스 운영이 가능하도록 설계되었습니다. 다국어
            지원, 카카오 로그인, 국내 결제 시스템 등 한국 서비스에 필수적인
            기능들이 모두 포함되어 있습니다.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>어떤 기술 스택을 사용하나요?</AccordionTrigger>
          <AccordionContent>
            - Supabase: 데이터베이스, 인증, 스토리지 - Next.js + TypeScript:
            프론트엔드 프레임워크 - Creem.io: 구독 결제 시스템 - Tailwind CSS:
            UI 스타일링 - i18n: 다국어 지원
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            해외 SaaS 템플릿과 어떤 점이 다른가요?
          </AccordionTrigger>
          <AccordionContent>
            기존 해외 SaaS 템플릿들과 달리, 한국 서비스에 필수적인 기능들이 모두
            구현되어 있습니다: - 한국어/영어 다국어 지원 - 카카오 로그인 연동 -
            Creem.io를 통한 국내 결제 시스템 - 한국 서비스에 맞는 UI/UX
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>누구를 위한 템플릿인가요?</AccordionTrigger>
          <AccordionContent>
            다음과 같은 분들에게 적합합니다: - 혼자서 빠르게 SaaS MVP를 만들고
            싶은 개발자 - 해외 템플릿을 사용하다가 한국 서비스 연동에 어려움을
            겪은 경험이 있는 분 - 프리랜서/사이드 프로젝트로 SaaS를 만들어
            수익화하려는 분
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>
            기술 지원이나 업데이트는 어떻게 이루어지나요?
          </AccordionTrigger>
          <AccordionContent>
            GitHub 저장소를 통해 지속적인 업데이트와 버그 수정이 이루어지며,
            이슈 트래커를 통해 기술 지원을 제공합니다. 또한 주요 업데이트나 보안
            패치는 정기적으로 릴리즈됩니다.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>설치와 설정은 어떻게 하나요?</AccordionTrigger>
          <AccordionContent>
            1. GitHub에서 템플릿을 클론하거나 다운로드합니다. 2. 필요한
            환경변수를 .env 파일에 설정합니다. 3. npm install 또는 pnpm
            install로 의존성을 설치합니다. 4. Supabase 프로젝트를 생성하고
            데이터베이스를 설정합니다. 5. npm run dev로 개발 서버를 시작합니다.
            자세한 설치 가이드는 README 파일을 참고해주세요.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>상업적 이용이 가능한가요?</AccordionTrigger>
          <AccordionContent>
            네, NEXIT SaaS Template은 상업적 이용이 가능합니다. 개인
            프로젝트부터 기업용 서비스까지 자유롭게 사용하실 수 있습니다. 다만,
            템플릿 자체를 재판매하는 것은 제한될 수 있으니 라이센스를
            확인해주세요.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
          <AccordionTrigger>
            커스터마이징은 어느 정도까지 가능한가요?
          </AccordionTrigger>
          <AccordionContent>
            템플릿은 완전히 오픈소스이므로 모든 부분을 자유롭게 커스터마이징할
            수 있습니다: - UI/UX 디자인 변경 - 기능 추가 및 제거 - 데이터베이스
            스키마 수정 - 결제 시스템 변경 - 인증 방식 추가 모든 코드가 공개되어
            있어 필요에 따라 자유롭게 수정하실 수 있습니다.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
