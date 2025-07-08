"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useSigninUser,
  useSignInWithGoogle,
  useSignInWithKakao,
} from "@/hooks/user-hook";
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
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import GoogleSigninButton from "./google-signin-button";

interface SigninFormProps {
  setOpen?: (open: boolean) => void;
}

const formSchema = z.object({
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
  password: z
    .string()
    .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." }),
});

export default function SigninForm({ setOpen }: SigninFormProps) {
  const [loginError, setLoginError] = useState<string | null>(null);
  const { mutate: signInWithPassword, isPending } = useSigninUser();
  const { mutate: signInWithKakao } = useSignInWithKakao();
  const { mutate: signInWithGoogle } = useSignInWithGoogle();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signInWithPassword(values, {
      onSuccess: () => {
        if (setOpen) setOpen(false);
        router.push("/dashboard");
        router.refresh();
      },
      onError: (error) => {
        setLoginError("이메일 또는 비밀번호가 올바르지 않습니다.");
      },
    });
  }

  return (
    <Card className={cn("w-[350px]", setOpen && "border-0 shadow-none")}>
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">로그인</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            {loginError && (
              <Alert variant="destructive">
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "로그인 중..." : "로그인"}
            </Button>
          </form>
        </Form>
        <div className="flex justify-between mt-4 text-sm text-center">
          <Link
            href="/forgot-password"
            className="text-muted-foreground hover:underline cursor-pointer"
          >
            비밀번호를 잊어버리셨나요?
          </Link>
          <Link
            href="/sign-up"
            className="text-muted-foreground hover:underline cursor-pointer"
          >
            회원가입
          </Link>
        </div>
      </CardContent>
      <Separator className="mb-6" />
      <CardFooter>
        <div className="flex flex-col gap-4 w-full">
          <div
            onClick={() => signInWithKakao()}
            className="transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
          >
            <img
              src="/kakao_login_large_wide.png"
              height={50}
              alt="kakao login"
              className="cursor-pointer w-full"
            />
          </div>
          <div
            onClick={() => signInWithGoogle()}
            className="transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
          >
            <GoogleSigninButton />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
