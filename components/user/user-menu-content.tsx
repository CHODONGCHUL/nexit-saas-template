"use client";

import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

import { User } from "@supabase/supabase-js";
import { useSignOutUser } from "@/hooks/user-hook";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Headset,
  LogOut,
  PanelLeft,
  Settings,
  UserIcon,
  CreditCard,
} from "lucide-react";
import Link from "next/link";

interface UserMenuContentProps {
  user: User;
  showUserInfo?: boolean;
}

export function UserMenuContent({
  user,
  showUserInfo = true,
}: UserMenuContentProps) {
  const router = useRouter();
  const { mutate: signout } = useSignOutUser();

  const handleSignOut = async () => {
    signout(undefined, {
      onSuccess: () => {
        router.push("/");
        toast.success("로그아웃 되었습니다.");
      },
    });
  };

  return (
    <>
      {showUserInfo && (
        <>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.user_metadata.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
        </>
      )}
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/settings/profile"
            className="flex items-center cursor-pointer"
          >
            <UserIcon className="mr-2 h-4 w-4" />
            <span>프로필 수정</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center cursor-pointer">
            <PanelLeft className="mr-2 h-4 w-4" />
            <span>대시보드</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard/subscription"
            className="flex items-center cursor-pointer"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            <span>내 구독 관리</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <div
            // onClick={() => ChannelService.showMessenger()}
            className="flex items-center cursor-pointer"
          >
            <Headset className="mr-2 h-4 w-4" />
            <span>문의하기</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="flex items-center cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>설정</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
        <LogOut className="mr-2 h-4 w-4" />
        로그아웃
      </DropdownMenuItem>
    </>
  );
}
