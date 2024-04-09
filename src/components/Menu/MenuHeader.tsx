"use client";

import { NavHeader } from "../../../types/NavbarType";

// import Link from "next/link";
import { Link, usePathname } from "@/navigation";
type Props = {
  item: NavHeader;
  menuType: "food" | "beverage";
};

const MenuHeader = ({ item, menuType }: Props) => {
  const pathName = usePathname();
  console.log("pathName", pathName)
  const isActive =
    (
      pathName.split("/")[2] ||
      (menuType === "food" ? "appetizer" : "no-alcohol")
    )?.toLowerCase() === `${item.slug}`.toLowerCase();

  return (
    <Link href={`/${menuType}/${item.slug}` as any}>
      <div
        className={`${
          isActive ? "active text-white" : "text-[#959595]"
        } py-5 pe-6 min-w-16 ps-4 cursor-pointer text-nowrap whitespace-nowrap transition-all duration-300 ease-in-out`}
      >
        {item.title}
      </div>
    </Link>
  );
};

export default MenuHeader;
