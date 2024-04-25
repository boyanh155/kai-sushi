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
  "/food": {
    vi: "/mon-an",
    en: "/food",
  },
  "/beverage": {
    vi: "/do-uong",
    en: "/beverage",
  },
  "/food/:path*": {
    vi: "/mon-an/:path*",
    en: "/food/:path*",
  },
  "/beverage/:path*": {
    vi: "/do-uong/:path*",
    en: "/beverage/:path*",
  },
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
  "/lunch": {
    vi: "/menu-trua",
    en: "/lunch",
  },
  "/basket": {
    vi: "/gio-hang",
    en: "/basket",
  },
  "/basket/success": {
    vi: "/gio-hang/thanh-cong",
    en: "/basket/success",
  },
  "/basket/success?:query": {
    vi: "/gio-hang/thanh-cong?:query",
    en: "/basket/success?:query",
  },
  "/basket/user-info": {
    vi: "/gio-hang/thong-tin-lien-lac",
    en: "/basket/user-info",
  },
  "/basket/checkout": {
    vi: "/gio-hang/kiem-tra-don-hang",
    en: "/basket/checkout",
  },
  "/basket/:path*": {
    vi: "/gio-hang/:path*",
    en: "/basket/:path*",
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
