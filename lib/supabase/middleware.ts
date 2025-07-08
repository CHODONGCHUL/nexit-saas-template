import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";

export async function updateSession(
  request: NextRequest,
  response: NextResponse
) {
  // 환경변수가 설정되지 않은 경우 미들웨어 체크를 건너뜁니다. 프로젝트 설정 후 이 부분을 제거할 수 있습니다.
  if (!hasEnvVars) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // createServerClient와 supabase.auth.getUser() 사이에 코드를 실행하지 마세요.
  // 간단한 실수로도 사용자가 무작위로 로그아웃되는 문제를 디버깅하기 매우 어렵게 만들 수 있습니다.

  // 중요: auth.getUser()를 제거하지 마세요
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 중요: 반드시 response 객체를 그대로 반환해야 합니다.
  // NextResponse.next()로 새로운 response 객체를 만드는 경우:
  // 1. request를 전달하세요: const myNewResponse = NextResponse.next({ request })
  // 2. 쿠키를 복사하세요: myNewResponse.cookies.setAll(response.cookies.getAll())
  // 3. myNewResponse 객체를 필요에 맞게 변경하되, 쿠키는 변경하지 마세요
  // 4. 마지막에 return myNewResponse
  // 이렇게 하지 않으면 브라우저와 서버가 동기화되지 않아 사용자 세션이 조기에 종료될 수 있습니다!

  return response;
}
