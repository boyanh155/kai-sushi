import { Pathnames } from "next-intl/navigation";

const locales = ["en", "vi"] as const;

export type typeOfLocale = (typeof locales)[number];
export type typeOfLocales = typeof locales;

const localePrefix: any = "always";

export const pathnames = {
  "/": "/",
  "/booking": {
    vi: "/dat-lich",
    en: "/booking",
  },
  // booking
  "/booking/order-info": {
    vi: "/dat-lich/thong-tin-dat-ban",
    en: "/booking/order-info",
  },
  "/booking/user-info": {
    vi: "/dat-lich/thong-tin-lien-lac",
    en: "/booking/user-info",
  },
  "/booking/success": {
    vi: "/dat-lich/thanh-cong",
    en: "/booking/success",
  },
  "/booking/success?:query": {
    vi: "/dat-lich/thanh-cong?:query",
    en: "/booking/success?:query",
  },
  // menu
  "/food/:path*": {
    vi: "/mon-an/:path*",
    en: "/food/:path*",
  },
  "/beverage/:path*": {
    vi: "/do-uong/:path*",
    en: "/beverage/:path*",
  },
  // take away
  "/take-away": {
    vi: "/mang-ve",
    en: "/take-away",
  },
  "/take-away/:path*": {
    vi: "/mang-ve/:path*",
    en: "/take-away/:path*",
  },
} satisfies Pathnames<typeof locales>;

export const AppConfig: {
  name: string;
  locales: typeOfLocale[];
  defaultLocale: typeOfLocale;
  localePrefix: any;
} = {
  name: "Lilfam Store",
  locales: [...locales],
  defaultLocale: "en" satisfies typeOfLocale,
  localePrefix,
};

export type AppPathnames = keyof typeof pathnames;
