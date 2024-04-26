import { formatVND } from "@/libs/format";
import { useRouter } from "@/navigation";
import useCartStore, { selectCartInfo } from "@/stores/useCartStore";
import React from "react";

const CartInfo = () => {
  const cart = useCartStore(selectCartInfo);
  const router = useRouter();
  const handlerNavigateToBasket = () => {
    if (cart.items.length > 0) {
      router.push("/basket/checkout");
    }
  };
  return (
    <div
      className={`bg-golden-1  fixed  ${
        cart.items.length > 0 ? "flex" : "hidden"
        // cart.items.length > 0 ? "bottom-28 " : " -bottom-12"
      } 
      
      py-2 cursor-pointer flex-row justify-between bottom-28  rounded-lg  px-5 text-white z-30 right-0 left-0 mx-5`}
      onClick={handlerNavigateToBasket}
    >
      <div className="flex flex-row items-center gap-2">
        <span className="text-base font-bold">Basket</span>
        <span className="text-base font-normal">•</span>
        <span className="text-base font-normal">{cart.totalQuantity}</span>
      </div>
      <div className="font-bold text-base">
        {formatVND(cart.totalPrice * 1000)}
      </div>
    </div>
  );
};

export default CartInfo;
