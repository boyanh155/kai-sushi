import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import SuShiIcon from "./components/SuShiIcon";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "Comingsoon" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

const Comingsoon = () => {
  const t = useTranslations("Comingsoon");
  return (
    <div className="bg-white text-black w-full h-screen  overflow-hidden fixed z-[999] flex-col flex gap-7 justify-center items-center bottom-24">
      <div className="whitespace-nowrap leading-10 gap-2 text-nowrap flex sm:text-[80px] text-[50px] font-black justify-center items-center ">
        C
        <SuShiIcon />
        MING S
        <SuShiIcon />
        <SuShiIcon />N
      </div>
      <p className="text-3xl font-bold">{t("coming_soon")}</p>
    </div>
  );
};

export default Comingsoon;
