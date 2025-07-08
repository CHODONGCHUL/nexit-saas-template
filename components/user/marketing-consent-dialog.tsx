"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface MarketingConsentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConsent: (consent: boolean) => void;
}

export default function MarketingConsentDialog({
  open,
  onOpenChange,
  onConsent,
}: MarketingConsentDialogProps) {
  const handleConsent = (consent: boolean) => {
    onConsent(consent);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>마케팅 정보 수신 동의</DialogTitle>
          <DialogDescription className="pt-3">
            마케팅 정보 수신에 동의하시면 NEXIT의 특별한 할인 혜택과 새로운 기능
            업데이트 소식을 가장 먼저 받아보실 수 있습니다.
            <br />
            <br />
            동의하지 않으면 이러한 혜택 정보를 받지 못할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => handleConsent(false)}
          >
            혜택 정보 받지 않기
          </Button>
          <Button
            type="button"
            variant="default"
            className="flex-1"
            onClick={() => handleConsent(true)}
          >
            혜택 정보 받기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
