"use client";
import BackwardButton from "@/components/Booking/BackwardButton";
import { gideon } from "@/libs/GoogleFont";
import useBookingStore, {
  selectBookingState,
  setBookingState,
} from "@/stores/useBookingStore";
import { isEmpty, isError, isFinite, set } from "lodash";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { IBookingClient } from "../../../../../../types/Booking";
import Link from "next/link";

import useApi from "@/hooks/api/useApi";
import Loading from "@/components/shared/Loading";
import Alert from "@/components/shared/Alert";
import { useRouter } from "@/navigation";

type Props = {};

const UserInfoPage = (props: Props) => {
  const router = useRouter();
  const t = useTranslations("Booking");
  const bookingState = useBookingStore(selectBookingState);
  const _setBookingState = useBookingStore(setBookingState);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const api = useApi({
    key: ["booking"],
    method: "POST",
    url: "booking",
  }).post;

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
    try {
      setIsLoading(true);
      e.preventDefault();
      setIsSubmit(true);
      const form = e.target as HTMLFormElement;
      if (form.checkValidity()) {
        // handle booking api
        api?.mutateAsync(bookingState);

        // router.push("success");
      } else {
        form.reportValidity();
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!api?.isSuccess || isEmpty(api?.data)) return;
    setIsLoading(true);
    router.push(api.data);
  }, [api?.isSuccess]);
  useEffect(() => {
    if (
      api?.isError &&
      (
        api?.error as unknown as {
          status: number;
          message: string;
          error: string | string[];
        }
      )?.error
    ) {
      setIsShowAlert(true);
    }
  }, [api?.isError]);
  useEffect(() => {
    if (api?.isPending) {
      setIsLoading(true);
      return;
    }
    if(api?.isError || api?.isSuccess){

      setIsLoading(false);
    }
    return;
  }, [api?.isPending]);

  return api?.isPending || isLoading ? (
    <Loading />
  ) : (
    <>
      <Link href="/booking/order-info" className="flex absolute top-16 left-8">
        <BackwardButton />
      </Link>
      <h2
        className={`pt-32 text-center text-white uppercase text-3xl ${gideon.className}`}
      >
        {t("booking")}
      </h2>
      <Alert
        color="error"
        isVisible={isShowAlert}
        setIsVisible={setIsShowAlert}
        className="mt-3"
        messages={
          (
            api?.error as unknown as {
              status: number;
              message: string;
              error: string | string[];
            }
          )?.error || "Lỗi không xác định"
        }
      />
      {/* Button group */}
      <form
        id="form_user"
        onSubmit={submitForm}
        className="flex flex-col mt-10 w-full "
      >
        {/* Adult */}
        {/* Name */}
        <div className="input-float">
          <input
            id="name"
            type="text"
            name="name"
            required
            onChange={handleInput}
            value={bookingState.name}
            className={`${isEmpty(bookingState.name) ? "" : "filled"} ${
              isSubmit && isEmpty(bookingState.name) ? "input-error" : ""
            }`}
            placeholder="Enter your name"
          />{" "}
          <label htmlFor="name" className="capitalize" id="labelName">
            {t("fullname")}
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
          <label htmlFor="email" className="capitalize">
            {t("email")}
          </label>
        </div>
        {/* Phone */}
        <div className="input-float mt-11">
          <input
            id="phone"
            name="phone"
            required
            type="text"
            onChange={(e) => {
              if (!isFinite(Number(e.target.value))) {
                e.target.classList.add("input-error");
                return;
              }
              e.target.classList.remove("input-error");
              handleInput(e);
            }}
            value={bookingState.phone}
            className={`${isEmpty(bookingState.phone) ? "" : "filled"} ${
              isSubmit && isEmpty(bookingState.phone) ? "input-error" : ""
            }`}
            placeholder="+84"
          />{" "}
          <label htmlFor="phone" className="capitalize">
            {t("phone")}
            <p>*</p>
          </label>
        </div>
        {/* Is notify */}
        <div className="mt-3 flex items-center">
          <input
            id="isNotify"
            name="isNotify"
            type="checkbox"
            checked={bookingState.isNotify}
            onChange={(e) => {
              _setBookingState({
                ...bookingState,
                isNotify: e.target.checked,
              });
            }}
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
