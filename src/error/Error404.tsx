import { useTranslations } from "next-intl";
import SuShiBig from "./components/SuShiBig";

type Props = {};

const Error404 = (props: Props) => {
  const t = useTranslations('Error')
  return (
    <div className="bg-white text-black w-screen h-screen fixed z-[999] flex-col flex gap-7 justify-center items-center bottom-24">
      <p className="whitespace-nowrap leading-10 gap-2 text-nowrap flex text-[128px] font-black justify-center items-center ">
        4<SuShiBig width={64} height={64} />4
      </p>
      <p className="text-4xl font-bold">{t("404")}</p>
    </div>
  );
};

export default Error404;
