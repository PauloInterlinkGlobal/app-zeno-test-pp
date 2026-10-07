import { routing } from "@/core/i18n/routing";
import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

const allowedIPs = new Set(
  (process.env.ALLOWED_IPS ?? "")
    .split(",")
    .map((ip) => ip.trim())
    .filter(Boolean),
);
allowedIPs.add("127.0.0.1");
allowedIPs.add("::1");

/** X-Frame-Options só em produção — em dev a app é embebida em iframes (previews). */
const setSecurityHeaders = (res: NextResponse) => {
  if (process.env.NODE_ENV === "production") {
    res.headers.set("X-Frame-Options", "DENY");
  }
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return res;
};

const SANDBOX_PREFIXES = ["sandboxapp.", "sandboxadmin.", "sandboxweb."];

export function middleware(request: NextRequest) {
  try {
    if (process.env.MODE !== "production") {
      const forwarded = request.headers.get("x-forwarded-for");
      const realIp = request.headers.get("x-real-ip");

      let requestIp = forwarded
        ? forwarded.split(",")[0].trim()
        : (realIp ?? "");

      if (requestIp.includes("::ffff:")) {
        requestIp = requestIp.replace("::ffff:", "");
      }

      if (!allowedIPs.has(requestIp)) {
        console.error(`[IP Blocked] IP não autorizado: ${requestIp}`);

        const host = request.headers.get("host");
        const isSandbox = SANDBOX_PREFIXES.some((prefix) =>
          host?.startsWith(prefix),
        );

        if (isSandbox) {
          const response = NextResponse.redirect("https://www.smsillico.ao", {
            status: 302,
          });
          setSecurityHeaders(response);
          return response;
        }

        const blocked = NextResponse.json(
          { message: `Forbidden: IP not allowed, yourIP: ${requestIp}` },
          { status: 403 },
        );

        setSecurityHeaders(blocked);

        return blocked;
      }
    }

    const intlResponse = intlMiddleware(request);

    if (intlResponse && intlResponse.status !== 200) {
      setSecurityHeaders(intlResponse);
      return intlResponse;
    }

    const response = intlResponse || NextResponse.next();

    setSecurityHeaders(response);

    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
