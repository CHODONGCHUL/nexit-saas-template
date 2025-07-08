import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, Globe, Database } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">설정</h1>
        <p className="text-muted-foreground">
          계정 및 애플리케이션 설정을 관리합니다.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* 프로필 설정 카드 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">프로필</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              개인 정보 및 계정 설정을 관리합니다.
            </CardDescription>
            <Link href="/dashboard/settings/profile">
              <Button className="w-full">프로필 관리</Button>
            </Link>
          </CardContent>
        </Card>

        {/* 언어 설정 카드 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">언어</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              언어 및 지역 설정을 관리합니다.
            </CardDescription>
            <Button variant="outline" className="w-full" disabled>
              준비 중
            </Button>
          </CardContent>
        </Card>

        {/* 데이터 설정 카드 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">데이터</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              데이터 내보내기 및 계정 삭제를 관리합니다.
            </CardDescription>
            <Button variant="outline" className="w-full" disabled>
              준비 중
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 빠른 설정 */}
      <Card>
        <CardHeader>
          <CardTitle>빠른 설정</CardTitle>
          <CardDescription>
            자주 사용하는 설정에 빠르게 접근할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/dashboard/settings/profile">
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                프로필 편집
              </Button>
            </Link>
            <Button variant="outline" className="w-full justify-start" disabled>
              <Globe className="mr-2 h-4 w-4" />
              언어 설정
            </Button>
            <Button variant="outline" className="w-full justify-start" disabled>
              <Database className="mr-2 h-4 w-4" />
              데이터 관리
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
