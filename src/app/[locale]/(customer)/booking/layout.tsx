import Image from "next/image";
import React from "react";
import logoSquare from "@/assets/kai-logo-square.svg";
import { useTranslations } from "next-intl";
import { gideon } from "@/libs/GoogleFont";
import { MenuItem, TextField } from "@mui/material";
import BackwardButton from "@/components/Booking/BackwardButton";

type Props = {
  children: React.ReactNode;
};

const BookingLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col relative content-container items-center px-7">
      {/* IMAGE */}
      {/* <div className="w-[100px] h-[100px]">
        <Image src={logoSquare} className="w-full h-auto" alt="Kai logo" />
      </div> */}
      {children}
    </div>
  );
};

export default BookingLayout;
