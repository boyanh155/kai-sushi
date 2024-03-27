import Image from "next/image";
import React from "react";
import logoSquare from "@/assets/kai-logo-square.svg";
import { useTranslations } from "next-intl";
import { gideon } from "@/libs/GoogleFont";
import { MenuItem, TextField } from "@mui/material";

type Props = {};
const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

const BookingPage = (props: Props) => {
  const t = useTranslations("Booking");
  return (
    <div className="flex flex-col content-container items-center px-7">
      {/* IMAGE */}
      <div className="w-[100px] h-[100px]">
        <Image src={logoSquare} className="w-full h-auto" alt="Kai logo" />
      </div>
      <h2 className={`text-white uppercase text-3xl ${gideon.className}`}>
        {t("booking")}
      </h2>
      {/* Button group */}
      <div className="flex flex-col mt-16 w-full ">
        {/* Adult */}
        {/* Name */}
        <div className="input-float">
          <input
            id="name"
            name="name"
            type="text"
            className=""
            placeholder="Enter your name"
          />{" "}
          <label htmlFor="name" id="labelName">
            Name
            <p>*</p>
          </label>
        </div>
        {/* Phone */}
        <div className="input-float mt-11">
          <input
            id="phone"
            name="phone"
            type="text"
            className=""
            placeholder="+84"
          />{" "}
          <label htmlFor="name" id="labelName">
            Phone
            <p>*</p>
          </label>
        </div>
        {/* Is notify */}
        <div className="mt-3 flex items-center">
          <input
            id="isNotify"
            name="isNotify"
            type="checkbox"
            defaultChecked
            className="checkbox w-3 h-3 border-white [--chkbg:theme(colors.indigo.600)]  border-[0.4px] rounded-sm"
          />
          <label htmlFor="isNotify" className=" ms-2  font-light text-sm">
            Thông báo tôi qua tin nhắn?
          </label>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
