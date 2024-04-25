"use client";
import MenuHeader from "./MenuHeader";
import MenuChild from "./MenuChild";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetMenu } from "@/hooks/api/useMenuApi";
import { isEmpty } from "lodash";
import Loading from "../shared/Loading";
import { gideon } from "@/libs/GoogleFont";
import { Link } from "@/navigation";
import CloseButton from "../shared/CloseButton";

const MenuMain = () => {
  const { menuType: pMenuType, menuHeader: pMenuHeader } = useParams();
  const menuType = Array.isArray(pMenuType) ? pMenuType[0] : pMenuType;
  const menuHeader = Array.isArray(pMenuHeader) ? pMenuHeader[0] : pMenuHeader;
  // const menuType = pathName?.split("/")[2] as "food" | "beverage";
  const headerType =
    menuHeader || (menuType === "food" ? "appetizer" : "no-alcohol");
  // cors force

  const api = useGetMenu(menuType as any);

  // Assuming activeHeaderElement is a reference to a DOM element
  const sortedMenuData = api?.data ? [...api?.data] : [];
  sortedMenuData?.sort((a, b) => +a.order - +b.order);

  const currentIndex =
    sortedMenuData.findIndex((v) => {
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
        <div className="absolute z-50  flex justify-center items-center w-full h-full flex-col gap-10">
          <CloseButton href="/" />
          <p className={`uppercase ${gideon.className}`}>
            {menuType === "food" ? t("food") : t("beverage")}
          </p>
        </div>
      </div>
      {/* NAV HEADER */}
      <div className=" sticky  top-0">
        <div
          className={`flex flex-row bg-black gap-4 w-screen overflow-x-scroll px-8 ${
            menuType === "beverage" ? "justify-center" : "justify-start"
          }`}
        >
          {sortedMenuData?.map((v) => (
            <MenuHeader item={v} key={v._id} />
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
