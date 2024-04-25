"use client";
import { usePathname } from "@/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const BasketLayout = ({ children }: Props) => {
  const pathName = usePathname();
  const progress = {
    success: 100,
    checkout: 33.33,
    "user-info": 66.66,
  };
  console.log(pathName.split("/")[2]);

  return (
    <div className=" content-container flex flex-col w-full pt-12 gap-12 px-8">
      {/* Step bar */}
      <div className="w-full flex justify-start ">
        <div className="h-[0.5rem] bg-[#959595] rounded-[5px] w-full">
          <div
            className={`h-full bg-[#FEFEFE] rounded-[5px] transition-all`}
            style={{
              width: `${progress[pathName.split("/")[2]]}%`,
            }}
          ></div>
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default BasketLayout;
