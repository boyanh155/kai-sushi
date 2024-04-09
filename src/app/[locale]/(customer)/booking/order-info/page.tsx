"use client";

import { useRouter } from "@/navigation";
import useBookingStore, {
  selectBookingState,
  setBookingState,
} from "@/stores/useBookingStore";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import logoSquare from "@/public/logo.svg";
import { gideon, nunito } from "@/libs/GoogleFont";
import { optionsAmount } from "./optionAmount";
import { IBookingClient } from "../../../../../../types/Booking";
import moment from "moment";

const OrderInfoPage = () => {
  const router = useRouter();
  const bookingState = useBookingStore(selectBookingState);
  const [isOpen, setIsOpen] = useState(false);
  const _setBookingState = useBookingStore(setBookingState);
  const selectedE = useRef<HTMLLIElement>(null);
  const [isInvalid, setIsInvalid] = useState(false);

  const t = useTranslations("Booking");
  const _now = moment(bookingState.bookDate);

  // TIME
  const _nowTime = _now.format("HH:mm");
  const maxTime = "22:00";
  const minTime = moment(Date.now()).isBetween(
    moment("16:00", "HH:mm"),
    moment(maxTime, "HH:mm")
  )
    ? moment(Date.now()).format("HH:mm")
    : "16:00";
  console.log(moment(Date.now()).format("HH:mm"));
  console.log(
    moment(Date.now()).isBetween(
      moment("16:00", "HH:mm"),
      moment(maxTime, "HH:mm")
    )
  );

  // save time
  const [selectedTime, setSelectedTime] = useState(minTime);
  // submit form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (isInvalid) return;

    router.push("/booking/user-info");
  };
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

  const minDate = moment(Date.now()).isBefore(moment(maxTime, "HH:mm"))
    ? _now.format("YYYY-MM-DD")
    : moment().clone().add(1, "days").format("YYYY-MM-DD");
  const maxDate = moment(minDate, "YYYY-MM-DD")
    .clone()
    .add(3, "weeks")
    .format("YYYY-MM-DD");

  const [selectedDate, setSelectedDate] = useState(minDate);

  useEffect(() => {
    //  change booking info date
    if (
      (selectedTime < minTime || selectedTime > maxTime) &&
      !moment(selectedDate).isAfter(_now, "day")
    ) {
      setIsInvalid(true);
      return;
    } else {
      setIsInvalid(false);
    }
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
        <div className="w-[60px] h-[60px] mt-8">
          <Image src={logoSquare} className="w-full h-auto" alt="Kai logo" />
        </div>
        <h2
          className={` text-white uppercase text-3xl mt-3 ${gideon.className}`}
        >
          {t("booking")}
        </h2>
      </div>
      {/* INPUT BOX */}
      <form className=" flex flex-col justify-center  mt-10" id="form-order">
        {/* AMOUNT SELECTION */}
        <div className="dropdown select-float w-full ">
          <div
            tabIndex={0}
            role="button"
            className=" relative input-golden flex justify-between items-center w-full"
            onClick={(_) => {
              setIsOpen(!isOpen);
              selectedE?.current?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
              });
            }}
          >
            <label className="!text-xs float-label text-nowrap whitespace-nowrap no -top-3.5 left-2">
              {t("adult")}
            </label>
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
            style={{
              display: isOpen ? "block" : "none",
            }}
            className=" dropdown-content z-[1] flex flex-col w-full p-0 h-64 overflow-y-scroll overflow-x-hidden border border-s-golden border-t-0 border-b-golden border-e-golden"
          >
            {optionsAmount.map((option) => (
              <li
                ref={bookingState.amount === option.value ? selectedE : null}
                onClick={(e) => {
                  handleInput(e, "amount");
                  setIsOpen(false);
                }}
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
            className={
              "filled " +
              " !text-white " +
              nunito.className +
              (isInvalid ? " input-error" : "")
            }
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
            className={
              "filled " +
              " !text-white " +
              (isInvalid ? "input-error " : " ") +
              nunito.className
            }
            onChange={(e) => {
              const value = e.target.value;

              setSelectedTime(value);
            }}
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
            className={`filled  !text-white resize-none  placeholder:!text-[#959595]`}
            placeholder={t("note_placeholder")}
          ></textarea>
          <label
            htmlFor="note"
            id="labelNote"
            className="text-nowrap whitespace-nowrap capitalize"
          >
            {t("note")}
          </label>
        </div>
        {/* NEXT BUTTON */}
        <div className="w-full flex justify-end hover:opacity-60 transition-all mt-4">
          <button
            onClick={handleSubmitForm}
            type="submit"
            form="form-order"
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
