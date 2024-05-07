import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    menuType: string;
  };
  children: React.ReactNode;
};
export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "Home" });

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}
const LayoutPage = ({ children, params: { menuType } }: Props) => {
  if (!(menuType === "food" || menuType === "beverage" || menuType === "both"))
    return notFound();

  return children;
};

export default LayoutPage;
