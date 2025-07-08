"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import MarketingConsentDialog from "./marketing-consent-dialog";

interface MarketingConsentSwitchProps {
  userId: string;
}

export default function MarketingConsentSwitch({
  userId,
}: MarketingConsentSwitchProps) {
  const [profileData, setProfileData] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function loadProfileData() {
      const { data: profile } = await supabase
        .from("profiles")
        .select("marketing_consent, marketing_consent_date")
        .eq("id", userId)
        .single();

      if (profile) {
        setProfileData(profile);
      }
    }
    loadProfileData();
  }, [userId]);

  const updateMarketingConsent = async (checked: boolean) => {
    const { error } = await supabase
      .from("profiles")
      .update({
        marketing_consent: checked,
        marketing_consent_date: checked ? new Date().toISOString() : null,
      })
      .eq("id", userId);

    if (error) {
      toast.error("마케팅 동의 상태 변경에 실패했습니다.");
      return;
    }

    setProfileData((prev: any) => ({
      ...prev,
      marketing_consent: checked,
      marketing_consent_date: checked ? new Date().toISOString() : null,
    }));

    toast.success(
      checked
        ? "마케팅 정보 수신에 동의하셨습니다."
        : "마케팅 정보 수신 동의를 철회하셨습니다."
    );
  };

  const handleMarketingConsent = async (checked: boolean) => {
    if (!checked) {
      setShowDialog(true);
    } else {
      await updateMarketingConsent(true);
    }
  };

  const handleDialogConsent = async (consent: boolean) => {
    if (!consent) {
      await updateMarketingConsent(false);
    } else {
      setProfileData((prev: any) => ({
        ...prev,
        marketing_consent: true,
      }));
    }
  };

  if (!profileData) return null;

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-4 border rounded-lg flex items-center space-x-4 justify-between">
        <div className="space-y-1">
          <Label htmlFor="marketing-consent">마케팅 정보 수신 동의</Label>
          <p className="text-sm text-muted-foreground">
            NEXIT의 특별한 할인 혜택과 새로운 기능 업데이트 소식을 받아보실 수
            있습니다.
          </p>
        </div>
        <Switch
          id="marketing-consent"
          checked={profileData?.marketing_consent || false}
          onCheckedChange={handleMarketingConsent}
        />
      </div>
      <MarketingConsentDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onConsent={handleDialogConsent}
      />
    </>
  );
}
