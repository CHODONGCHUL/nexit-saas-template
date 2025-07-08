# 🚀 NEXIT SaaS Template

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/React-19-61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38bdf8" alt="TailwindCSS v4" />
  <img src="https://img.shields.io/badge/Supabase-Latest-green" alt="Supabase" />
</div>

<div align="center">
  <h3>한국 개발자를 위한 All-in-One SaaS 템플릿</h3>
  <p>카카오 로그인, 국내 결제, 다국어 지원까지 모든 기능이 준비된 완전한 SaaS 스타터 키트</p>
</div>

<div align="center">
  <a href="#주요-기능"><strong>주요 기능</strong></a> ·
  <a href="#빠른-시작"><strong>빠른 시작</strong></a> ·
  <a href="#설치-가이드"><strong>설치 가이드</strong></a> ·
  <a href="#배포하기"><strong>배포하기</strong></a> ·
  <a href="#기술-스택"><strong>기술 스택</strong></a>
</div>

---

## ✨ 주요 기능

### 🎯 한국 시장 특화 기능

- **카카오 로그인** - 한국 사용자에게 친숙한 소셜 로그인
- **Creem.io 결제 연동** - 국내 카드 결제 및 해외 결제 지원
- **다국어 지원** - 한국어/영어 완전 지원 (i18n)
- **채널톡 연동** - 고객 지원 채팅 시스템

### 🛠️ 완전한 SaaS 기능

- **사용자 인증 시스템** - 회원가입, 로그인, 비밀번호 재설정
- **멤버십 관리** - Starter, Pro, Enterprise 요금제
- **관리자 대시보드** - 사용자 관리, 콘텐츠 관리
- **블로그 시스템** - TipTap 에디터, 이미지 업로드, SEO 최적화
- **결제 시스템** - 구독 관리, 결제 내역, 환불 처리

### 🎨 현대적인 UI/UX

- **shadcn/ui** - 아름답고 접근성 높은 컴포넌트
- **TailwindCSS** - 유틸리티 우선 CSS 프레임워크
- **반응형 디자인** - 모바일/태블릿/데스크톱 최적화
- **다크 모드** - 테마 전환 지원

---

## 🚀 빠른 시작

### 1. 프로젝트 클론

```bash
git clone https://github.com/your-username/nexit-saas-template.git
cd nexit-saas-template
```

### 2. 의존성 설치

```bash
pnpm install
# 또는
npm install
# 또는
yarn install
```

### 3. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Creem.io 결제 설정
NEXT_PUBLIC_CREEM_API_KEY=your_creem_api_key

# 채널톡 설정
NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY=your_channel_talk_plugin_key

# 기타 설정
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

### 4. Supabase 데이터베이스 설정

Supabase 프로젝트를 생성한 후, SQL 에디터에서 다음 파일들을 순서대로 실행하세요:

```sql
-- 1단계: 회원 관리 시스템 설정
-- lib/supabase/initializer/1.회원관리.sql 파일 내용 실행

-- 2단계: 블로그 시스템 설정
-- lib/supabase/initializer/2.블로그관리.sql 파일 내용 실행
```

### 5. 개발 서버 실행

```bash
pnpm dev
```

