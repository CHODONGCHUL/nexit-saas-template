import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQContent() {
  return (
    <div className="mx-auto py-12 w-full max-w-4xl px-6 min-h-[70vh]">
      {/* w-full max-w-4xl → 해상도 비율에 맞추되 가로 폭 고정 */}
      {/* min-h-[70vh] → 최소 높이 확보해서 크기 변동 최소화 */}
      <h1 className="text-3xl font-bold mb-8 text-center">
        자주 묻는 질문 (FAQ)
      </h1>
      <Accordion type="single" collapsible className="w-full space-y-2">
        {/* 1 */}
        <AccordionItem value="item-1">
          <AccordionTrigger>연동은 어떻게 하나요?</AccordionTrigger>
          <AccordionContent>
            사용할 기기에 각각 AutoNavi 앱을 설치한 후, 동일한 구글 계정으로
            로그인하면 자동으로 연동됩니다. 메인폰과 서브폰이 연결되면 주소
            송수신이 가능합니다.
          </AccordionContent>
        </AccordionItem>

        {/* 2 */}
        <AccordionItem value="item-2">
          <AccordionTrigger>주로 어떻게 사용하나요?</AccordionTrigger>
          <AccordionContent>
            메인폰이나 태블릿에서 주소를 전송하면, 서브폰은 내비게이션 전용으로
            자동 실행됩니다. 이렇게 하면 메인폰은 배달 콜 수락에 집중할 수 있고,
            서브폰은 경로 안내만 전담하게 됩니다.
          </AccordionContent>
        </AccordionItem>

        {/* 3 */}
        <AccordionItem value="item-3">
          <AccordionTrigger>
            메인폰/서브폰을 여러 개로 나눠서 쓸 수 있나요?
          </AccordionTrigger>
          <AccordionContent>
            네. 예를 들어 <br />
            - 메인폰1에서 배민 주소를 서브폰3에 전송하여 내비 안내 시작<br />
            - 메인폰2에서 쿠팡 주소를 서브폰3에 전송하여 동일 기기로 안내<br />
            이처럼 서브폰을 내비 전용으로 두고, 여러 메인폰에서 콜 수락만
            담당하는 방식으로 운용할 수 있습니다.
          </AccordionContent>
        </AccordionItem>

        {/* 4 */}
        <AccordionItem value="item-4">
          <AccordionTrigger>로그인은 어떻게 하나요?</AccordionTrigger>
          <AccordionContent>
            별도의 회원가입 절차는 없습니다. <br />
            구글 계정으로만 로그인할 수 있습니다.
          </AccordionContent>
        </AccordionItem>

        {/* 5 */}
        <AccordionItem value="item-5">
          <AccordionTrigger>요금제는 어떻게 되나요?</AccordionTrigger>
          <AccordionContent>
            AutoNavi는 월 구독제로 제공되며, 구독료는 매달 5달러(USD)입니다. <br />
            월 1회성 사용은 6달러(USD)입니다.
          </AccordionContent>
        </AccordionItem>

        {/* 6 */}
        <AccordionItem value="item-6">
          <AccordionTrigger>환불이나 해지는 어떻게 하나요?</AccordionTrigger>
          <AccordionContent>
            구독 해지와 환불은 공식 홈페이지에서 가능합니다. 로그인 후 구독
            관리 메뉴에서 해지를 진행하시면 됩니다.
          </AccordionContent>
        </AccordionItem>

        {/* 7 */}
        <AccordionItem value="item-7">
          <AccordionTrigger>테스트는 어떻게 하나요?</AccordionTrigger>
          <AccordionContent>
            연동할 기기들이 목록에 뜨면 연결이 완료된 것입니다. <br />
            메인폰을 <b>송신 중</b>, 서브폰을 <b>수신 중</b>으로 설정한 뒤,
            메인폰에서 내비게이션 주소를 입력하고 안내 시작을 눌러보세요.
            서브폰이 자동으로 작동하면 정상적으로 연결된 것입니다.
          </AccordionContent>
        </AccordionItem>

        {/* 8 */}
        <AccordionItem value="item-8">
          <AccordionTrigger>업데이트와 지원은 어떻게 이루어지나요?</AccordionTrigger>
          <AccordionContent>
            AutoNavi는 지속적으로 기능 개선과 업데이트를 구글 플레이스토어로
            제공합니다. 문제가 발생하거나 추가 문의사항이 있으면 카카오톡 또는
            유선 연락을 통해 도움을 받으실 수 있습니다.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
