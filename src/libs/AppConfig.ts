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
  "/booking/:path*": {
    vi: "/dat-lich/:path*",
    en: "/booking/:path*",
  },
  // menu
  // "/food": {
  //   vi: "/mon-an",
  //   en: "/food",
  // },
  // "/beverage": {
  //   vi: "/do-uong",
  //   en: "/beverage",
  // },
  // "/food/[...rest]": {
  //   vi: "/mon-an/[...rest]",
  //   en: "/food/[...rest]",
  // },
  // "/beverage/[...rest]": {
  //   vi: "/do-uong/[...rest]",
  //   en: "/beverage/[...rest]",
  // },
  // take away
  "/take-away": {
    vi: "/mang-ve",
    en: "/take-away",
  },
  // "/take-away/:path*": {
  //   vi: "/mang-ve/:path*",
  //   en: "/take-away/:path*",
  // },
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
