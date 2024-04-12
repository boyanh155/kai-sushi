"use client";

import Loading from "@/components/shared/Loading";
import { useGetMenu } from "@/hooks/api/useMenuApi";
import React from "react";

import { useRouter } from "@/navigation";
type Props = {
  params: {
    menuType: string;
  };
};

const MenuPage = ({ params: { menuType } }: Props) => {
  const api = useGetMenu(menuType as any);
  console.log(menuType)
  const router = useRouter();
  if (api?.isLoading) return <Loading />;
  if (api?.data)
    return router.push(("/" + menuType + "/" + api.data[0].slug) as any);
};

export default MenuPage;
