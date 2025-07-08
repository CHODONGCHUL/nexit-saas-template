"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useUserRole } from "@/hooks/user-hook";

interface AdminEditButtonProps {
  postSlug: string;
}

export function AdminEditButton({ postSlug }: AdminEditButtonProps) {
  const { data: userRole } = useUserRole();
  const isAdmin = userRole?.role === "admin";

  if (!isAdmin) {
    return null;
  }

  return (
    <Link href={`/blog/${postSlug}/edit`}>
      <Button variant="ghost" size="sm">
        <Edit className="mr-2 h-4 w-4" />
        수정
      </Button>
    </Link>
  );
}
