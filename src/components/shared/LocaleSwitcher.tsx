"use client";
import Image from "next/image";
import React, { ChangeEvent, MouseEvent, useTransition } from "react";
import enFlag from "@/assets/intl-flag/en-flag.svg";
import viFlag from "@/assets/intl-flag/vi-flag.svg";
import { useLocale } from "next-intl";

import { useParams } from "next/navigation";
import { useRouter, usePathname } from "@/navigation";

type Props = {};

const localeOptions = [
  {
    value: "vi",
    item: "en",
    label: <Image src={enFlag} alt="EN flag" width={100} height={100} />,
  },
  {
    value: "en",

    item: "vi",
    label: <Image src={viFlag} alt="VI flag" width={100} height={100} />,
  },
];
const LocaleSwitcher = (props: Props) => {
  const locale = useLocale();
  const router = useRouter();
  const pathName = usePathname();
  const [isPending, startTransition] = useTransition();
  const params = useParams();

  function onSelectChange(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();

    const nextLocale = event.currentTarget.getAttribute("data-value");
    console.log(nextLocale);
    startTransition(() => {
      router.replace(
        {
          // @ts-expect-error -- TypeScript will validate that only known `params`
          // are used in combination with a given `pathname`. Since the two will
          // always match for the current route, we can skip runtime checks.
          pathname: pathName,
          params: params,
        },
        {
          locale: nextLocale,
        }
      );
    });
  }
  return (
    // <div className="relative content-container">
    <div className="absolute top-6 right-6 w-6 h-6">
      {localeOptions.map((option, index) => {
        return locale.split("/").includes(option.item) ? (
          <div
            className="list-none"
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
