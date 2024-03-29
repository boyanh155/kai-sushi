"use client";

import { useRouter } from "next/navigation";
import useBookingStore, {
  selectBookingState,
  setBookingState,
} from "@/stores/useBookingStore";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import logoSquare from "@/assets/kai-logo-square.svg";
import { gideon } from "@/libs/GoogleFont";
import { optionsAmount } from "./optionAmount";
import { IBookingClient } from "../../../../../../types/Booking";
import { isNumber } from "lodash";
import moment from "moment";

type Props = {};

const OrderInfoPage = (props: Props) => {
  const router = useRouter();
  const bookingState = useBookingStore(selectBookingState);
  const _setBookingState = useBookingStore(setBookingState);
  const selectedE = useRef<HTMLLIElement>(null);

  const t = useTranslations("Booking");
  const _now = moment();

  // TIME
  const _nowTime = _now.format("HH:mm");
  const maxTime = "22:00";
  const minTime = moment(_nowTime, "HH:mm").isBetween(
    moment("16:00", "HH:mm"),
    moment(maxTime, "HH:mm")
  )
    ? _nowTime
    : "16:00";
  // save time
  const [selectedTime, setSelectedTime] = useState(minTime);

  const handleInput = (
    e: any,
    customName?: keyof IBookingClient,
    customValue?: any
  ) => {
    const { name = customName, value = customValue } = e.target as {
      name: keyof IBookingClient;
      value: any;
    };

    if (!name?.toString()) return;
    _setBookingState({ ...bookingState, [name]: value });
  };
  // save

  const maxDate = _now.clone().add(3, "weeks").format("YYYY-MM-DD");

  const minDate = moment(_nowTime, "HH:mm").isBetween(
    moment("16:00", "HH:mm"),
    moment(maxTime, "HH:mm")
  )
    ? _now.format("YYYY-MM-DD")
    : moment().clone().add(1, "days").format("YYYY-MM-DD");

  const [selectedDate, setSelectedDate] = useState(minDate);
  useEffect(() => {
    //  change booking info date
    _setBookingState({
      ...bookingState,
      bookDate: moment(
        selectedDate + ":" + selectedTime,
        "YYYY-MM-DD:HH:mm"
      ).toDate(),
    });
  }, [selectedDate, selectedTime]);
  return (
    <div className=" w-full">
      {/* IMAGE */}
      <div className="w-full flex flex-col items-center">
        <div className="w-[100px] h-[100px] mt-8">
          <Image src={logoSquare} className="w-full h-auto" alt="Kai logo" />
        </div>
        <h2
          className={` text-white uppercase text-3xl mt-1 ${gideon.className}`}
        >
          {t("booking")}
        </h2>
      </div>
      {/* INPUT BOX */}
      <form className=" flex flex-col justify-center">
        {/* AMOUNT SELECTION */}
        <div className="dropdown select-float w-full ">
          <div
            tabIndex={0}
            role="button"
            className=" relative mt-20 input-golden flex justify-between items-center w-full"
            onClick={(e) => {
              selectedE?.current?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
              });
            }}
          >
            <div className="float-label text-nowrap -top-3.5 left-2">
              {t("adult")}
            </div>
            <p className="uppercase text-white">
              {
                optionsAmount.find(
                  (option) => option.value === bookingState.amount
                )?.label
              }{" "}
              {t("peopleLabel")}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="10"
              viewBox="0 0 15 10"
              fill="none"
            >
              <path d="M1 1.25L7.5 8.75L14.5 1.25" stroke="#959595" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className=" dropdown-content z-[1] flex flex-col w-full p-0 h-64 overflow-y-scroll overflow-x-hidden"
          >
            {optionsAmount.map((option) => (
              <li
                ref={bookingState.amount === option.value ? selectedE : null}
                onClick={(e) => handleInput(e, "amount")}
                key={option.value}
                className={`w-full block uppercase cursor-pointer !text-white ${
                  bookingState.amount === option.value ? "!bg-[#8C773E]" : ""
                }`}
                value={option.value}
              >
                {option.label} {t("peopleLabel")}
              </li>
            ))}
          </ul>
        </div>
        {/* ..AMOUNT SELECTION */}
        {/* DATE PICKER */}
        {/* ..DATE PICKER */}

        <div className="input-float  mt-8">
          <input
            type="date"
            id="dateInput"
            value={selectedDate}
            className={(selectedDate ? "filled" : "") + " !text-white"}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={minDate}
            max={maxDate}
          />
          <label
            className="-top-3.5 left-2 capitalize align-baseline"
            htmlFor="dateInput"
          >
            {t("label_date")}
          </label>
        </div>
        {/* TIME PICKER */}
        <div className="input-float  mt-8">
          <input
            type="time"
            id="timeInput"
            value={selectedTime}
            className={(selectedTime ? "filled" : "") + " !text-white"}
            onChange={(e) => setSelectedTime(e.target.value)}
            step={15 * 60}
            min={minTime}
            max={maxTime}
          />
          <label
            className=" -top-3.5 left-2 capitalize align-baseline"
            htmlFor="timeInput"
          >
            {t("label_time")}
          </label>
        </div>
        {/* Note */}
        <div className="input-float mt-8">
          <textarea
            id="note"
            name="note"
            onChange={handleInput}
            onResize={(e) => e.preventDefault()}
            value={bookingState.note}
            rows={4}
            className={`${
              bookingState.note ? "filled" : ""
            } !text-white resize-none`}
            placeholder="Enter your note"
          ></textarea>
          <label htmlFor="note" id="labelNote" className="!w-14 text-nowrap">
            {t("note")}
          </label>
        </div>
        {/* NEXT BUTTON */}
        <div className="w-full flex justify-end hover:opacity-60 transition-all mt-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              router.push("user-info");
            }}
            className="p-4 font-light text-base text-center transition-all"
          >
            {t("next")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderInfoPage;