이제 [http://localhost:3000](http://localhost:3000)에서 프로젝트를 확인할 수 있습니다! 🎉

---

## 📋 설치 가이드

### 필수 요구사항

- Node.js 18.x 이상
- pnpm, npm, 또는 yarn
- Supabase 계정
- Creem.io 계정 (결제 기능 사용 시)

### 상세 설정 가이드

#### 1. Supabase 프로젝트 생성

1. [Supabase Dashboard](https://supabase.com/dashboard)에서 새 프로젝트 생성
2. 프로젝트 설정 > API에서 URL과 anon key 확인
3. SQL 에디터에서 초기화 스크립트 실행

#### 2. 카카오 로그인 설정

1. [Kakao Developers](https://developers.kakao.com/)에서 앱 생성
2. 플랫폼 설정에서 Web 플랫폼 등록
3. Redirect URI 설정: `https://your-domain.com/auth/callback`

#### 3. Creem.io 결제 설정

1. [Creem.io](https://creem.io)에서 계정 생성
2. API 키 발급 및 환경 변수 설정
3. 웹훅 URL 설정: `https://your-domain.com/api/webhooks/creem`

#### 4. 채널톡 설정

1. [Channel Talk](https://channel.io)에서 플러그인 생성
2. 플러그인 키를 환경 변수에 추가

---

## 🛠️ 기술 스택

### Frontend

- **Next.js 15** - React 프레임워크 (App Router)
- **React 19** - 최신 React 버전
- **TypeScript** - 타입 안전성
- **TailwindCSS v4** - 유틸리티 우선 CSS
- **shadcn/ui** - 컴포넌트 라이브러리

### Backend

- **Supabase** - 데이터베이스, 인증, 스토리지
- **Supabase Auth** - 사용자 인증
- **Row Level Security** - 데이터 보안

### 결제 및 외부 서비스

- **Creem.io** - 구독 결제 시스템
- **Channel Talk** - 고객 지원 채팅
- **Kakao Login** - 소셜 로그인

### 개발 도구

- **ESLint** - 코드 품질 관리
- **Tanstack Query** - 서버 상태 관리
- **React Hook Form** - 폼 관리
- **Zod** - 스키마 검증

---

## 🌐 배포하기

### Vercel 배포 (권장)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fnexit-saas-template)

1. 위 버튼 클릭하여 Vercel에 배포
2. 환경 변수 설정
3. 자동 배포 완료

### 기타 플랫폼

- **Netlify**: 정적 호스팅
- **Railway**: 풀스택 배포
- **Docker**: 컨테이너 배포

---

## 🔧 커스터마이징

### 브랜딩 변경

1. `components/nexit-logo.tsx` - 로고 변경
2. `app/globals.css` - 컬러 테마 변경
3. `messages/` - 텍스트 내용 변경

### 기능 추가

1. 새 페이지 추가: `app/[locale]/(pages)/new-page/page.tsx`
2. 새 컴포넌트 추가: `components/new-component.tsx`
3. 새 API 라우트 추가: `app/api/new-route/route.ts`

### 결제 플랜 수정

1. `components/landing-page/tabbed-pricing-section.tsx`
2. `components/user/membership-guard.tsx`
3. Creem.io 대시보드에서 상품 설정

---

## 🙋‍♂️ 지원

### 문서 및 가이드

- [설치 가이드](docs/installation.md)
- [배포 가이드](docs/deployment.md)
- [커스터마이징 가이드](docs/customization.md)

### 커뮤니티

- [GitHub Issues](https://github.com/your-username/nexit-saas-template/issues) - 버그 신고 및 기능 제안
- [Discord 커뮤니티](https://discord.gg/your-discord) - 실시간 지원 및 토론

### 상업적 지원

더 전문적인 지원이 필요하다면:

- 이메일: support@nexit.dev
- 웹사이트: https://nexit.dev

---

## 🎯 로드맵

### v1.1 (예정)

- [ ] 팀 기능 추가
- [ ] 고급 분석 대시보드
- [ ] 이메일 마케팅 통합

### v1.2 (예정)

- [ ] 모바일 앱 지원
- [ ] 고급 권한 관리
- [ ] API 문서화

### v2.0 (예정)

- [ ] 멀티 테넌시 지원
- [ ] 고급 결제 기능
- [ ] 화이트라벨 솔루션

## 📁 프로젝트 구조

```
nexit-saas-template/
├── app/                    # Next.js 15 App Router
│   ├── [locale]/          # 다국어 지원
│   │   ├── (pages)/       # 메인 페이지들
│   │   ├── (user)/        # 사용자 관련 페이지
│   │   ├── admin/         # 관리자 페이지
│   │   └── dashboard/     # 대시보드
│   └── api/               # API 라우트
├── components/            # 재사용 가능한 컴포넌트
│   ├── ui/               # shadcn/ui 컴포넌트
│   ├── landing-page/     # 랜딩 페이지 컴포넌트
│   ├── user/             # 사용자 관련 컴포넌트
│   └── blog/             # 블로그 관련 컴포넌트
├── lib/                  # 유틸리티 함수
│   └── supabase/         # Supabase 설정
│       └── initializer/  # 데이터베이스 초기화 SQL
├── messages/             # 다국어 메시지
├── services/             # 비즈니스 로직
└── types/                # TypeScript 타입 정의
```

---

<div align="center">
  <p>⭐ 이 프로젝트가 도움이 되었다면 별표를 눌러주세요!</p>
  <p>Made with ❤️ by Korean Developers</p>
</div>
