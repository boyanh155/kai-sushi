"use client";
import { usePathname } from "@/navigation";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const BasketLayout = ({ children }: Props) => {
  const pathName = usePathname();
  const progress = {
    success: 100,
    checkout: 33.33,
    "user-info": 66.66,
    undefined: 0,
  };
  useEffect(() => {
    const contentWrapper = document.querySelector("#content_wrapper");
    const mainWrapper = document.querySelector("#main_wrapper");
    if (!contentWrapper || !mainWrapper) return;

    contentWrapper.classList.remove("before:opacity-90");
    contentWrapper.classList.add("z-[40]");
    mainWrapper.classList.remove("pb-[101px]");
    return () => {
      contentWrapper.classList.add("before:opacity-90");
      contentWrapper.classList.remove("z-[40]");
      mainWrapper.classList.add("pb-[101px]");
    };
  }, []);
  return (
    <div className="flex flex-col w-full pt-14 gap-8 px-[30px]">
      {/* Step bar */}
      <div className="w-full flex justify-start  ">
        <div className="h-[0.5rem] bg-[#959595] rounded-[5px] w-full">
          <div
            className={`h-full bg-[#FEFEFE] rounded-[5px] transition-all`}
            style={{
              width: `${progress[pathName.split("/")[2]]}%`,
            }}
          ></div>
        </div>
      </div>
      <div className=" ">{children}</div>
    </div>
  );
};

export default BasketLayout;
