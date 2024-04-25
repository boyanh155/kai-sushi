"use client";

import CloseButton from "@/components/shared/CloseButton";
import { useRouter } from "@/navigation";
import useCartStore, { selectCartInfo } from "@/stores/useCartStore";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

type Props = {};

const CheckoutPage = (props: Props) => {
  const t = useTranslations("Basket");
  const router = useRouter();
  const cart = useCartStore(selectCartInfo);
  useEffect(() => {});
  return (
    <div className="flex flex-col  w-full">
      <div className="w-full">
        <CloseButton href="/take-away" />
      </div>
      <p className="text-base font-bold mt-8 text-white">{t("pickup_label")}</p>
      <p className="text-white opacity-75 font-light mt-2 text-sm ">
        {t("address1")}
      </p>
      <div className="mt-12">
        <div className="flex flex-row justify-between">
          <p className="font-bold text-white">{t("cart_summary")}</p>
          <p className="golden-title">{t("add_item")}</p>
        </div>
        {
          // list
        }
      </div>
      {/* Continue */}
        <button onClick={()=>router.push('/basket/user-info')} className="bg-golden-1 mt-4 cursor-pointer py-2 w-full text-center rounded-[4px]">
          {t("next")}
        </button>
    </div>
  );
};

export default CheckoutPage;
