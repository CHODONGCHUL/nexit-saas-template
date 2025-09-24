"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSignUpUser } from "@/hooks/user-hook";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import MarketingConsentDialog from "./marketing-consent-dialog";
import Cookies from "js-cookie";
import { Users, Gift } from "lucide-react";

const formSchema = z
  .object({
    email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
    username: z
      .string()
      .min(2, { message: "사용자 이름은 2자 이상이어야 합니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." }),
    passwordConfirm: z.string(),
    name: z.string().min(2, { message: "이름은 2자 이상이어야 합니다." }),
    marketingConsent: z.boolean().optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export default function SignupForm() {
  const [signupError, setSignupError] = useState<string | null>(null);
  const [showMarketingDialog, setShowMarketingDialog] = useState(false);
  const [pendingValues, setPendingValues] = useState<z.infer<
    typeof formSchema
  > | null>(null);
  const [referralInfo, setReferralInfo] = useState<{
    code: string;
    referrerId: string;
  } | null>(null);
  const { mutate: signUpUser, isPending } = useSignUpUser();
  const router = useRouter();

  useEffect(() => {
    // 쿠키에서 레퍼럴 정보 확인
    const referralDataCookie = Cookies.get("referral_data");
    if (referralDataCookie) {
      try {
        const data = JSON.parse(referralDataCookie);
        setReferralInfo({
          code: data.referrerCode,
          referrerId: data.referrerId,
        });
      } catch (error) {
        console.error("레퍼럴 데이터 파싱 오류:", error);
      }
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
      name: "",
      marketingConsent: false,
    },
  });

  function handleSignup(
    values: z.infer<typeof formSchema>,
    withMarketing: boolean = false
  ) {
    const signupData = {
      ...values,
      marketingConsent: withMarketing ? true : values.marketingConsent,
      referralCode: referralInfo?.code,
    };

    signUpUser(signupData, {
      onSuccess: () => {
        // 회원가입 성공 후 레퍼럴 쿠키 삭제
        Cookies.remove("referral_data");
        router.push("/");
        router.refresh();
      },
      onError: (error) => {
        setSignupError("회원가입 중 오류가 발생했습니다.");
        console.error(error);
      },
    });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.marketingConsent) {
      setPendingValues(values);
      setShowMarketingDialog(true);
      return;
    }
    handleSignup(values);
  }

  const handleMarketingConsent = (consent: boolean) => {
    if (pendingValues) {
      handleSignup(pendingValues, consent);
    }
  };

  return (
    <>
      <div className="w-full max-w-[400px] mx-auto">
        <Card className="w-full my-8 mt-16">
          <CardHeader className="pb-4">
            <h2 className="text-2xl font-bold text-center">회원가입</h2>
            {referralInfo && (
              <div className="mt-4 p-3 bg-muted rounded-md flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <p className="text-sm">친구의 초대로 가입합니다.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  <p className="text-sm font-medium">보너스 20 크레딧 증정!</p>
                </div>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input placeholder="이메일을 입력하세요" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>사용자 이름</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="사용자 이름을 입력하세요"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="비밀번호를 입력하세요"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호 확인</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="비밀번호를 다시 입력하세요"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름</FormLabel>
                      <FormControl>
                        <Input placeholder="이름을 입력하세요" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="privacy-policy">
                      <AccordionTrigger className="text-sm font-medium">
                        개인정보 수집 및 이용 안내
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-sm text-gray-500 p-4 rounded-lg">
                          <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>
                              <strong>수집 목적:</strong> 회원 식별 및 회원제
                              서비스 제공, 서비스 변경사항 및 고지사항 전달
                            </li>
                            <li>
                              <strong>수집 항목:</strong> 이름, 이메일
                            </li>
                            <li>
                              <strong>보유 및 이용 기간:</strong> 가입일로부터
                              탈퇴 시까지
                            </li>
                          </ul>
                          <p className="mt-2">
                            ※ 회원가입을 진행할 경우, 위 개인정보 수집 및 이용에
                            동의한 것으로 간주됩니다.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <FormField
                    control={form.control}
                    name="marketingConsent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>마케팅 정보 수신 동의</FormLabel>
                          <p className="text-sm text-gray-500">
                            AutoNavi의 새로운 소식과 혜택 정보를 받아보시겠습니까?
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                {signupError && (
                  <Alert variant="destructive">
                    <AlertDescription>{signupError}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "가입 중..." : "회원가입"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <MarketingConsentDialog
        open={showMarketingDialog}
        onOpenChange={setShowMarketingDialog}
        onConsent={handleMarketingConsent}
      />
    </>
  );
}
