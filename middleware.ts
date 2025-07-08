import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  // 먼저 i18n 라우팅을 처리
  const response = handleI18nRouting(request);

  // A `response` can now be passed here
  return await updateSession(request, response);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
