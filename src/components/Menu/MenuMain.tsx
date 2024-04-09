"use client";
import MenuHeader from "./MenuHeader";
import MenuChild from "./MenuChild";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetMenu } from "@/hooks/api/useMenuApi";
import { isEmpty } from "lodash";
import Loading from "../shared/Loading";
import { gideon } from "@/libs/GoogleFont";
import { Link } from "@/navigation";
import { useEffect, useRef } from "react";

const MenuMain = () => {
  const pathName = usePathname();
  const menuType = pathName?.split("/")[2] as "food" | "beverage";
  const headerType =
    (pathName?.split("/")[3] as string) ||
    (menuType === "food" ? "appetizer" : "no-alcohol");

  const activeHeaderElement = useRef<HTMLDivElement>(null);

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

    return () => {
      if (activeHeaderElement.current) {
        activeHeaderElement.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  const sortedMenuData = api?.data ? [...api?.data] : [];
  sortedMenuData?.sort((a, b) => +a.order - +b.order);

  const currentIndex =
    api?.data?.findIndex((v) => {
      return headerType.toLowerCase() === v.slug.toLowerCase();
    }) || 0;

  const t = useTranslations("Home");
  return api?.isLoading ? (
    <Loading />
  ) : !isEmpty(sortedMenuData) ? (
    <div className="relative overflow-visible flex flex-col min-h-[calc(100vh-110px)]">
      {/* IMAGE  */}
      <div
        style={{
          backgroundImage:
            sortedMenuData?.[currentIndex]?.image &&
            `url('${sortedMenuData[currentIndex]?.image}')`,
        }}
        className={`w-screen   uppercase text-4xl h-56  relative after:absolute after:w-full after:h-full after:bg-black after:inset-0 after:opacity-80 after:z-40 ${`bg-no-repeat bg-contain bg-center`}`}
      >
        <div className="absolute z-50  flex justify-center items-center w-full h-full flex-col gap-2">
          <Link
            href="/"
            className="bg-black px-2 py-2.5 border-[0.5px] border-[#878787a6] rounded-sm text-xl"
          >
            x
          </Link>
          <p className={`uppercase ${gideon.className}`}>
            {menuType === "food" ? t("food") : t("beverage")}
          </p>
        </div>
      </div>
      {/* NAV HEADER */}
      <div className=" sticky  top-0">
        <div
          ref={activeHeaderElement}
          className={`flex flex-row bg-black gap-4 w-screen overflow-x-scroll px-8 ${
            menuType === "beverage" ? "justify-center" : "justify-start"
          }`}
        >
          {sortedMenuData?.map((v) => (
            <MenuHeader menuType={menuType} item={v} key={v._id} />
          ))}
        </div>
      </div>

      {/* CONTENT */}
      {/* {sortedMenuData?.[currentIndex]?.children?.map((v, id) => (
          <MenuChild item={v} key={id} headerId={sortedMenuData[currentIndex]._id} />
        ))} */}
      <div className="flex-grow basis-auto flex flex-col">
        <MenuChild headerId={sortedMenuData?.[currentIndex]?._id!} />
      </div>
    </div>
  ) : (
    <div>No data</div>
  );
};

export default MenuMain;
