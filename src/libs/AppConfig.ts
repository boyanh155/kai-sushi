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
  "/booking/:path*": {
    vi: "/dat-lich/:path*",
    en: "/booking/:path*",
  },
  "/food/:path*": {
    vi: "/mon-an/:path*",
    en: "/food/:path*",
  },
  "/beverage/:path*": {
    vi: "/do-uong/:path*",
    en: "/beverage/:path*",
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