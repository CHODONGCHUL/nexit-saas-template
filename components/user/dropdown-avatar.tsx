"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User } from "@supabase/supabase-js";
import { UserMenuContent } from "./user-menu-content";

export default function DropdownAvatar({
  user,
  open,
  onOpenChange,
}: {
  user: User;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.user_metadata.avatar_url}
              alt={user.user_metadata.name}
            />
            <AvatarFallback>{user.user_metadata.name[0] || "A"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mx-6 z-[70]" align="end" forceMount>
        <UserMenuContent user={user} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
