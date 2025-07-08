import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // 인증 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { slug, locale = "ko" } = await request.json();

    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }

    // 특정 블로그 포스트 페이지 revalidate
    revalidatePath(`/${locale}/blog/${slug}`);

    // 블로그 목록 페이지도 revalidate
    revalidatePath(`/${locale}/blog`);

    return NextResponse.json({
      message: "Revalidated successfully",
      revalidated: true,
      now: Date.now(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
