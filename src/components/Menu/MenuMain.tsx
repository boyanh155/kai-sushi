"use client";

import React, { useEffect, useMemo, useState } from "react";
import { beverageData, menuData } from "./dummy/menu";
import MenuHeader from "./MenuHeader";
import MenuChild from "./MenuChild";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Close, CloseOutlined } from "@mui/icons-material";
type Props = {};

const MenuMain = (props: Props) => {
  const [type, setType] = useState<"food" | "beverage">("food");
  const t = useTranslations("Home");

  const pathName = usePathname();

  const currentIndex = useMemo(() => {
    const _i = menuData.findIndex((v) => pathName!.includes(v.slug!));
    if (_i !== -1) {
      setType("food");
      return _i;
    }
    setType("beverage");
    return beverageData.findIndex((v) => pathName!.includes(v.slug!));
  }, [pathName]);

  return (
    <div className=" flex flex-col overflow-x-hidden">
      {/* IMAGE  */}
      <div
        style={{
          backgroundImage:
            (type === "food" ? menuData : beverageData)[currentIndex]?.image &&
            `url('${
              (type === "food" ? menuData : beverageData)[currentIndex]?.image
            }')`,
        }}
        className={`w-screen   uppercase text-4xl h-56  relative after:absolute after:w-full after:h-full after:bg-black after:inset-0 after:opacity-80 after:z-40 ${`bg-no-repeat bg-contain bg-center`}`}
      >
        <div className="absolute z-50  flex justify-center items-center w-full h-full flex-col gap-2">
          <Link
            href="/"
            className="bg-black p-1.5 border-[0.5px] border-[#878787a6] rounded-sm"
          >
            <CloseOutlined sx={{ fontSize: 20, fontWeight: 300 }} />
          </Link>
          <p className=" ">{type === "food" ? t("food") : t("beverage")}</p>
        </div>
      </div>
      {/* NAV HEADER */}
      <div className="ps-4">
        <div className="flex flex-row gap-6 w-screen overflow-scroll">
          {(type === "food" ? menuData : beverageData).map((v, id) => (
            <MenuHeader active={currentIndex === id} item={v} key={id} />
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-8 gap-16 flex flex-col">
        {(type === "food" ? menuData : beverageData)[
          currentIndex
        ]?.NavChildren?.map((v, id) => (
          <MenuChild item={v} key={id} />
        ))}
      </div>
    </div>
  );
};

export default MenuMain;
