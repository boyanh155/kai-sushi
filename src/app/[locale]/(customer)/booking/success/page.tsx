"use client";
import React from "react";
import { useGetBookingById } from "../../../../../hooks/api/useBooking";
import BackwardButton from "@/components/Booking/BackwardButton";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { gideon } from "@/libs/GoogleFont";
import moment from "moment";


type Props = {
  searchParams: {
    orderId: string;
    [key: string]: string | string[] | undefined;
  };
};

const SuccessPage = ({ searchParams: { orderId } }: Props) => {
  const api = useGetBookingById(orderId);
  const t = useTranslations("Booking");

  return (
    <>
      <Link
        href={`order-info?orderId=${orderId}`}
        className="flex absolute top-16 left-8"
      >
        <BackwardButton />
      </Link>
      <h2 className={`pt-32 text-white uppercase text-3xl ${gideon.className}`}>
        {t("booking")}
      </h2>
      {/* ID */}
      <p className="text-[#959595] font-light mt-6">{orderId}</p>
      <p className="font-light mt-1">{t("success_message")}</p>
      {/* Info card */}
      <div className="flex flex-col gap-2 w-full text-base mt-9 text-white border-golden border px-5 p-4">
        <p className=" capitalize  font-light">{api?.data?.name}</p>
        <div className="flex justify-between">
          <p className="text-nowrap flex items-center justify-center gap-2  font-light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="11"
              viewBox="0 0 12 11"
              fill="none"
            >
              <path
                d="M6.49579 6C7.32421 6 7.99579 6.67157 7.99579 7.5L7.995 8.24837C8.09788 10.0849 6.68334 11.0008 4.06019 11.0008C1.44552 11.0008 0 10.0969 0 8.27457V7.5C0 6.67157 0.671573 6 1.5 6H6.49579ZM10.4964 6C11.3248 6 11.9964 6.67157 11.9964 7.5L11.9956 8.02657C12.0861 9.67404 10.8362 10.5 8.55159 10.5C8.24147 10.5 7.94993 10.4849 7.67766 10.4547C7.96832 10.1873 8.18483 9.86812 8.32279 9.49738L8.55159 9.5C10.3358 9.5 11.0491 9.02861 10.9964 8.05397V7.5C10.9964 7.22386 10.7725 7 10.4964 7L8.43277 6.99998C8.33154 6.60667 8.11367 6.26018 7.81823 5.99959L10.4964 6ZM6.49579 7H1.5C1.22386 7 1 7.22386 1 7.5V8.27457C1 9.42056 1.92794 10.0008 4.06019 10.0008C6.18397 10.0008 7.05983 9.43371 6.99579 8.27633V7.5C6.99579 7.22386 6.77193 7 6.49579 7ZM4 0C5.38094 0 6.50041 1.11947 6.50041 2.5004C6.50041 3.88134 5.38094 5.00081 4 5.00081C2.61906 5.00081 1.49959 3.88134 1.49959 2.5004C1.49959 1.11947 2.61906 0 4 0ZM9 1C10.1046 1 11 1.89543 11 3C11 4.10457 10.1046 5 9 5C7.89543 5 7 4.10457 7 3C7 1.89543 7.89543 1 9 1ZM4 1C3.17135 1 2.4996 1.67175 2.4996 2.5004C2.4996 3.32906 3.17135 4.00081 4 4.00081C4.82865 4.00081 5.5004 3.32906 5.5004 2.5004C5.5004 1.67175 4.82865 1 4 1ZM9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4C9.55228 4 10 3.55228 10 3C10 2.44772 9.55228 2 9 2Z"
                fill="#8C773E"
              />
            </svg>
            {api?.data?.amount}&nbsp;
            {t("peopleLabel")}
          </p>
          <p className="text-nowrap flex items-center justify-center gap-2  font-light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M13.3688 5.67314V2.48872C13.3688 2.1956 13.1312 1.95798 12.8381 1.95798H11.2459V0.896503C11.2459 0.749944 11.127 0.631134 10.9805 0.631134C10.8339 0.631134 10.7151 0.749944 10.7151 0.896503V1.95798H3.28479V0.896503C3.28479 0.749944 3.16598 0.631134 3.01942 0.631134C2.87286 0.631134 2.75405 0.749944 2.75405 0.896503V1.95798H1.16184C0.868723 1.95798 0.631104 2.1956 0.631104 2.48872V12.8381C0.631104 13.1312 0.868723 13.3688 1.16184 13.3688H12.8381C13.1312 13.3688 13.3688 13.1312 13.3688 12.8381V5.67314ZM1.16184 2.48872H2.75405V3.55019C2.75405 3.69675 2.87286 3.81556 3.01942 3.81556C3.16598 3.81556 3.28479 3.69675 3.28479 3.55019V2.48872H10.7151V3.55019C10.7151 3.69675 10.8339 3.81556 10.9805 3.81556C11.127 3.81556 11.2459 3.69675 11.2459 3.55019V2.48872H12.8381V5.14241H1.16184V2.48872ZM1.16184 12.8381V5.67314H12.8381V12.8381H1.16184Z"
                fill="#8C773E"
              />
              <rect
                x="0.975342"
                y="2.35229"
                width="12.0492"
                height="3.09836"
                fill="#8C773E"
              />
            </svg>
            {moment(api?.data?.bookDate).format("DD/MM/YYYY, HH:mm")}
          </p>
        </div>
      </div>
      {/* QR CODE SS */}
      <div className="mt-8 flex">
        {/* Scan me */}
        <div className="flex flex-col flex-grow">
          <p className="text-white font-light">{t("scan_qr")}</p>
          <p className="text-white font-light">{t("or")}</p>
          <button className="btn btn-circle bg-[#8C773E]"></button>
        </div>
        {/* Qr code */}
        <div>
          <img
            className="w-full h-full"
            src={api?.data?.qrcode!}
            alt="qrcode"
            width="100"
            height="100"
          />
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
