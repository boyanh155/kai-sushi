"use client";

import CloseButton from "@/components/shared/CloseButton";
import Loading from "@/components/shared/Loading";
import useApi from "@/hooks/api/useApi";
import { generateHmacBrowser } from "@/libs/apiMiddleware/hmacBrowser";
import { formatVND } from "@/libs/format";
import { IOrderDocument } from "@/models/IOrder";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { notFound, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const LineTexts = ({ title, value }) => (
  <div className="flex flex-col gap-1 text-white">
    <p className="text-base ">{title}</p>
    <p className="text-base font-black">{value}</p>
  </div>
);

const SuccessPage = () => {
  const t = useTranslations("Basket");
  const search = useSearchParams();

  const orderId = search.get("orderId") || "";
  const apiGet = useApi<IOrderDocument>({
    key: ["takeaway", "payment", orderId],
    url: `takeaway/order?orderId=${orderId}&signature=${generateHmacBrowser(
      `orderId=${orderId}`
    )}`,
    method: "GET",
  }).get;

  // not build order id get before
  const apiGetCheckOrder = useApi<{
    isPaid: boolean;
  }>({
    key: ["takeaway/check-pay", orderId],
    url: `takeaway/check-pay?orderId=${orderId}&signature=${generateHmacBrowser(
      `orderId=${orderId}`
    )}`,
    method: "GET",
    staleTime: 1000 * 60 * 30,
  }).get;

  // useEffect(() => {
  //   if (!apiGetCheckOrder) return;
  //   console.log(apiGetCheckOrder.error);
  //   if (
  //     apiGetCheckOrder.status === "error" &&
  //     apiGetCheckOrder.error?.status == 404
  //   )
  //     return notFound();
  //   const intervalRecheckHandler = function () {
  //     apiGetCheckOrder?.refetch();
  //   };
  //   const a = setInterval(intervalRecheckHandler, 1000);
  //   return () => {
  //     clearInterval(a);
  //   };
  // }, [apiGetCheckOrder]);

  React.useEffect(() => {
    if (!apiGet?.data) return;
    console.log(apiGet?.data);
  }, [apiGet?.data]);

  return (
    <div className="flex flex-col">
      <div className="w-full">
        <CloseButton href="/take-away" />
      </div>
      {/* INFORMATION */}

      <div className="px-8 gap-6 flex flex-col mt-4">
        <div className="flex flex-col">
          {/* ID CODE */}
          <LineTexts title={t("order_code")} value={apiGet?.data?._id} />
        </div>
        <div className="flex flex-row justify-between">
          {/* Description */}
          <LineTexts
            title={t("order_description")}
            value={apiGet?.data?.paymentInfo?.description}
          />
          {/* Amount */}
          <LineTexts
            title={t("order_amount")}
            value={apiGet?.data?.amount && formatVND(+apiGet?.data?.amount)}
          />
        </div>

        <div className="flex flex-col">
          <p className="text-base font-light text-center">{t("scan_qr")}</p>
          <Image
          priority
            src={apiGet?.data?.qrCodeImage!}
            width={218}
            height={218}
            alt="payment-qr"
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
