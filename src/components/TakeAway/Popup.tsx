'use client'

import useTakeAwayStore, {
  selectCategoryData,
  selectIsOpenCategory,
  toggleIsOpenCategory,
} from "@/stores/useTakeAwayStore";
import React from "react";

const Popup = () => {
  const isOpen = useTakeAwayStore(selectIsOpenCategory);
  const toggleIsOpen = useTakeAwayStore(toggleIsOpenCategory);
  const category = useTakeAwayStore(selectCategoryData);
  return (
    <>
      {isOpen && (
        <div
          onClick={toggleIsOpen}
          className=" before:block before:fixed before:z-[30] before:top-0 before:left-0 before:w-screen before:h-screen before:bg-black before:opacity-60"
        ></div>
      )}
      <ul
        tabIndex={0}
        className="w-full bg-[#8C773E] flex flex-col px-7 text-sm font-bold uppercase text-white transition-all duration-50 left-0 right-0 fixed rounded-t-xl z-[100] py-3 h-40 overflow-x-hidden overflow-y-scroll "
        style={{
          bottom: isOpen ? "0" : "-100%",
        }}
      >
        {category.map((v, key) => (
          <li
            key={key}
            className=" last:!border-b-0 text-sm py-4 border-b-[0.5px] border-white w-full text-left"
          >
            {v}
          </li>
        ))}
      </ul>
      ;
    </>
  );
};

export default Popup;
