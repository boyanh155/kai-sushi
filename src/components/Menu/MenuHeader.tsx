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
          isActive ? "active text-white text-base " : "text-[#959595] "
        }  min-w-16  py-5 cursor-pointer text-nowrap whitespace-nowrap ps-4 pe-6 transition-all duration-300 ease-in-out`}
      >
        {item.title}
      </div>
    </Link>
  );
};

export default MenuHeader;
