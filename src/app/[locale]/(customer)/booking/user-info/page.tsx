import BackwardButton from "@/components/Booking/BackwardButton";
import { gideon } from "@/libs/GoogleFont";
import { useTranslations } from "next-intl";
import React from "react";

type Props = {};

const UserInfoPage = (props: Props) => {
  const t = useTranslations("Booking");
  return (
    <>
      <div className="flex absolute top-16 left-8">
        <BackwardButton />
      </div>
      <h2 className={`pt-32 text-white uppercase text-3xl ${gideon.className}`}>
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
        {/* Email */}
        <div className="input-float mt-11">
          <input
            id="email"
            name="email"
            type="text"
            className=""
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
            {t("is_sms_notify")}
          </label>
        </div>{" "}
        {/* CONFIRM  */}
        <div className="mt-16 cursor-pointer w-full bg-[#8C773E99] text-white font-light text-base uppercase py-3 text-center">
          {t("complete")}
        </div>
      </div>
    </>
  );
};

export default UserInfoPage;
