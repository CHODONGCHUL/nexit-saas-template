import React from "react";

export default function PrivacyPolicyContent() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* 템플릿 안내 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          ⚠️ 템플릿 안내
        </h3>
        <p className="text-yellow-700">
          이 개인정보 처리방침은 예시 템플릿입니다. 실제 서비스 운영 시에는
          반드시 법무 전문가의 검토를 받아 귀하의 서비스에 맞게 수정하여
          사용하시기 바랍니다. 회사명, 연락처, 서비스 내용 등을 실제 정보로
          변경해야 합니다.
        </p>
      </div>

      <h1 className="text-3xl font-bold mb-4">개인정보 처리방침</h1>
      <p className="mb-8">최종 수정일: [날짜를 입력하세요]</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">1. 개인정보의 처리 목적</h2>
        <p className="mb-3">
          [회사명](이하 '회사')은 다음의 목적을 위하여 개인정보를 처리합니다.
          처리한 개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며, 이용
          목적이 변경되는 경우에는 사전 동의를 받을 예정입니다.
        </p>
        <ul className="list-disc pl-6 mb-3">
          <li>서비스 제공: [서비스명] 서비스 제공 및 유지·관리</li>
          <li>
            회원 관리: 회원제 서비스 이용에 따른 본인 확인, 개인 식별, 부정 이용
            방지 등
          </li>
          <li>고객 상담: 문의사항 또는 불만 처리, 공지사항 전달 등</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          2. 처리하는 개인정보의 항목
        </h2>
        <p className="mb-3">회사는 다음의 개인정보 항목을 처리하고 있습니다:</p>
        <ul className="list-disc pl-6 mb-3">
          <li>필수항목: 이름, 이메일 주소, 비밀번호</li>
          <li>선택항목: 전화번호, 생년월일</li>
          <li>자동 수집 항목: IP 주소, 쿠키, 서비스 이용 기록, 접속 로그 등</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          3. 개인정보의 처리 및 보유 기간
        </h2>
        <p className="mb-3">
          회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
          개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를
          처리·보유합니다. 구체적인 개인정보 처리 및 보유 기간은 다음과
          같습니다:
        </p>
        <ul className="list-disc pl-6 mb-3">
          <li>회원 가입 및 관리: 서비스 이용 계약 또는 회원가입 해지 시까지</li>
          <li>
            관련 법령에 따른 보유 기간: 전자상거래 등에서의 소비자 보호에 관한
            법률 등 관련 법령에 따라 일정 기간 보유
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          4. 개인정보의 제3자 제공
        </h2>
        <p className="mb-3">
          회사는 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법에
          해당하는 경우에만 개인정보를 제3자에게 제공합니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          5. 정보주체의 권리·의무 및 그 행사 방법
        </h2>
        <p className="mb-3">
          정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를
          행사할 수 있습니다:
        </p>
        <ul className="list-disc pl-6 mb-3">
          <li>개인정보 열람 요구</li>
          <li>오류 등이 있을 경우 정정 요구</li>
          <li>삭제 요구</li>
          <li>처리 정지 요구</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">6. 개인정보의 파기</h2>
        <p className="mb-3">
          회사는 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가
          불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다. 파기의
          절차, 기한 및 방법은 다음과 같습니다:
        </p>
        <ul className="list-disc pl-6 mb-3">
          <li>
            파기 절차: 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보
            보호책임자의 승인을 받아 개인정보를 파기합니다.
          </li>
          <li>
            파기 방법: 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적
            방법을 사용합니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나
            소각을 통하여 파기합니다.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          7. 개인정보의 안전성 확보 조치
        </h2>
        <p className="mb-3">
          회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
          있습니다:
        </p>
        <ul className="list-disc pl-6 mb-3">
          <li>관리적 조치: 내부관리계획 수립 및 시행, 정기적 직원 교육 등</li>
          <li>
            기술적 조치: 개인정보처리시스템 등의 접근 권한 관리, 접근 통제
            시스템 설치, 고유 식별정보 등의 암호화
          </li>
          <li>물리적 조치: 전산실, 자료 보관실 등의 접근 통제</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          8. 개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항
        </h2>
        <p className="mb-3">
          회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 쿠키(cookie)를
          사용할 수 있습니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버가
          이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC
          컴퓨터 내의 하드디스크에 저장되기도 합니다.
        </p>
        <p className="mb-3">
          이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는
          웹 브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가
          저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도
          있습니다. 다만, 쿠키의 저장을 거부할 경우 맞춤형 서비스 이용에
          어려움이 발생할 수 있습니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">9. 개인정보 보호책임자</h2>
        <p className="mb-3">
          회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와
          관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이
          개인정보 보호책임자를 지정하고 있습니다.
        </p>
        <div className="pl-6 mb-3">
          <p>▶ 개인정보 보호책임자</p>
          <p>성명: [담당자명]</p>
          <p>직책: [직책명]</p>
          <p>연락처: [이메일 주소]</p>
        </div>
        <p className="mb-3">
          정보주체는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련
          문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자에게
          문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체 없이 답변 및
          처리해드릴 것입니다.
        </p>
      </section>
    </div>
  );
}
