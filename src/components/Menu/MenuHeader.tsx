import React from "react";
import { NavHeader } from "../../../types/NavbarType";
import Link from "next/link";

type Props = {
  item: NavHeader;
  active: boolean;
};

const MenuHeader = ({ item, active }: Props) => {
  return (
    <Link href={`${item.slug}`}>
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
