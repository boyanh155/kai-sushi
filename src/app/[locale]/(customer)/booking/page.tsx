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
    <div className="flex flex-col content-container">
      {/* IMAGE */}
      <div className="w-[100px] h-[100px]">
        <Image src={logoSquare} className="w-full h-auto" alt="Kai logo" />
      </div>
      <h2 className={`text-white uppercase text-3xl ${gideon.className}`}>
        {t("booking")}
      </h2>
      {/* Button group */}
      <div className="flex flex-col mt-16">
        {/* Adult */}
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="EUR"
          className="border-[0.4px] border-[#959595]"
          helperText="Please select your currency"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </div>
  );
};

export default BookingPage;
