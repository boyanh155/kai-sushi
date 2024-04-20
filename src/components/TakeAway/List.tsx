"use client";
import useCartStore, {
  addToCart,
  removeFromCart,
  selectCartInfo,
} from "@/stores/useCartStore";
import useTakeAwayStore, {
  selectCategoryHeaderElement,
  selectTakeAwayData,
} from "@/stores/useTakeAwayStore";

import React, { useEffect, useRef } from "react";
import { setCategoryHeaderElement } from "../../stores/useTakeAwayStore";

const List = () => {
  const listTakeAway = useTakeAwayStore(selectTakeAwayData);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const cart = useCartStore(selectCartInfo);

  const _addToCart = useCartStore(addToCart);

  const _removeFromCart = useCartStore(removeFromCart);
  const pCategoryHeader = useTakeAwayStore(selectCategoryHeaderElement);

  const renderAddButton = (id: string) => {
    const currentItemQuantity = cart.items.find(
      (item) => item._id === id
    )?.quantity;
    return (
      <div
        className={` gap-3 rounded-full ${
          currentItemQuantity
            ? "basis-20 bg-[#8C773E] text-white font-light"
            : "basis-6 text-[#8C773E]"
        } h-6 border-golden border-[1.8px] transition-all flex justify-center items-center`}
      >
        {currentItemQuantity && currentItemQuantity > 0 && (
          <p
            className="text-xl  font-light"
            onClick={() => _removeFromCart(id)}
          >
            -
          </p>
        )}
        {currentItemQuantity}

        <p className="text-xl  font-light" onClick={() => _addToCart(id, 1)}>
          +
        </p>
      </div>
    );
  };
  const _ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      const text = itemsRef.current.find((v, index) => {
        if (
          v.getBoundingClientRect().top < 62 &&
          itemsRef.current[index +1].getBoundingClientRect().top > 62
        ) {
          console.log(v.getBoundingClientRect().top, v.textContent);
        }
        return (
          v.getBoundingClientRect().top < 62 &&
          itemsRef.current[index +1].getBoundingClientRect().top > 62
        );
      })?.textContent;
      console.log(text);
      if (text && pCategoryHeader) {
        pCategoryHeader.textContent = text;
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [itemsRef.current, pCategoryHeader]);
  return (
    <div className="flex flex-col px-7" ref={_ref}>
      {listTakeAway.length > 0 ? (
        listTakeAway.map((v, id) => {
          return (
            <div key={id} className="flex flex-col gap-2">
              {/* CATE */}
              <div
                ref={(el) => {
                  itemsRef.current[id] = el!;
                  itemsRef.current = [...itemsRef.current];
                }}
                className="text-category-fixed text-base font-extrabold golden-title uppercase"
              >
                {v.category}
              </div>
              {/*  CHILDREN */}
              {v.children &&
                v.children.map((child, childIndex) => (
                  <div
                    key={childIndex}
                    className="flex flex-row gap-1 text-white items-end justify-between"
                  >
                    {/* content */}
                    <div className="flex flex-col gap-1 py-3 basis-9/12">
                      <div className="text-base font-light uppercase">
                        {child.name}
                      </div>
                      <div className="text-xs font-light text-[#959595]">
                        {child.description}
                      </div>
                      <div className="font-medium text-base">{child.price}</div>
                    </div>
                    {/* add button */}
                    <div className="py-6 flex-grow flex justify-end">
                      {renderAddButton(child._id)}
                    </div>
                  </div>
                ))}
            </div>
          );
        })
      ) : (
        <div>No data</div>
      )}
    </div>
  );
};

export default List;
