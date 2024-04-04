"use client";

import React, { useEffect, useRef, useState } from "react";

import MenuHeader from "./MenuHeader";
import MenuChild from "./MenuChild";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { CloseOutlined } from "@mui/icons-material";
import { useGetMenu } from "@/hooks/api/useMenuApi";
import { MenuDataResponseBody } from "../../../types/ApiMenuType";
import { isEmpty } from "lodash";
import Loading from "../shared/Loading";
import { gideon } from "@/libs/GoogleFont";
import useApi from "@/hooks/api/useApi";
import { Link } from "@/navigation";
type Props = {};

const MenuMain = (props: Props) => {
  const pathName = usePathname();
  const menuType = pathName?.split("/")[2] as "food" | "beverage";
  const headerType = pathName?.split("/")[3] as string;
  const activeHeaderElement = useRef<HTMLDivElement>(null);

  const [menuData, setMenuData] = useState<MenuDataResponseBody[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const api = useGetMenu(menuType);
  // Assuming activeHeaderElement is a reference to a DOM element
  useEffect(() => {
    // On page load, set the scroll position to the stored value

    if (!activeHeaderElement.current) return;
    const scrollPos = localStorage.getItem("scrollPosX");
    if (scrollPos && activeHeaderElement.current) {
      activeHeaderElement.current.scrollLeft = Number(scrollPos);
    }

    const handleScroll = () => {
      if (activeHeaderElement.current) {
        // On scroll, store the current scroll position
        localStorage.setItem(
          "scrollPosX",
          String(activeHeaderElement.current.scrollLeft)
        );
      }
    };

    activeHeaderElement.current.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      if (activeHeaderElement.current) {
        activeHeaderElement.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [activeHeaderElement.current]); // Empty dependency array to run only once on mount
  useEffect(() => {
    if (isEmpty(api?.data)) return;
    setMenuData(api?.data!);
  }, [api?.data]);

  useEffect(() => {

    if (!headerType) return setCurrentIndex(0);

    setCurrentIndex(
      api?.data?.findIndex(
        (v) => headerType.toLowerCase() === v.slug.toLowerCase()
      ) || 0
    );
  }, [headerType, api?.data]);
  const t = useTranslations("Home");
  return api?.isLoading ? (
    <Loading />
  ) : menuData ? (
    <div className=" flex flex-col overflow-x-hidden pb-2">
      {/* IMAGE  */}
      <div
        style={{
          backgroundImage:
            menuData[currentIndex]?.image &&
            `url('${menuData[currentIndex]?.image}')`,
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
          <p className={`uppercase ${gideon.className}`}>
            {menuType === "food" ? t("food") : t("beverage")}
          </p>
        </div>
      </div>
      {/* NAV HEADER */}
      <div className="ps-4">
        <div
          ref={activeHeaderElement}
          className="flex flex-row ps-6 gap-4 w-screen overflow-scroll"
        >
          {!isEmpty(menuData) &&
            menuData
              ?.sort((a, b) => +a.order - +b.order)
              .map((v, id) => (
                <MenuHeader
                  menuType={menuType}
                  active={currentIndex == id}
                  item={v}
                  key={id}
                />
              ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-8 gap-16 flex flex-col">
        {menuData?.[currentIndex]?.children?.map((v, id) => (
          <MenuChild item={v} key={id} />
        ))}
      </div>
    </div>
  ) : (
    <div>No data</div>
  );
};

export default MenuMain;
