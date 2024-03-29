"use client";
import BackwardButton from "@/components/Booking/BackwardButton";
import { gideon } from "@/libs/GoogleFont";
import useBookingStore, {
  selectBookingState,
  setBookingState,
} from "@/stores/useBookingStore";
import { isEmpty, isNumber } from "lodash";
import { useTranslations } from "next-intl";
import React from "react";
import { IBookingClient } from "../../../../../../types/Booking";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {};

const UserInfoPage = (props: Props) => {
  const router = useRouter();
  const t = useTranslations("Booking");
  const bookingState = useBookingStore(selectBookingState);
  const _setBookingState = useBookingStore(setBookingState);

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
  const submitForm = (e) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    if (form.checkValidity()) {
      // handle submit
      console.log(bookingState)
      router.push("success");
    } else {
      form.reportValidity(); 
    }
  };
  return (
    <>
      <Link href="order-info" className="flex absolute top-16 left-8">
        <BackwardButton />
      </Link>
      <h2 className={`pt-32 text-white uppercase text-3xl ${gideon.className}`}>
        {t("booking")}
      </h2>
      {/* Button group */}
      <form
        id="form_user"
        onSubmit={submitForm}
        className="flex flex-col mt-16 w-full "
      >
        {/* Adult */}
        {/* Name */}
        <div className="input-float">
          <input
            id="name"
            type="text"
            name="name"
            onChange={handleInput}
            value={bookingState.name}
            className={`${isEmpty(bookingState.name) ? "" : "filled"}`}
            placeholder="Enter your name"
          />{" "}
          <label htmlFor="name" id="labelName">
            Name
            <p>*</p>
          </label>
        </div>
        {/* Email */}
        <div className="input-float mt-11">
          <input
            id="email"
            type="email"
            name="email"
            onChange={handleInput}
            value={bookingState.email}
            className={`${isEmpty(bookingState.email) ? "" : "filled"}`}
            placeholder="Enter your email"
          />{" "}
          <label htmlFor="name" id="labelName">
            Email
          </label>
        </div>
        {/* Phone */}
        <div className="input-float mt-11">
          <input
            id="phone"
            name="phone"
            type="text"
            onChange={handleInput}
            value={bookingState.phone}
            className={`${isEmpty(bookingState.phone) ? "" : "filled"}`}
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
            {t("is_sms_notify")}
          </label>
        </div>{" "}
        {/* CONFIRM  */}
        <button
          type="submit"
          form="form_user"
          className="mt-16 cursor-pointer w-full bg-[#8C773E99] text-white font-light text-base uppercase py-3 text-center"
        >
          {t("complete")}
        </button>
      </form>
    </>
  );
};

export default UserInfoPage;
