import { useTranslations } from "next-intl";
import SuShiBig from "./components/SuShiBig";


const Error404 = () => {
  const t = useTranslations('Error')
  return (
    <div className="bg-white text-black w-full h-screen  overflow-hidden fixed z-[999] flex-col flex gap-7 justify-center items-center bottom-24">
      <div className="whitespace-nowrap leading-10 gap-2 text-nowrap flex text-[108px] font-black justify-center items-center ">
        4<SuShiBig width={64} height={64} />4
      </div>
      <p className="text-3xl font-bold">{t("404")}</p>
    </div>
  );
};

export default Error404;
