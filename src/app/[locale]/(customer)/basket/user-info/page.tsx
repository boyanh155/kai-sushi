"use client";

import Alert from "@/components/shared/Alert";
import BackwardButton from "@/components/shared/BackwardButton";
import useApi from "@/hooks/api/useApi";
import { nunito } from "@/libs/GoogleFont";
import { useRouter } from "@/navigation";
import useCartStore, {
  selectCartInfo,
  selectCartUserInfo,
  setCartUserInfo,
  setClearCart,
} from "@/stores/useCartStore";
import { useQueryClient } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import moment from "moment";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

const today = moment().format("YYYY:MM:DD");
const UserInfoPage = () => {
  const _clearCart = useCartStore(setClearCart);
  const cartUserInfo = useCartStore(selectCartUserInfo);
  const cart = useCartStore(selectCartInfo);
  const [isSubmit, setIsSubmit] = React.useState<boolean>(false);
  const [isInvalid, setIsInvalid] = React.useState<boolean>(false);
  const _setCartUserInfo = useCartStore(setCartUserInfo);
  const t = useTranslations("Basket");
  const router = useRouter();
  const handleInput = (e: any, customName?: string, customValue?: any) => {
    const { name = customName, value = customValue } = e.target as {
      name: keyof typeof cartUserInfo;
      value: any;
    };

    if (!name?.toString()) return;
    _setCartUserInfo({ [name]: value } as any);
  };

  const isBetweenTime = moment().isBefore(moment("16:00", "HH:mm"), undefined);
  const minTime = isBetweenTime ? moment().format("HH:mm") : "16:00";
  const maxTime = "22:00";
  const minDate = moment(`${today}-${minTime}`, "YYYY:MM:DD-HH:mm");
  const maxDate = moment(`${today}-${maxTime}`, "YYYY:MM:DD-HH:mm");
  const filterTime = (time: string) => {
    const selectedDate = moment(`${today}-${time}`, "YYYY:MM:DD-HH:mm");

    if (
      selectedDate.isBefore(moment(), undefined) ||
      !selectedDate.isBetween(minDate, maxDate, undefined, "[]")
    ) {
      setIsInvalid(true);

      return;
    }
    setIsInvalid(false);
  };
  useEffect(() => {
    filterTime(cartUserInfo.time);
  }, [cartUserInfo.time]);

  const apiPost = useApi({
    key: ["takeaway", "make"],
    url: "takeaway/make",
    method: "POST",
  }).post;
  const handleSubmit = async () => {
    setIsSubmit(true);
    if (isInvalid || isEmpty(cartUserInfo.name) || isEmpty(cartUserInfo.phone))
      return;

    //
    const _items = [...cart.items].map((v) => ({
      productId: v._id,
      quantity: v.quantity,
    }));
    await apiPost?.mutateAsync({
      phone: cartUserInfo.phone,
      name: cartUserInfo.name,
      items: _items,
      time: cartUserInfo.time,
      note: cartUserInfo.note,
    });

    //
    // router.push("/basket/success");
  };
  const [isAlert, setIsAlert] = React.useState(false);
  React.useEffect(() => {
    console.log(apiPost?.error);
    if (apiPost?.isError) {
      setIsAlert(true);
    }
  }, [apiPost?.isError]);
  const client = useQueryClient();

  useEffect(() => {
    if (apiPost?.isPending || apiPost?.isError || !apiPost?.data) return;

    console.log(apiPost?.data);
    const key = ["takeaway", "payment", apiPost.data?.order?._id];
    client.setQueryDefaults(key, {
      staleTime: 1000 * 60 * 30,
    });
    client.setQueryData(key, apiPost?.data);
    _clearCart();
    router.push({
      pathname: `/basket/success`,
      query: {
        orderId: apiPost.data?.order?._id,
      },
    });
  }, [apiPost?.isPending]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full">
        <BackwardButton onClick={() => router.back()} />
      </div>
      <p className="text-white font-bold mt-9">{t("user_info")}</p>
      {/* ERROR */}
      <Alert
        isVisible={isAlert}
        setIsVisible={setIsAlert}
        color="error"
        className="mt-3"
        messages={(apiPost?.error as any)?.error || "Lỗi không xác định"}
      />
      {/* FORM */}
      <div
        className={`
      ${apiPost?.isPending ? "opacity-0 invisible" : ""}
       flex flex-col gap-12 mt-6`}
      >
        {/* Name */}
        <div className="input-float">
          <input
            id="name"
            type="text"
            name="name"
            required
            onChange={handleInput}
            value={cartUserInfo.name}
            className={`${isEmpty(cartUserInfo.name) ? "" : "filled"} ${
              isSubmit && isEmpty(cartUserInfo.name) ? "input-error" : ""
            }`}
            placeholder="Enter your name"
          />{" "}
          <label htmlFor="name" className="capitalize" id="labelName">
            {t("fullname")}
            <p>*</p>
          </label>
        </div>
        {/* PHONE */}
        <div className="input-float">
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
            value={cartUserInfo.phone}
            className={`${isEmpty(cartUserInfo.phone) ? "" : "filled"} ${
              isSubmit && isEmpty(cartUserInfo.phone) ? "input-error" : ""
            }`}
            placeholder="+84"
          />{" "}
          <label htmlFor="phone" className="capitalize">
            {t("phone")}
            <p>*</p>
          </label>
        </div>
        {/* TIME PICKER */}
        <div className="input-float ">
          <input
            type="time"
            id="timeInput"
            name="time"
            value={cartUserInfo.time}
            className={
              "filled " +
              " !text-white " +
              (isInvalid ? "input-error " : " ") +
              nunito.className
            }
            onChange={(e) => {
              filterTime(e.target.value);
              handleInput(e);
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
      </div>
      {/* NEXT BUTTON */}
      <div className="w-full flex justify-end  mt-4">
        {/* Continue */}
        <button
          onClick={handleSubmit}
          className={`bg-golden-1 mt-4 cursor-pointer hover:opacity-60 transition-all py-2 w-full text-center rounded-[4px] duration-300
          relative ${apiPost?.isPending ? "-top-64" : "top-0"}
          `}
        >
          {apiPost?.isPending ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <span>{t("send_order")}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default UserInfoPage;
