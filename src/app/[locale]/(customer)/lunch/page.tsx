"use client";
import { gideon } from "@/libs/GoogleFont";
import React from "react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { isEmpty } from "lodash";
import Image from "next/image";

const data = [
  {
    title: "Cá hồi nướng sốt teriyaki",
    price: "139",
    image:
      "https://s3-alpha-sig.figma.com/img/45d0/65e3/a69543b49080f9277d598ae54676a0a5?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S7VpTaxE06HWv7enw4sgr8-qdiQcZsIOiONL5MnIkx4nn3fDSxCLPLamKp7db3YGC8rmZw15O7W2z8Iqo5FROL6RyMkJAZbtcuFbD1TpWJ2yXb71-I3uCPQobPo~S0HGRB10dLD1CofTjjUsuycHlhaM2MjFxikObGARXauSIQf~jCFTm-0G7z6jA7EJGQiIMvxZ5nJT1FZwl~QpSU7QNcS78jjKqDaKVtvCvCeOgImdgucO0QS~8Ov1M8polavWEQgMBADcKbpfGRXKWFBqIykGuG8L9PW-37XeunNP5EutZXa6VZNYgEfqtBGy3NkKNfOWEDhZvHu~ocou79QMhA__",
  },
  {
    title: "Heo chiên xù",
    price: "129",
    image:
      "https://s3-alpha-sig.figma.com/img/9b0f/209f/f05558b021e34f1abf56966c3b63a116?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dMCiYxxlpLF5btBpdnYjJKkYB5Zm0DiK-BCUZ8zLd1LrqxW72Dx05N7fy2v9NI6l9lx9~tH4WPE6S5bPvWt7hrhnzTHq7vxCcNM3PoUAzltqcuxqCUGtk5ufRlbSqiGA0hEp7SPIffzCL2ts~1-5LEK~Jcqhtu2Cs7zuUJCZqp59hjhj4WxJ1oB0HCf~QkHyc0NZfQd-xJDNbAAqHc9lEIGLfA4ZPmGtZKB1mO4StFukYoxRZAiahq4slgX7HgusPmjbVIyilpghVjuaot3yVYYpPdxKsi44nlG0Vq3GFE4hOc136cq6O8hYIx5viyC80IdVPVZYwcn~hmIPNfaCkQ__",
  },
  {
    title: "Sushi mix",
    price: "129",
    image:
      "https://s3-alpha-sig.figma.com/img/1a51/7a5d/2d74853390dc1f87ff19438a1a085b39?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E7gsL~ooptbetarV-E2LeDD90ObA~Xbx7~qOz5L1G8O9Gu9fgLFiREnM8u0w218GWLhGotkBAXiENGRE3XWcy3oZhbAbOlCDRVH0ue~ozzisxrWdE4fXziow3ar9rTzakEoBHUS-cSc~GxRNQ9j~k9M3jc6TZD7ZUYPnmQkBDtcP2jSpfBXWgAyzo~aFHzDnKVUCJPU41p5uJJYgW7-LCjtH7YYVQDeqhPGM6~~dJZjuLUzgcNb-bJ5Ue48Ngi3K4DjUuY3Di6QqlfYnLTO0G3XjfceW8-W2C686Mxa~azTDnSnKgAb6JXtgA5TMZLI04-I3~TOlMihsdqRCmKP6xA__",
    className: "rotate-[2.45deg]",
  },
];

const LunchPage = () => {
  const t = useTranslations("Home");
  return (
    <div className="relative overflow-visible flex flex-col min-h-[calc(100vh-110px)] items-center content-container pb-24">
      {/* TOP   */}
      <div
        className={`w-screen uppercase text-4xl h-56  relative after:absolute after:w-full after:h-full after:bg-black after:inset-0 after:opacity-80 after:z-40 ${`bg-no-repeat bg-contain bg-center`} pb-28`}
      >
        <div className="absolute z-50  flex justify-center items-center w-full h-full flex-col gap-10">
          <Link
            href="/"
            className="bg-black px-2 py-2.5 outline outline-[1px] outline-[#878787a6] rounded-sm text-xl"
          >
            x
          </Link>
          <h1 className={`uppercase ${gideon.className}`}>
            {t("lunch_label")}
          </h1>
        </div>
      </div>
      {/* BODY */}
      <div className="flex flex-col text-white text-base gap-8 w-full justify-center items-center px-[30px]">
        <div>{t("lunch_set")}</div>
        {/* MENU */}
        <div className="flex flex-col gap-10 w-full">
          {!isEmpty(data) ? (
            data.map((v, id) => (
              <div className="w-full flex-col flex gap-3 " key={id}>
                {/* CARD */}
                <div className=" border-[0.4px] border-[#ffffffab] flex justify-between px-3 pt-4 pb-8 uppercase font-light">
                  <div>{v.title}</div>
                  <div>{v.price}</div>
                </div>
                <div className="w-full h-[120px] overflow-hidden rounded-sm">
                  <Image
                    objectFit="cover"
                    layout="fill"
                    src={v.image}
                    alt="lunch_img "
                    className={`w-full h-[140px] block object-cover ${v.className}`}
                  />
                </div>
              </div>
            ))
          ) : (
            <div>No data</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LunchPage;
