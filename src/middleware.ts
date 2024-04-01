import createMiddleware from "next-intl/middleware";
import { AppConfig } from "./libs/AppConfig";

export default createMiddleware({
  // A list of all locales that are supported
  locales: AppConfig.locales,
  // Used when no locale matches
  defaultLocale: AppConfig.defaultLocale,
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/",
    "/qrcode-booking",
    "/(vi|en)/:path*",
    "/((?!_next|_vercel|admin|.*\\..*).*)",
    // "/((?!.+\\.[\\w]+$|_next).*)",
    // "/(api|trpc)(.*)",
  ],
};
