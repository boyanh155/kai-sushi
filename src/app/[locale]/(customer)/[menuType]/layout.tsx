import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    menuType: string;
  };
  children: React.ReactNode;
};

const LayoutPage = ({ children, params: { menuType } }: Props) => {
  if (!(menuType === "food" || menuType === "beverage" || menuType === "both"))
    return notFound();

  return children;
};

export default LayoutPage;
