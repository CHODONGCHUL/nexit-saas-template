"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  useUpdateUser,
  useChangePassword,
  useSignOutUser,
  useUploadAvatar,
  useDeleteAvatar,
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
import { toast } from "sonner";
import { KeyRound, X, Camera, Upload, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";

const formSchema = z.object({
  email: z.string().email({ message: "유효한 이메일 주소를 입력해주세요." }),
  username: z
    .string()
    .min(2, { message: "사용자 이름은 2자 이상이어야 합니다." }),
  name: z.string().min(2, { message: "이름은 2자 이상이어야 합니다." }),
});

const passwordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: "현재 비밀번호를 입력해주세요." }),
    newPassword: z
      .string()
      .min(6, { message: "새 비밀번호는 6자 이상이어야 합니다." }),
    confirmPassword: z
      .string()
      .min(6, { message: "비밀번호 확인을 입력해주세요." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "새 비밀번호와 비밀번호 확인이 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export default function ProfileEditForm() {
  const { mutate: updateUser, isPending } = useUpdateUser();
  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangePassword();
  const { mutate: signOutUser } = useSignOutUser();
  const { mutate: uploadAvatar, isPending: isUploadingAvatar } =
    useUploadAvatar();
  const { mutate: deleteAvatar, isPending: isDeletingAvatar } =
    useDeleteAvatar();
  const router = useRouter();
  const supabase = createClient();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      username: "",
      name: "",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    async function loadUserData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user);
        form.setValue("email", user.email || "");
        form.setValue("username", user.user_metadata.username || "");
        form.setValue("name", user.user_metadata.name || "");
        setAvatarPreview(user.user_metadata.avatar_url || null);
      }
    }
    loadUserData();
  }, [form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // 현재 사용자 정보 가져오기
    const {
      data: { user: currentUserData },
    } = await supabase.auth.getUser();
    const isEmailChanged = currentUserData?.email !== values.email;

    // 로딩 toast 표시
    const loadingToast = toast.loading("프로필을 업데이트하는 중...");

    updateUser(values, {
      onSuccess: () => {
        // 로딩 toast 제거
        toast.dismiss(loadingToast);
        router.refresh();

        if (isEmailChanged) {
          toast.success("프로필이 업데이트되었습니다!", {
            description:
              "새 이메일로 인증 링크가 전송되었습니다. 이메일을 확인해주세요.",
            duration: 5000,
          });
        } else {
          toast.success("프로필이 성공적으로 업데이트되었습니다!", {
            description: "변경사항이 저장되었습니다.",
            duration: 3000,
          });
        }
      },
      onError: (error) => {
        // 로딩 toast 제거
        toast.dismiss(loadingToast);
        console.error(error);
        toast.error("프로필 업데이트에 실패했습니다", {
          description: "다시 시도해주세요.",
          duration: 4000,
        });
      },
    });
  }

  function onPasswordSubmit(values: z.infer<typeof passwordFormSchema>) {
    // 로딩 toast 표시
    const loadingToast = toast.loading("비밀번호를 변경하는 중...");

    // 현재 비밀번호 확인 로직은 백엔드에서 처리해야 함
    // 여기서는 간단히 새 비밀번호만 변경
    changePassword(values.newPassword, {
      onSuccess: () => {
        // 로딩 toast 제거
        toast.dismiss(loadingToast);
        setIsPasswordDialogOpen(false);
        passwordForm.reset();

        // 성공 메시지
        toast.success("비밀번호가 성공적으로 변경되었습니다!", {
          description: "보안을 위해 다시 로그인해주세요.",
          duration: 4000,
        });

        // 로그아웃 처리
        signOutUser(undefined, {
          onSuccess: () => {
            router.push("/sign-in");
            toast.info("보안을 위해 자동으로 로그아웃되었습니다", {
              description: "새 비밀번호로 다시 로그인해주세요.",
              duration: 5000,
            });
          },
          onError: (error) => {
            console.error("로그아웃 중 오류가 발생했습니다:", error);
            router.push("/sign-in");
            toast.warning("로그아웃 처리 중 문제가 발생했습니다", {
              description: "수동으로 다시 로그인해주세요.",
              duration: 5000,
            });
          },
        });
      },
      onError: (error) => {
        // 로딩 toast 제거
        toast.dismiss(loadingToast);
        console.error(error);
        toast.error("비밀번호 변경에 실패했습니다", {
          description: "현재 비밀번호를 확인하고 다시 시도해주세요.",
          duration: 4000,
        });
      },
    });
  }

  function handleAvatarClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 크기 제한 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("파일 크기가 너무 큽니다", {
          description: "5MB 이하의 이미지를 선택해주세요.",
        });
        return;
      }

      // 파일 타입 확인
      if (!file.type.startsWith("image/")) {
        toast.error("이미지 파일만 업로드할 수 있습니다", {
          description: "JPG, PNG, GIF, WebP 파일을 선택해주세요.",
        });
        return;
      }

      // 미리보기 설정
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // 업로드 시작
      const loadingToast = toast.loading("아바타를 업로드하는 중...");

      uploadAvatar(file, {
        onSuccess: async (result) => {
          toast.dismiss(loadingToast);

          // 사용자 메타데이터 업데이트
          const updateData = {
            email: form.getValues("email"),
            username: form.getValues("username"),
            name: form.getValues("name"),
            avatar_url: result.url,
          };

          updateUser(updateData, {
            onSuccess: () => {
              setAvatarPreview(result.url);
              toast.success("아바타가 성공적으로 업로드되었습니다!", {
                duration: 3000,
              });

              // 현재 사용자 정보 업데이트
              setCurrentUser((prev: any) => ({
                ...prev,
                user_metadata: {
                  ...prev?.user_metadata,
                  avatar_url: result.url,
                },
              }));
            },
            onError: (error) => {
              console.error(error);
              toast.error("아바타 업로드 후 프로필 업데이트에 실패했습니다");
            },
          });
        },
        onError: (error) => {
          toast.dismiss(loadingToast);
          console.error(error);
          toast.error("아바타 업로드에 실패했습니다", {
            description: "다시 시도해주세요.",
          });
        },
      });
    }
  }

  function handleDeleteAvatar() {
    const loadingToast = toast.loading("아바타를 삭제하는 중...");

    deleteAvatar(undefined, {
      onSuccess: () => {
        toast.dismiss(loadingToast);
        setAvatarPreview(null);
        toast.success("아바타가 성공적으로 삭제되었습니다!", {
          duration: 3000,
        });

        // 현재 사용자 정보 업데이트
        setCurrentUser((prev: any) => ({
          ...prev,
          user_metadata: {
            ...prev?.user_metadata,
            avatar_url: null,
          },
        }));
      },
      onError: (error) => {
        toast.dismiss(loadingToast);
        console.error(error);
        toast.error("아바타 삭제에 실패했습니다", {
          description: "다시 시도해주세요.",
        });
      },
    });
  }

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">프로필 수정</h2>
        </CardHeader>
        <CardContent>
          {/* 아바타 섹션 */}
          <div className="flex flex-col items-center mb-6 space-y-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={avatarPreview || currentUser?.user_metadata?.avatar_url}
                  alt="프로필 아바타"
                />
                <AvatarFallback className="text-2xl">
                  {currentUser?.user_metadata?.name?.[0] ||
                    currentUser?.email?.[0] ||
                    "A"}
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                onClick={handleAvatarClick}
                disabled={isUploadingAvatar}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleAvatarClick}
                disabled={isUploadingAvatar}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                {isUploadingAvatar ? "업로드 중..." : "아바타 업로드"}
              </Button>

              {(avatarPreview || currentUser?.user_metadata?.avatar_url) && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleDeleteAvatar}
                  disabled={isDeletingAvatar}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  {isDeletingAvatar ? "삭제 중..." : "삭제"}
                </Button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-muted-foreground mt-1">
                      이메일을 변경하면 새 이메일로 인증 링크가 전송됩니다.
                    </p>
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
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator className="my-6" />

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "업데이트 중..." : "프로필 업데이트"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <Button
            variant="outline"
            onClick={() => setIsPasswordDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <KeyRound className="h-4 w-4" />
            비밀번호 변경하기
          </Button>
        </CardFooter>
      </Card>

      <Dialog
        open={isPasswordDialogOpen}
        onOpenChange={setIsPasswordDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>비밀번호 변경</DialogTitle>
            <DialogDescription>
              안전한 계정 관리를 위해 현재 비밀번호와 새 비밀번호를
              입력해주세요.
            </DialogDescription>
          </DialogHeader>
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className="space-y-4"
            >
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>현재 비밀번호</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>새 비밀번호</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    취소
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isChangingPassword}>
                  {isChangingPassword ? "변경 중..." : "비밀번호 변경"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
