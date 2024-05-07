import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { AppConfig, pathnames } from "./libs/AppConfig";

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales: AppConfig.locales,
    pathnames: pathnames,
    localePrefix: AppConfig.localePrefix,
  });
