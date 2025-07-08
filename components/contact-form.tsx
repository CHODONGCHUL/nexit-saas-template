"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextareaAutoHeight } from "@/components/ui/textarea-autoheight";
import {
  Mail,
  MessageSquare,
  Phone,
  ExternalLink,
  FileQuestion,
} from "lucide-react";
import Link from "next/link";
import { ChannelTalkButton } from "./channel-talk-button";

interface ContactFormProps {
  showFAQLink?: boolean;
  faqLinkPath?: string;
}

export default function ContactForm({
  showFAQLink = true,
  faqLinkPath = "/faq",
}: ContactFormProps) {
  const handleChannelTalkClick = () => {
    // 채널톡 열기
    if (typeof window !== "undefined" && (window as any).ChannelIO) {
      (window as any).ChannelIO("showMessenger");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">문의하기</h1>
        <p className="text-muted-foreground">
          도움이 필요하시면 언제든지 문의해주세요. 최대한 빠른 시간 내에
          답변드리겠습니다.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* 연락 방법 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">연락 방법</h2>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Mail className="h-5 w-5 mr-2" />
              <CardTitle className="text-base">이메일 지원</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                가장 빠른 응답을 받을 수 있는 방법입니다.
              </p>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>이메일:</strong> contact@company.com
                </p>
                <p className="text-sm">
                  <strong>응답 시간:</strong> 24시간 이내
                </p>
              </div>
              <Button className="w-full mt-3" asChild>
                <a href="mailto:contact@company.com">
                  <Mail className="h-4 w-4 mr-2" />
                  이메일 보내기
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <MessageSquare className="h-5 w-5 mr-2" />
              <CardTitle className="text-base">실시간 채팅</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                즉시 도움이 필요한 경우 실시간 채팅을 이용하세요.
              </p>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>운영 시간:</strong> 평일 9:00 - 18:00 (KST)
                </p>
                <p className="text-sm">
                  <strong>응답 시간:</strong> 즉시
                </p>
              </div>
              <Button className="w-full mt-3" onClick={handleChannelTalkClick}>
                <MessageSquare className="h-4 w-4 mr-2" />
                채팅 시작
              </Button>
            </CardContent>
          </Card>

          {showFAQLink && (
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <FileQuestion className="h-5 w-5 mr-2" />
                <CardTitle className="text-base">자주 묻는 질문</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  일반적인 질문들에 대한 답변을 확인해보세요.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={faqLinkPath}>
                    <FileQuestion className="h-4 w-4 mr-2" />
                    FAQ 보기
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 문의 양식 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">문의하기</h2>

          <Card>
            <CardHeader>
              <CardTitle>지원 요청</CardTitle>
              <CardDescription>
                문제를 자세히 설명해주시면 더 정확한 도움을 드릴 수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your-email@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">제목</Label>
                <Input id="subject" placeholder="문의 제목을 입력해주세요" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">내용</Label>
                <TextareaAutoHeight
                  id="message"
                  placeholder="문제 상황을 자세히 설명해주세요..."
                  className="min-h-[120px]"
                />
              </div>

              <Button className="w-full" disabled>
                <Mail className="h-4 w-4 mr-2" />
                문의 보내기 (준비 중)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 추가 리소스 */}
      {showFAQLink && (
        <Card>
          <CardHeader>
            <CardTitle>추가 리소스</CardTitle>
            <CardDescription>
              더 많은 도움말과 정보를 확인하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              <Button variant="outline" className="justify-start" asChild>
                <Link href={faqLinkPath}>
                  <FileQuestion className="mr-2 h-4 w-4" />
                  자주 묻는 질문
                </Link>
              </Button>
              <Button variant="outline" className="justify-start" disabled>
                <ExternalLink className="mr-2 h-4 w-4" />
                사용자 가이드 (준비 중)
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
