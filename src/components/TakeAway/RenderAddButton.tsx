'use client'
import useCartStore, { addToCart, removeFromCart, selectCartInfo } from "@/stores/useCartStore";
import React from "react";

const RenderAddButton = ({ child: _item }) => {
  const [isShow, setIsShow] = React.useState(false);
  const cart = useCartStore(selectCartInfo);
  const _addToCart = useCartStore(addToCart);
  const _removeFromCart = useCartStore(removeFromCart);
  const currentItemQuantity = cart.items.find(
    (item) => _item?._id === item._id
  )?.quantity;
  const listRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!listRef.current) return;
    const handleClickOutside = () => {
      setIsShow(false);
    };

    document.addEventListener("scroll", handleClickOutside);
    return () => {
      document.removeEventListener("scroll", handleClickOutside);
    };
  }, [listRef.current]);
  return (
    <div
      ref={listRef}
      onClick={(e) => {
        e.stopPropagation();
        setIsShow(true);
      }}
      onMouseEnter={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
      className={` rounded-full  ${
        currentItemQuantity && currentItemQuantity > 0
          ? `${
              isShow ? "basis-20 " : "basis-6 "
            } bg-[#8C773E] text-white font-light`
          : `basis-6 text-[#8C773E]`
      } h-6 w-6 border-golden-1 border-[1.8px] transition-all flex justify-center items-center`}
    >
      {currentItemQuantity && currentItemQuantity > 0 && isShow && (
        <p
          className="text-xl  font-light px-3"
          onClick={(e) => {
            e.stopPropagation();
            _removeFromCart(_item?._id);
          }}
        >
          -
        </p>
      )}
      {currentItemQuantity}

      {(!currentItemQuantity ||
        (currentItemQuantity && currentItemQuantity > 0 && isShow)) && (
        <p
          className="text-xl px-3  font-light"
          onClick={(e) => {
            e.stopPropagation();
            _addToCart(_item, 1);
          }}
        >
          +
        </p>
      )}
    </div>
  );
};


export default RenderAddButton;