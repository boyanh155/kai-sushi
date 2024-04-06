"use client";
import React from "react";
import { NavHeader } from "../../../types/NavbarType";

// import Link from "next/link";
import { Link, usePathname } from "@/navigation";
type Props = {
  item: NavHeader;

  menuType: "food" | "beverage";
};

const MenuHeader = ({ item, menuType }: Props) => {
  const pathName = usePathname();

  return (
    <Link href={`/${menuType}/${item.slug}` as any}>
      <div
        className={`${
          pathName?.split("/")?.[2]?.toLocaleLowerCase() === item?.slug?.toLowerCase()
            ? "text-white"
            : "text-[#959595]"
        } py-2  pe-8 min-w-16 cursor-pointer text-nowrap whitespace-nowrap hover:text-white transition-all duration-300 ease-in-out`}
      >
        {item.title}
      </div>
    </Link>
  );
};

export default MenuHeader;
