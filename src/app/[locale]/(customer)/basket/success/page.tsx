"use client";

import CloseButton from "@/components/shared/CloseButton";
import Loading from "@/components/shared/Loading";
import useApi from "@/hooks/api/useApi";
import { generateHmacBrowser } from "@/libs/apiMiddleware/hmacBrowser";
import { IOrderDocument } from "@/models/IOrder";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
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
    url: `takeaway/check-pay?orderId=${orderId}&signature=${generateHmacBrowser(
      `orderId=${orderId}`
    )}`,
    method: "GET",
  }).get;

  useEffect(() => {
    if (!apiGet) return;
    const intervalRecheckHandler = function () {
      apiGet?.refetch();
    };
    const a = setInterval(intervalRecheckHandler, 1000);
    return () => {
      clearInterval(a);
    };
  }, [apiGet]);

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
      {apiGet?.isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col">
          {/* ID CODE */}
          <LineTexts title={t("order_code")} value={apiGet?.data?._id} />
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
