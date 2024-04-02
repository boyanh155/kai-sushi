import Image from "next/image";
import React from "react";
import enFlag from "@/assets/intl-flag/en-flag.svg";
import viFlag from "@/assets/intl-flag/vi-flag.svg";
import { useLocale } from "next-intl";

type Props = {};

const localeOptions = [
  {
    value: "en",
    label: <Image src={enFlag} alt="EN flag" width={100} height={100} />,
  },
  {
    value: "vi",
    label: <Image src={viFlag} alt="VI flag" width={100} height={100} />,
  },
];
const LocaleSwitcher = (props: Props) => {
  const locale = useLocale();
  return (
    <div className="absolute top-6 right-6 w-6 h-6">
      {localeOptions.map((option, index) => {
        return (
          <div key={index}>
            {option.label}
          </div>
        );
      })}
    </div>
  );
};

export default LocaleSwitcher;
