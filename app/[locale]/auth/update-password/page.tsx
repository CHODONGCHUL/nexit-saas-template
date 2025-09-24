"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UpdatePasswordPage() {
  const supabase = createClient();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ 세션 검증: Supabase 이메일 링크에서 code + email 확인
  useEffect(() => {
    const verify = async () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      const email = url.searchParams.get("email");

      if (code && email) {
        const { data, error } = await supabase.auth.verifyOtp({
          type: "recovery",
          token: code,
          email,
        });

        if (error) {
          console.error("세션 검증 실패:", error.message);
          setMessage("❌ 세션 검증 실패: " + error.message);
        } else {
          console.log("✅ 세션 검증 성공:", data);
          setMessage("세션이 성공적으로 검증되었습니다. 비밀번호를 변경하세요.");
        }
      }
    };
    verify();
  }, [supabase]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage("❌ 비밀번호 변경 실패: " + error.message);
    } else {
      setMessage("✅ 비밀번호가 성공적으로 변경되었습니다.");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <form
        onSubmit={handleUpdatePassword}
        className="flex flex-col gap-4 w-full max-w-sm border p-6 rounded-lg shadow"
      >
        <h1 className="text-xl font-bold">비밀번호 변경</h1>
        <Input
          type="password"
          placeholder="새 비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "변경 중..." : "비밀번호 변경"}
        </Button>
        {message && <p className="text-sm">{message}</p>}
      </form>
    </div>
  );
}
