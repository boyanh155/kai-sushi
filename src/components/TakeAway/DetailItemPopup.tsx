"use client";
import React, { useEffect } from "react";
import useCartStore, {
  addToCart,
  removeFromCart,
  selectCartInfo,
  selectCurrentDetailItem,
  setCurrentDetailItem,
  setItemNote,
} from "@/stores/useCartStore";
import { isEmpty } from "lodash";
import Image from "next/image";
import CloseButton from "@/components/shared/CloseButton";
import RenderAddButton from "./RenderAddButton";
import { TypeCartItem } from "../../../types/CartType";
import { useRouter, usePathname } from "@/navigation";

const DetailItemPopup = () => {
  const currentDetailItem = useCartStore(selectCurrentDetailItem);
  const cart = useCartStore(selectCartInfo);
  const _setCurrentDetailItem = useCartStore(setCurrentDetailItem);

  const [currentItemInCart, setCurrentItemInCart] =
    React.useState<TypeCartItem | null>(null);
  const _addToCart = useCartStore(addToCart);
  const _removeFromCart = useCartStore(removeFromCart);
  const _setItemNote = useCartStore(setItemNote);

  useEffect(() => {
    if (cart.items.length === 0) return;
    const item = cart.items.find((item) => item._id === currentDetailItem?._id);
    if (item) setCurrentItemInCart(item);
  }, [currentDetailItem]);
  console.log("currentDetailItem", currentDetailItem);
  const router = useRouter();
  const pathName = usePathname();
  useEffect(() => {
    const handleBackButtonEvent = (e) => {
      e.preventDefault();
      _setCurrentDetailItem(null);
      window.removeEventListener("popstate", handleBackButtonEvent);
    };
    if (!currentDetailItem) {
      window.removeEventListener("popstate", handleBackButtonEvent);
      return;
    }
    router.push(pathName);
    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", handleBackButtonEvent);

    return () => {
      window.removeEventListener("popstate", handleBackButtonEvent);
    };
  }, [currentDetailItem]);
  return (
    currentDetailItem && (
      <div
        className={`fixed top-0 transition-all flex flex-col  bg-black left-0 w-full h-full z-50 `}
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
          <div className="absolute z-30 flex items-center left-[30px]">
            <CloseButton
              onClick={(e) => {
                e.preventDefault();
                _setCurrentDetailItem(null);
              }}
              href="/take-away"
            />
          </div>
        </div>
        123123123123123123
        <RenderAddButton child={currentDetailItem} />
      </div>
    )
  );
};

export default DetailItemPopup;
