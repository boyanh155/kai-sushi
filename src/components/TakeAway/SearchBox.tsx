"use client";

import { useTranslations } from "next-intl";
import React from "react";
import type { TypeCategory, TypeTakeAway } from "../../../types/TakeAway";

const takeAwayMenu: TypeTakeAway[] = [
  {
    isTitle: true,
    name: "Burger",
    category: "Burger",
    children: [
      {
        name: "Cheese Burger",
        price: "10",
        children: [],
      },
      {
        name: "Chicken Burger",
        price: "10",
        children: [],
      },
    ],
  },
  {
    isTitle: true,
    name: "Pizza",
    category: "Pizza",
    children: [
      {
        name: "Cheese Pizza",
        price: "10",
        children: [],
      },
      {
        name: "Chicken Pizza",
        children: [],
        price: "10",
      },
    ],
  },
  {
    isTitle: true,
    name: "Pasta",
    category: "Pasta",
    children: [
      {
        name: "Cheese Pasta",
        price: "10",
        children: [],
      },
      {
        price: "10",
        name: "Chicken Pasta",
        children: [],
      },
    ],
  },
];
const category: TypeCategory[] = [
  ...new Set(takeAwayMenu.map((v) => v.category)),
  ...new Set(takeAwayMenu.map((v) => v.category)),
];

const SearchBox = () => {
  const t = useTranslations("TakeAway");
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <div className="w-full flex flex-row capitalize gap-6 text-white">
        {/* Category */}
        <div
          tabIndex={0}
          onClick={() => setIsOpen(!isOpen)}
          className="basis-2/3 rounded-full cursor-pointer bg-[#8C773EBF] ps-5 pe-4 py-2 flex flex-row justify-between"
        >
          <p className="text-sm">{t("category")}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 20 20"
            fill="none"
            className={`transition-all ${isOpen ? "" : "transform rotate-90"}`}
          >
            <path
              d="M9.99994 12.3611L5.47217 7.83335L6.10411 7.20142L9.99994 11.1111L13.9097 7.20142L14.5277 7.83335L9.99994 12.3611Z"
              fill="#FEFEFE"
            />
          </svg>
        </div>
        {/* Drop down content */}

        {/* Search */}
        <div className="flex-grow rounded-full bg-[#8C773EBF] px-5 py-2">
          {t("search")}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="w-full bg-[#8C773E] flex flex-col px-7 text-sm font-bold uppercase text-white transition-all left-0 right-0 fixed rounded-t-xl z-[100] py-4 h-40 overflow-x-hidden overflow-y-scroll"
        style={{
          bottom: isOpen ? "0" : "-100%",
        }}
      >
        {category.map((v, key) => (
          <li
            key={key}
            className=" last:!border-b-0 text-sm py-4 border-b-[0.5px] border-white w-full text-left"
          >
            {v}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchBox;
