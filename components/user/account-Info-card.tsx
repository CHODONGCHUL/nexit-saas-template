"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocale } from "next-intl";

interface AccountInfoCardProps {
  user: any;
}

export default function AccountInfoCard({ user }: AccountInfoCardProps) {
  const locale = useLocale();
  if (!user) return null;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>계정 정보</CardTitle>
        <CardDescription>계정 생성일 및 기타 정보</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground font-medium">
              계정 생성일:
            </span>
            <span className="font-mono">
              {user.created_at
                ? new Date(user.created_at).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-muted-foreground font-medium">
              로그인 방식:
            </span>
            <span className="font-medium">
              {user.app_metadata?.provider === "email"
                ? "이메일"
                : user.app_metadata?.provider === "kakao"
                ? "카카오"
                : user.app_metadata?.provider === "google"
                ? "구글"
                : user.app_metadata?.provider === "github"
                ? "깃허브"
                : user.app_metadata?.provider}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
