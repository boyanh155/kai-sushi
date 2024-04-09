"use client";

import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  children: React.ReactNode;
  isShow: boolean;
  setIsShow: (value: boolean) => void;
};

const Toast = ({ children, isShow, setIsShow }: Props) => {
  const t = useTranslations("Booking");
  const toastRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (toastRef.current && !toastRef.current.contains(event.target)) {
        setIsShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsShow(false);
    }, 3000);
  }, []);
  return (
    isShow && (
      <div className="toast toast-center mb-24 z-[99999999]" ref={toastRef}>
        <div className="p-4 border-[1.5px] bg-[#8C773E] text-white rounded-sm flex flex-col w-full justify-center items-center border-white gap-2">
          <p className="text-base font-light text-center">{children}</p>
          <p className="text-xs font-light text-center">
            ({t("click_outside")})
          </p>
        </div>
      </div>
    )
  );
};

export default Toast;
