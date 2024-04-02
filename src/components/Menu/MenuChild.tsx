import React from "react";
import { NavChild, NavChildType } from "../../../types/NavbarType";

type Props = {
  item?: NavChild;
};

const MenuChild = ({ item }: Props) => {
  return (
    item?.type === NavChildType.Body && (
      <div className="flex flex-col text-base font-medium">
        {/* BODY */}
        <div className="flex flex-col gap-1 mb-5 mt-4 items-center">
          <p className="golden-title uppercase text-center">{item.title}</p>
          <p className=" text-xs text-[#FEFEFECC] text-center font-light">
            {item.description}
          </p>
        </div>
        {/* CONTENT */}
        <div className="">
          {item.children?.map((v, id) => (
            <div
              key={id}
              className="flex-col mt-4 pt-4 px-2 pb-8  border-[0.4px] border-[#959595] rounded-sm"
            >
              <div className="flex flex-row justify-between text-white  uppercase">
                <p className="font-light w-2/3">{v.title}</p>
                <p className="font-light">{v.price}</p>
              </div>
              <p className="text-[#FEFEFECC] mt-2 opacity-80 text-xs w-60 font-light">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default MenuChild;
