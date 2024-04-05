"use client";
import Image from "next/image";
import React, { ChangeEvent, MouseEvent, useTransition } from "react";
import enFlag from "@/assets/intl-flag/en-flag.svg";
import viFlag from "@/assets/intl-flag/vi-flag.svg";
import { useLocale } from "next-intl";

import { useParams, useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "@/navigation";

type Props = {};

const localeOptions = [
  {
    value: "vi",
    item: "en",
    label: <Image src={viFlag} alt="VI flag" width={100} height={100} />,
  },
  {
    value: "en",

    item: "vi",
    label: <Image src={enFlag} alt="EN flag" width={100} height={100} />,
  },
];
const LocaleSwitcher = (props: Props) => {
  const locale = useLocale();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const params = useParams();

  function onSelectChange(event: MouseEvent<HTMLDivElement>) {
    const nextLocale = event.currentTarget.getAttribute("data-value");

    startTransition(() => {
      router.replace(
        {
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          // @ts-expect-error -- TypeScript will validate that only known `params`
          pathname: pathName + "?" + searchParams.toString(),
          params,
        },
        {
          locale: nextLocale || "en",
        }
      );
    });
  }
  return (
    // <div className="relative content-container">
    <div className="absolute top-6 right-6 w-6 h-6 z-[9999]">
      {localeOptions.map((option, index) => {
        return locale.split("/").includes(option.item) ? (
          <div
            className="list-none cursor-pointer hover:opacity-60 transition-all"
            key={index}
            data-value={option.value}
            onClick={onSelectChange}
          >
            {option.label}
          </div>
        ) : null;
      })}
      {/* </div> */}
    </div>
  );
};

export default LocaleSwitcher;
