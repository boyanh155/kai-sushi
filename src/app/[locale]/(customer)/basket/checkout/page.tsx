"use client";

import CloseButton from "@/components/shared/CloseButton";
import { useRouter } from "@/navigation";
import useCartStore, {
  selectCartInfo,
  selectCartUserInfo,
  setCartUserInfo,
} from "@/stores/useCartStore";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { formatVND } from "../../../../../libs/format";

const CheckoutPage = () => {
  const t = useTranslations("Basket");
  const router = useRouter();
  const cart = useCartStore(selectCartInfo);
  const _setCurrentDetail = useCartStore((state) => state.setCurrentDetailItem);
  const userInfo = useCartStore(selectCartUserInfo);
  const setUserInfo = useCartStore(setCartUserInfo);
  const cartInfo = useCartStore(selectCartInfo);

  // state
  const [isOpenAddress, setIsOpenAddress] = React.useState(false);
  // useEffect(() => {});
  return (
    <div className="flex flex-col  w-full pb-7">
      <div className="w-full">
        <CloseButton href="/take-away" />
      </div>
      <p className="leading-[normal] text-base font-bold mt-7 text-white">
        {t("pickup_label")}
      </p>
      <p
        onClick={() => setIsOpenAddress(!isOpenAddress)}
        className={`leading-[normal] text-white opacity-75 font-light mt-2 text-sm ${
          !isOpenAddress && " overflow-ellipsis line-clamp-1"
        }`}
      >
        {t("address1")}
      </p>
      <div className="mt-8">
        <div className="flex flex-row justify-between">
          <p className="leading-[normal] font-bold text-white">
            {t("cart_summary")}
          </p>
          <p
            onClick={() => router.push("/take-away")}
            className="leading-[normal] golden-title cursor-pointer"
          >
            {t("add_item")}
          </p>
        </div>
        {/* LIST */}
        <div className="flex flex-col gap-6 text-white mt-4 overflow-y-scroll min-h-64 max-h-80">
          {cart.items.length === 0 ? (
            <div>No data</div>
          ) : (
            cart.items.map((item, key) => (
              <div key={key} className="flex flex-row gap-5">
                {/* QUANTITY */}
                <div>
                  <p className="leading-[normal] text-sm p-[4px_6px] border-[#ffffffef] border-[0.4px] font-light rounded-sm">
                    {item.quantity}x
                  </p>
                </div>
                {/* INFO */}
                <div className="flex flex-row flex-grow justify-between">
                  <div className=" flex flex-col max-w-40 gap-2">
                    <div className="flex w-full gap-0.5">
                      <p className="leading-[normal] text-base overflow-ellipsis line-clamp-2">
                        {item.name}
                      </p>
                      {item.note && (
                        <p className="leading-[normal] text-[#959595] text-xs line-clamp-1">
                          {item.note}
                        </p>
                      )}
                    </div>
                    <p
                      onClick={() => _setCurrentDetail(item)}
                      className="text-[#959595] text-xs cursor-pointer"
                    >
                      {t("edit_button")}
                    </p>
                  </div>
                  {/* PRICE */}
                  <div className="flex">{formatVND(item.price * 1000)}</div>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Other note */}
        <div className="input-float w-full mt-8">
          <textarea
            id="note"
            name="note"
            onChange={(e) =>
              setUserInfo({
                note: e.target.value,
              })
            }
            onResize={(e) => e.preventDefault()}
            value={userInfo?.note || ""}
            rows={1}
            className={`filled  !text-white resize-none  placeholder:!text-[#959595] placeholder:!text-xs placeholder:font-light`}
            placeholder={t("other_note_placeholder")}
            maxLength={100}
          ></textarea>
          <label
            htmlFor="note"
            id="labelNote"
            className="text-nowrap whitespace-nowrap capitalize"
          >
            {t("other_note_label")}
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-10">
        {/* Promote */}
        <div className="flex flex-row justify-between">
          <p className="leading-[normal]  font-bold">{t("discount")}</p>
          <p className="leading-[normal]  text-subtle-1 text-sm font-semibold">
            {t("enter_discount")}
          </p>
        </div>
        {/* Total */}
        <div className="flex flex-row justify-between">
          <p className="text-white leading-[normal]">{t("total")}</p>
          <p className="text-white leading-[normal] font-bold">
            {formatVND(cartInfo.totalPrice * 1000)}
          </p>
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
