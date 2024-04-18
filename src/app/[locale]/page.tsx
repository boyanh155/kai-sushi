import { getTranslations } from "next-intl/server";
import HomePage from "../../_pages/Home";
export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "Home" });

  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}
export default function Index() {
  return <HomePage />;
}
