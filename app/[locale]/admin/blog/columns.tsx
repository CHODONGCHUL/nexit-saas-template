"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  ArrowUpDown,
  Edit,
  Eye,
  Trash2,
  Calendar,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Post } from "@/types/postType";
import Link from "next/link";

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          제목
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const post = row.original;
      return (
        <div className="flex flex-col gap-1 max-w-[300px]">
          <div className="font-medium truncate">{post.title}</div>
          {post.excerpt && (
            <div className="text-sm text-muted-foreground truncate">
              {post.excerpt}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          상태
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "published" ? "default" : "secondary"}>
          {status === "published" ? "발행됨" : "초안"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "author_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          <User className="mr-2 h-4 w-4" />
          작성자
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const authorName = row.getValue("author_name") as string;
      return (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span>{authorName || "익명"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          <Calendar className="mr-2 h-4 w-4" />
          생성일
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return (
        <div className="flex flex-col gap-1">
          <div className="text-sm">{date.toLocaleDateString("ko-KR")}</div>
          <div className="text-xs text-muted-foreground">
            {Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))}
            일 전
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3"
        >
          수정일
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("updated_at"));
      return (
        <div className="flex flex-col gap-1">
          <div className="text-sm">{date.toLocaleDateString("ko-KR")}</div>
          <div className="text-xs text-muted-foreground">
            {Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))}
            일 전
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "작업",
    cell: ({ row }) => {
      const post = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">메뉴 열기</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>작업</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {post.status === "published" && (
              <DropdownMenuItem asChild>
                <Link href={`/blog/${post.slug}`} className="flex items-center">
                  <Eye className="mr-2 h-4 w-4" />
                  보기
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem asChild>
              <Link
                href={`/blog/${post.slug}/edit`}
                className="flex items-center"
              >
                <Edit className="mr-2 h-4 w-4" />
                편집
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onClick={() => {
                // 삭제 기능 구현 예정
                alert("삭제 기능은 현재 개발 중입니다.");
              }}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
