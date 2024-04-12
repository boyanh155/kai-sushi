"use client";

import { useParams } from "next/navigation";
import { NavHeader } from "../../../types/NavbarType";

// import Link from "next/link";
import { Link } from "@/navigation";
import { useEffect, useRef } from "react";
type Props = {
  item: NavHeader;
};

const MenuHeader = ({ item }: Props) => {
  const params = useParams();
  const activedRef = useRef<HTMLDivElement>(null);
  const { menuType: pMenuType, menuHeader: pMenuHeader } = params;
  const menuTypeParam = Array.isArray(pMenuType) ? pMenuType[0] : pMenuType;
  const menuHeaderParam = Array.isArray(pMenuHeader)
    ? pMenuHeader[0]
    : pMenuHeader;
  const isActive =
    (
      menuHeaderParam || (menuTypeParam === "food" ? "appetizer" : "no-alcohol")
    )?.toLowerCase() === `${item.slug}`.toLowerCase();
  useEffect(() => {
    if (isActive && activedRef.current) {
      activedRef.current.scrollIntoView({
        // behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [activedRef.current]);
  return (
    <Link href={`/${menuTypeParam}/${item.slug}` as any}>
      <div
        ref={isActive ? activedRef : null}
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
