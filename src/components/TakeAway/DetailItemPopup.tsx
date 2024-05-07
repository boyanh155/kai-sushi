"use client";
import React, { useEffect, useState } from "react";
import useCartStore, {
  removeItemCart,
  selectCurrentDetailItem,
  selectCurrentInCartFRomDetailId,
  setCurrentDetailItem,
  setItemCart,
  setItemNote,
} from "@/stores/useCartStore";
import { isEmpty } from "lodash";
import Image from "next/image";
import CloseButton from "@/components/shared/CloseButton";
import { TypeCartItem } from "../../../types/CartType";
import { useRouter, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";
import { formatVND } from "@/libs/format";

const DetailItemPopup = () => {
  const t = useTranslations("Basket");
  const currentDetailItem = useCartStore(selectCurrentDetailItem);
  const currentInCart = useCartStore(selectCurrentInCartFRomDetailId);
  const _setCurrentDetailItem = useCartStore(setCurrentDetailItem);

  const _setItemCart = useCartStore(setItemCart);
  const _removeItemCart = useCartStore(removeItemCart);
  const _setItemNote = useCartStore(setItemNote);
  const [currentItem, setCurrentItem] = useState<
    TypeCartItem | Partial<TypeCartItem>
  >({
    note: "",
    quantity: 1,
  });
  // current state
  console.log(currentDetailItem);
  console.log(currentInCart);
  console.log(currentItem);
  useEffect(() => {
    if (!currentDetailItem) return;
    if (currentInCart) {
      setCurrentItem({
        ...currentItem,
        ...currentInCart,
      } as any);
    } else {
      setCurrentItem({
        ...currentDetailItem,
        quantity: 1,
        note: "",
      } as any);
    }
  }, [currentInCart, currentDetailItem]);
  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    const handleBackButtonEvent = (e) => {
      e.preventDefault();
      _setCurrentDetailItem(null);
      window.removeEventListener("popstate", handleBackButtonEvent);
    };
    const html = document.querySelector("html");
    if (!currentDetailItem) {
      html?.classList.remove("overflow-hidden");
      window.removeEventListener("popstate", handleBackButtonEvent);
      return;
    } else {
      html?.classList.add("overflow-hidden");
    }
    router.push(pathName);
    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handleBackButtonEvent);

    return () => {
      window.removeEventListener("popstate", handleBackButtonEvent);
    };
  }, [currentDetailItem]);

  const handleInput = (e) => {
    const item = { ...currentItem };
    if (!currentItem?.quantity) item.quantity = 1;
    item.note = e.target.value;
  };
  const handleConfirm = (_) => {
    if (!currentDetailItem) return;
    if (!currentItem.quantity) {
      console.log("yo");
      _removeItemCart(currentDetailItem?._id);
      _setCurrentDetailItem(null);
      return;
    }
    _setItemCart(currentDetailItem, currentItem.quantity);
    _setItemNote(currentItem._id, currentItem.note || "");
    _setCurrentDetailItem(null);
  };

  return (
    currentDetailItem && (
      <div
        className={`fixed top-0 transition-all flex flex-col  bg-black left-0 w-full h-full z-50 items-center`}
      >
        <div
          className={`w-full h-48 relative flex top-0 left-0 after:bg-black after:opacity-80 justify-start items-center after:z-10 after:w-full after:h-full  after:relative after:inset-0`}
        >
          {!isEmpty(currentDetailItem?.image) && (
            <Image
              src={currentDetailItem?.image!}
              fill
              priority
              alt="Hinh do an"
              className={` block object-cover relative w-full z-[5]`}
            />
          )}
          <div className="absolute z-30 flex items-center right-[30px]">
            <CloseButton
              onClick={(e) => {
                e.preventDefault();
                _setCurrentDetailItem(null);
              }}
              href="/take-away"
            />
          </div>
        </div>
        <div className="flex flex-col content-container px-[30px] mt-10">
          {/*  INFO */}
          <div className="text-white flex flex-col gap-3">
            <div className="uppercase font-medium text-base flex justify-between">
              <p className="w-3/4">{currentDetailItem?.name}</p>
              <p className="">{currentDetailItem?.price}</p>
            </div>
            <p className="text-subtle-1 text-sm">
              {currentDetailItem?.description}
            </p>
          </div>
          {/* NOTE */}
          <div className="input-float mt-16 w-full">
            <textarea
              id="note"
              name="note"
              onChange={handleInput}
              onResize={(e) => e.preventDefault()}
              value={currentItem?.note || ""}
              rows={4}
              className={`filled  !text-white resize-none  placeholder:!text-[#959595] placeholder:!text-xs placeholder:font-light`}
              placeholder={t("note_placeholder")}
              maxLength={100}
            ></textarea>
            <label
              htmlFor="note"
              id="labelNote"
              className="text-nowrap whitespace-nowrap capitalize"
            >
              {t("note_label")}
            </label>
          </div>
        </div>
        {/* ADD BUTTON */}
        <div className="w-full flex justify-center mt-10 text-white items-center gap-6">
          <div
            onClick={() => {
              if (!currentItem?.quantity) return;
              setCurrentItem(
                (prev) =>
                  ({
                    ...prev,
                    quantity: prev?.quantity! - 1,
                  } as any)
              );
            }}
            className="bg-golden-1 px-[10px] py-[14px] rounded-[4px] flex items-center justify-center w-8 h-8"
          >
            <p className="w-[12.308px] h-[1.231px] bg-white"></p>
          </div>
          {/* NUMBER */}
          <p className="font-bold text-xl">{currentItem?.quantity}</p>
          <div
            onClick={() => {
              setCurrentItem(
                (prev) =>
                  ({
                    ...prev,
                    quantity: prev?.quantity! + 1,
                  } as any)
              );
            }}
            className="bg-golden-1 px-[10px] py-[14px] rounded-[4px] flex items-center justify-center w-8 h-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <rect
                x="0.846191"
                y="6.38464"
                width="12.3077"
                height="1.23077"
                fill="#FEFEFE"
              />
              <rect
                x="6.38477"
                y="0.84613"
                width="1.23077"
                height="12.3077"
                fill="#FEFEFE"
              />
            </svg>
          </div>
        </div>
        {/* CONFIRM */}
        <div className="w-full  absolute bottom-12 px-[30px]">
          {currentInCart && !currentItem?.quantity! ? (
            <button
              onClick={handleConfirm}
              className="w-full bg-red-600 cursor-pointer rounded py-2 font-bold"
            >
              {t("remove_button")}
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              className="w-full bg-golden-1 cursor-pointer rounded py-2 font-bold"
            >
              {t("save_button")}&nbsp; - &nbsp;
              {formatVND(currentItem?.price! * currentItem?.quantity! * 1000)}
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default DetailItemPopup;
