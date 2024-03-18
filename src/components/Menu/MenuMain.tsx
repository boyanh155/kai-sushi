"use client";

import React, { useEffect, useMemo, useState } from "react";
import { beverageData, menuData } from "./dummy/menu";
import MenuHeader from "./MenuHeader";
import MenuChild from "./MenuChild";
import { usePathname } from "next/navigation";
type Props = {};

const MenuMain = (props: Props) => {
  const [type, setType] = useState<"food" | "beverage">("food");

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
        className={`w-screen h-56 ${
          (type === "food" ? menuData : beverageData)[currentIndex].image &&
          ` bg-[url('${
            (type === "food" ? menuData : beverageData)[currentIndex].image
          }')] bg-no-repeat bg-cover bg-center`
        }`}
      ></div>
      {/* NAV HEADER */}
      <div className="ps-4">
        <div className="flex flex-row gap-6 w-screen overflow-scroll">
          {(type === "food" ? menuData : beverageData).map((v, id) => (
            <MenuHeader active={currentIndex === id} item={v} key={id} />
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-8">
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
