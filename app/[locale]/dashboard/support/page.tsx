import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, FileText, Shield, MessageCircle } from "lucide-react";

export default function SupportPage() {
  const supportItems = [
    {
      title: "FAQ",
      description: "자주 묻는 질문과 답변을 확인하세요",
      href: "/dashboard/support/faq",
      icon: HelpCircle,
    },
    {
      title: "이용약관",
      description: "서비스 이용약관을 확인하세요",
      href: "/dashboard/support/terms",
      icon: FileText,
    },
    {
      title: "개인정보처리방침",
      description: "개인정보 처리방침을 확인하세요",
      href: "/dashboard/support/privacy",
      icon: Shield,
    },
    {
      title: "문의하기",
      description: "궁금한 점이 있으시면 언제든 문의하세요",
      href: "/dashboard/support/contact",
      icon: MessageCircle,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">도움말</h1>
        <p className="text-muted-foreground mt-2">
          서비스 이용에 도움이 되는 정보를 확인하세요
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {supportItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.href} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href={item.href}>{item.title} 보기</Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
