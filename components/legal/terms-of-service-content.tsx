import React from "react";

export default function TermsOfServiceContent() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* 템플릿 안내 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          ⚠️ 템플릿 안내
        </h3>
        <p className="text-yellow-700">
          이 서비스 이용약관은 예시 템플릿입니다. 실제 서비스 운영 시에는 반드시
          법무 전문가의 검토를 받아 귀하의 서비스에 맞게 수정하여 사용하시기
          바랍니다. 회사명, 연락처, 서비스 내용, 환불 정책 등을 실제 정보로
          변경해야 합니다.
        </p>
      </div>

      <h1 className="text-3xl font-bold mb-4">서비스 이용약관</h1>
      <p className="mb-8">최종 수정일: [날짜를 입력하세요]</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">1. 목적</h2>
        <p className="mb-3">
          이 약관은 [회사명](이하 '회사')이 제공하는 서비스(이하 '서비스')의
          이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한
          사항을 규정함을 목적으로 합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">2. 정의</h2>
        <p className="mb-3">
          이 약관에서 사용하는 용어의 정의는 다음과 같습니다:
        </p>
        <ul className="list-disc pl-6 mb-3">
          <li>
            '서비스'라 함은 구현되는 단말기(PC, 휴대형 단말기 등의 장치를
            포함)와 상관없이 이용자가 이용할 수 있는 [서비스명] 서비스를
            의미합니다.
          </li>
          <li>
            '이용자'라 함은 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및
            비회원을 말합니다.
          </li>
          <li>
            '회원'이라 함은 회사와 서비스 이용계약을 체결하고 이용자
            아이디(ID)를 부여받은 자를 말합니다.
          </li>
          <li>
            '비회원'이라 함은 회원에 가입하지 않고 회사가 제공하는 서비스를
            이용하는 자를 말합니다.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">3. 약관의 게시와 개정</h2>
        <p className="mb-3">
          회사는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에
          게시합니다. 회사는 '약관의 규제에 관한 법률', '정보통신망 이용촉진 및
          정보보호 등에 관한 법률' 등 관련 법을 위배하지 않는 범위에서 이 약관을
          개정할 수 있습니다. 개정된 약관은 적용일자 및 개정사유를 명시하여 현행
          약관과 함께 서비스 초기 화면에 그 적용일자 7일 이전부터 적용일자
          전일까지 공지합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          4. 서비스의 제공 및 변경
        </h2>
        <p className="mb-3">회사는 다음과 같은 서비스를 제공합니다:</p>
        <ul className="list-disc pl-6 mb-3">
          <li>[주요 서비스 내용을 입력하세요]</li>
          <li>[부가 서비스 내용을 입력하세요]</li>
          <li>기타 회사가 정하는 서비스</li>
        </ul>
        <p className="mb-3">
          회사는 서비스의 내용, 운영상, 기술상 필요에 따라 제공하는 서비스를
          변경할 수 있습니다. 이 경우에는 변경된 서비스의 내용 및 제공일자를
          명시하여 공지합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">5. 서비스의 중단</h2>
        <p className="mb-3">
          회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절
          등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수
          있습니다. 이 경우 회사는 사전 또는 사후에 이를 공지합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">6. 회원가입</h2>
        <p className="mb-3">
          이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에
          동의한다는 의사표시를 함으로써 회원가입을 신청합니다. 회사는 이러한
          신청에 대하여 승낙함으로써 회원가입이 성립됩니다. 단, 회사는 다음 각
          호에 해당하는 신청에 대하여는 승낙을 하지 않을 수 있습니다:
        </p>
        <ul className="list-disc pl-6 mb-3">
          <li>
            가입신청자가 이 약관에 의하여 이전에 회원자격을 상실한 적이 있는
            경우
          </li>
          <li>실명이 아니거나 타인의 명의를 이용한 경우</li>
          <li>
            허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우
          </li>
          <li>
            기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고
            판단되는 경우
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          7. 회원 탈퇴 및 자격 상실
        </h2>
        <p className="mb-3">
          회원은 언제든지 서비스 내 회원 탈퇴 기능을 통해 회원 탈퇴를 요청할 수
          있으며, 회사는 즉시 회원 탈퇴를 처리합니다. 회원이 다음 각 호의 사유에
          해당하는 경우, 회사는 회원자격을 제한 및 정지시킬 수 있습니다:
        </p>
        <ul className="list-disc pl-6 mb-3">
          <li>가입 신청 시에 허위 내용을 등록한 경우</li>
          <li>
            서비스를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는
            행위를 하는 경우
          </li>
        </ul>
        <p className="mb-3">
          회사가 회원 자격을 제한·정지시킨 후 동일한 행위가 2회 이상 반복되거나
          30일 이내에 그 사유가 시정되지 아니하는 경우, 회사는 회원자격을
          상실시킬 수 있습니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">8. 회원에 대한 통지</h2>
        <p className="mb-3">
          회사가 회원에 대한 통지를 하는 경우, 회원이 제공한 이메일 주소로 할 수
          있습니다. 회사는 불특정다수 회원에 대한 통지의 경우 1주일 이상 서비스
          내 공지사항에 게시함으로써 개별 통지에 갈음할 수 있습니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">9. 개인정보 보호</h2>
        <p className="mb-3">
          회사는 '개인정보 보호법' 등 관련 법령이 정하는 바에 따라 회원의
          개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 사용에
          대해서는 관련 법령 및 회사의 개인정보 처리방침이 적용됩니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">10. 회사의 의무</h2>
        <p className="mb-3">
          회사는 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지
          않으며, 지속적이고 안정적으로 서비스를 제공하기 위해 최선을 다합니다.
          회사는 이용자가 안전하게 서비스를 이용할 수 있도록 개인정보 보호를
          위해 보안 시스템을 갖추어야 하며, 개인정보 처리방침을 공시하고
          준수합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">11. 이용자의 의무</h2>
        <p className="mb-3">이용자는 다음 행위를 하여서는 안 됩니다:</p>
        <ul className="list-disc pl-6 mb-3">
          <li>신청 또는 변경 시 허위 내용의 등록</li>
          <li>타인의 정보 도용</li>
          <li>회사가 게시한 정보의 변경</li>
          <li>회사가 정한 정보 이외의 정보 송신 또는 게시</li>
          <li>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
          <li>회사와 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
          <li>
            외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보
            유포
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">12. 저작권의 귀속</h2>
        <p className="mb-3">
          서비스에서 제공하는 저작물에 대한 저작권 및 기타 지적재산권은 회사에
          귀속됩니다. 이용자는 서비스를 이용함으로써 얻은 정보를 회사의 사전
          승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로
          이용하거나 제3자에게 이용하게 하여서는 안됩니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">13. 분쟁해결</h2>
        <p className="mb-3">
          회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를
          보상처리하기 위하여 고객센터를 설치하여 운영합니다. 서비스 이용과
          관련하여 이용자와 회사 사이에 분쟁이 발생한 경우, 이용자는 회사의
          고객센터에 분쟁의 해결을 요구할 수 있습니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">14. 재판권 및 준거법</h2>
        <p className="mb-3">
          서비스 이용과 관련하여 회사와 이용자 간의 소송은 대한민국 법을
          준거법으로 하며, 회사의 주소지를 관할하는 법원을 관할 법원으로 합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">15. 환불 정책</h2>
        <p className="mb-3">
          <strong>
            ※ 이 환불 정책은 예시이며, 실제 서비스에 따라 수정이 필요합니다.
          </strong>
        </p>
        <p className="mb-3">
          회사는 다음과 같은 환불 정책을 적용할 수 있습니다:
        </p>
        <ul className="list-disc pl-6 mb-3">
          <li>
            [환불 조건을 구체적으로 명시하세요. 예: 결제일로부터 X일 이내, 특정
            조건 하에서]
          </li>
          <li>[환불 제한 사항을 명시하세요]</li>
          <li>환불 신청은 [연락 방법]을 통해 가능합니다.</li>
        </ul>
        <p className="mb-3">
          환불 처리는 결제 수단에 따라 소요 시간이 다를 수 있으며, 관련 법령에
          따라 처리됩니다.
        </p>
      </section>
    </div>
  );
}
