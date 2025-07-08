"use client";

import { useCurrentUser } from "@/hooks/user-hook";
import ProfileEditForm from "@/components/user/profile-edit-form";
import MarketingConsentSwitch from "@/components/user/marketing-consent-switch";
import AccountInfoCard from "@/components/user/account-Info-card";

export default function ProfilePage() {
  const { data: user } = useCurrentUser();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 페이지 헤더 */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">프로필 설정</h1>
        <p className="text-muted-foreground">
          계정 정보를 확인하고 수정할 수 있습니다.
        </p>
      </div>

      <div className="w-full max-w-2xl mx-auto space-y-6">
        {/* 프로필 편집 폼 */}
        <ProfileEditForm />

        {/* 마케팅 동의 스위치 */}
        {user && <MarketingConsentSwitch userId={user.id} />}

        {/* 계정 정보 카드 */}
        <AccountInfoCard user={user} />
      </div>
    </div>
  );
}
