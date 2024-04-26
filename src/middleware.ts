import createMiddleware from "next-intl/middleware";
import { AppConfig, pathnames } from "./libs/AppConfig";
import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
// function getLocale(req) {
//   const acceptLanguage = req.headers.get("accept-language");
//   const locale = acceptLanguage?.split(",")[0];
//   return locale;
// }

export default async function middleware(request: NextRequest) {
  let languages = new Negotiator({ headers: request.headers }).languages();
  console.log(languages);
  const localeTags = "x-current-locale";
  let currentLocale = request.headers.get(localeTags);
  const pathName = request.nextUrl.pathname;
  const pathSplit = pathName.split("/");
  console.log(pathSplit[1]);

  if (pathSplit[1] === "vi" || pathSplit[1] === "en") {
    currentLocale = pathSplit[1];
    request.headers.set(localeTags, currentLocale);
  }
  const defaultLocale = currentLocale || (AppConfig.defaultLocale as any);
  const handleI18nRouting = createMiddleware({
    locales: AppConfig.locales,
    localePrefix: AppConfig.localePrefix,
    // Used when no locale matches
    defaultLocale,
    pathnames,
  });
  console.log("---------------");
  console.log(defaultLocale);

  if (pathSplit[1] === "locale") {
    // Prepend the locale to the pathname and redirect the request
    pathSplit[1] = defaultLocale;
    request.nextUrl.pathname = pathSplit.join("/");
    return NextResponse.redirect(request.nextUrl);
  }
  const response = handleI18nRouting(request);
  response.headers.set(localeTags, defaultLocale);

  // Check if the request's pathname starts with /api

  return response;
}
// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: AppConfig.locales,
//   localePrefix: AppConfig.localePrefix,
//   // Used when no locale matches
//   defaultLocale: AppConfig.defaultLocale,
//   pathnames,
// });

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/",
    "/qrcode-booking",
    "/(vi|en)/:path*",
    "/((?!_next|_vercel|admin|api|.*\\..*).*)",
    // "/((?!.+\\.[\\w]+$|_next).*)",
    // "/(api|trpc)(.*)",
  ],
};
