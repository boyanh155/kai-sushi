"use client";

import React, { useEffect, useMemo, useState } from "react";

import MenuHeader from "./MenuHeader";
import MenuChild from "./MenuChild";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Close, CloseOutlined } from "@mui/icons-material";
import { useGetMenu } from "@/hooks/api/useMenuApi";
import { NavChild } from "../../../types/NavbarType";
import { MenuDataResponseBody } from "../../../types/ApiMenuType";
import { isEmpty } from "lodash";
type Props = {};

const MenuMain = (props: Props) => {
  const pathName = usePathname();
  const menuType = pathName?.split("/")[2] as "food" | "beverage";
  const headerType = pathName?.split("/")[3] as string;

  const [menuData, setMenuData] = useState<MenuDataResponseBody[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const api = useGetMenu(menuType);
  console.log(menuType);
  useEffect(() => {
    if (isEmpty(api?.data)) return;
    setMenuData(api?.data!);
  }, [api?.isPending]);
  useEffect(() => {
    if (!headerType) return setCurrentIndex(0);

    setCurrentIndex(
      menuData.findIndex(
        (v) => headerType.toLowerCase() === v.slug.toLowerCase()
      ) || 0
    );
  }, [menuData, headerType]);
  const t = useTranslations("Home");


  return (
    <div className=" flex flex-col overflow-x-hidden">
      {/* IMAGE  */}
      <div
        style={{
          backgroundImage:
            menuData[currentIndex]?.image && `url('${menuData[0]?.image}')`,
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
          <p className=" ">{menuType === "food" ? t("food") : t("beverage")}</p>
        </div>
      </div>
      {/* NAV HEADER */}
      <div className="ps-4">
        <div className="flex flex-row gap-6 w-screen overflow-scroll">
          {menuData.map((v, id) => (
            <MenuHeader menuType={menuType} active={false} item={v} key={id} />
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-8 gap-16 flex flex-col">
        {menuData[currentIndex]?.children?.map((v, id) => (
          <MenuChild item={v} key={id} />
        ))}
      </div>
    </div>
  );
};

export default MenuMain;
