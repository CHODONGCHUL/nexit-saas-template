// /lib/supabase/client.ts

import { createBrowserClient } from "@supabase/ssr";
import { createClient as createServerClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 브라우저 전용 클라이언트
export function createBrowserSupabaseClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// 서버 전용 클라이언트
export function createServerSupabaseClient() {
  return createServerClient(supabaseUrl, supabaseAnonKey);
}

// ✅ 기존 코드 호환용 (에러 방지)
export const createClient = createBrowserSupabaseClient;
