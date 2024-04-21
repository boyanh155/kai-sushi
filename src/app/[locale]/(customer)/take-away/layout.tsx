import { gideon } from "@/libs/GoogleFont";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import React from "react";

type Props = {
  children: React.ReactNode;
};
export const dynamic = "force-dynamic";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "TakeAway" });

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

const TakeAwayLayout = ({ children }: Props) => {
  const t = useTranslations("TakeAway");
  return (
    <div className="flex flex-col relative content-container items-center ">
      <h1 className={`text-white mt-6 uppercase text-3xl ${gideon.className}`}>
        {t("take_away_label")}
      </h1>
      <div className="flex flex-col mt-11 w-full flex-grow">{children}</div>
    </div>
  );
};

export default TakeAwayLayout;
