import { formatVND } from "@/libs/format";
import useCartStore, { selectCartInfo } from "@/stores/useCartStore";
import React from "react";

const CartInfo = () => {
  const cart = useCartStore(selectCartInfo);

  return (
    cart.items.length > 0 && (
      <div className="bg-golden-1  fixed bottom-28 py-2 flex flex-row justify-between rounded-lg  px-5 text-white z-30 right-0 left-0 mx-5">
        <div className="flex flex-row items-center gap-2">
          <span className="text-base font-bold">Basket</span>
          <span className="text-base font-normal">•</span>
          <span className="text-base font-normal">{cart.totalQuantity}</span>
        </div>
        <div className="font-bold text-base">{formatVND(cart.totalPrice)}</div>
      </div>
    )
  );
};

export default CartInfo;
