"use client";

import CloseButton from "@/components/shared/CloseButton";
import { useRouter } from "@/navigation";
import useCartStore, { selectCartInfo } from "@/stores/useCartStore";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { formatVND } from "../../../../../libs/format";

const CheckoutPage = () => {
  const t = useTranslations("Basket");
  const router = useRouter();
  const cart = useCartStore(selectCartInfo);
  {
    console.log(cart.items);
  }
  // useEffect(() => {});
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
        {/* LIST */}
        <div className="flex flex-col gap-6 text-white mt-8">
          {cart.items.length === 0 ? (
            <div>No data</div>
          ) : (
            cart.items.map((item, key) => (
              <div key={key} className="flex flex-row gap-5">
                {/* QUANTITY */}
                <div>
                  <p className="text-sm p-[4px_6px] border-[#ffffff96] border-[0.4px]">
                    {item.quantity}x
                  </p>
                </div>
                {/* INFO */}
                <div className="flex flex-row flex-grow justify-between">
                  <div className=" flex flex-col max-w-40">
                    <p className="text-base overflow-ellipsis line-clamp-2 lowercase">{item.name}</p>
                    <p className="text-[#959595] text-xs">{t("edit_button")}</p>
                  </div>
                  {/* PRICE */}
                  <div className="flex">{formatVND(item.price * 1000)}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Continue */}
      <button
        onClick={() => router.push("/basket/user-info")}
        className="bg-golden-1 mt-4 cursor-pointer py-2 w-full text-center rounded-[4px]"
      >
        {t("next")}
      </button>
    </div>
  );
};

export default CheckoutPage;
