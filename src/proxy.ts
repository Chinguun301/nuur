import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import createI18nMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const handleI18n = createI18nMiddleware(routing);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ═══ Admin Routes — skip i18n, handle auth ═══
  if (pathname.startsWith("/admin")) {
    // Allow login page without auth
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    let supabaseResponse = NextResponse.next({ request });

    // Create Supabase client with ANON key for session handling
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    // 1️⃣ Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    // 2️⃣ Check if user is admin — use SERVICE_ROLE key to bypass RLS
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/users?select=role&id=eq.${user.id}&limit=1`, {
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (res.ok) {
        const dbUsers = await res.json();
        const dbUser = dbUsers?.[0];

        if (!dbUser || dbUser.role !== "admin") {
          const url = request.nextUrl.clone();
          url.pathname = "/";
          return NextResponse.redirect(url);
        }

        // ✅ User is admin — allow access
        return supabaseResponse;
      }
    } catch {
      // Fetch failed — fall through to redirect
    }

    // Fallback: admin role check failed
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // ═══ Public Routes — run next-intl i18n middleware ═══
  return handleI18n(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/ (public images)
     * - public files (svg, etc.)
     * - sitemap.xml / robots.txt
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|.*\\.svg$|sitemap\\.xml|robots\\.txt).*)",
  ],
};
