"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Phone, FileQuestion } from "lucide-react";
import Link from "next/link";

interface ContactFormProps {
  showFAQLink?: boolean;
}

export default function ContactForm({ showFAQLink = true }: ContactFormProps) {
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

          {/* 이메일 지원 */}
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Mail className="h-5 w-5 mr-2" />
              <CardTitle className="text-base">이메일 지원</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                정확하고 많은 양의 자료를 받을 수 있는 방법입니다.
              </p>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>이메일:</strong> heysandmole@gmail.com
                </p>
                <p className="text-sm">
                  <strong>응답 시간:</strong> 24시간 이내
                </p>
              </div>
              <Button className="w-full mt-3" asChild>
                <a href="mailto:heysandmole@gmail.com">
                  <Mail className="h-4 w-4 mr-2" />
                  이메일 보내기
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* 카카오톡 */}
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <MessageSquare className="h-5 w-5 mr-2" />
              <CardTitle className="text-base">실시간 채팅 (카카오톡)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                즉시 도움이 필요할 경우 카카오톡으로 문의하세요.
              </p>
              <Button className="w-full mt-3" asChild>
                <a
                  href="http://qr.kakao.com/talk/4BmRUfFOuFJyp1vcESYSG1EWnGk-"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  카톡 친구 추가
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* FAQ */}
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
                  <Link href="/dashboard/support/faq">
                    <FileQuestion className="h-4 w-4 mr-2" />
                    FAQ 보기
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 전화 문의 */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">문의하기</h2>

          <Card>
            <CardHeader>
              <CardTitle>전화 연결</CardTitle>
              <CardDescription>
                즉시 연결이 필요하면 전화 버튼을 눌러주세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" asChild>
                <a href="tel:01021744838">
                  <Phone className="h-4 w-4 mr-2" />
                  010-2174-4838 전화하기
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
