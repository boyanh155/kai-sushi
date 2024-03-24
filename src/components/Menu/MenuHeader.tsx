"use client";
import React from "react";
import { NavHeader } from "../../../types/NavbarType";
import { useLocale } from "next-intl";
import Link from "next/link";

type Props = {
  item: NavHeader;
  active: boolean;
  menuType: "food" | "beverage";
};

const MenuHeader = ({ item, active, menuType }: Props) => {
  const locale = useLocale();
  return (
    <Link href={`/${locale}/${menuType}/${item.slug}`}>
      <div
        className={`${
          active ? "text-white" : "text-[#959595]"
        } py-2 px-4 cursor-pointer hover:text-white transition-all duration-300 ease-in-out capitalize`}
      >
        {item.title}
      </div>
    </Link>
  );
};

export default MenuHeader;
