"use client";

import CloseButton from "@/components/shared/CloseButton";
import Loading from "@/components/shared/Loading";
import useApi from "@/hooks/api/useApi";
import { generateHmacBrowser } from "@/libs/apiMiddleware/hmacBrowser";
import { formatVND } from "@/libs/format";
import { IOrderDocument } from "@/models/IOrder";
import moment from "moment";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { notFound, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const LineTexts = ({
  title,
  value,
  className,
}: {
  title: string;
  value: string;
  className?: string;
}) => (
  <div className={`flex flex-col gap-1 text-white ${className}`}>
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

  // check pay

  const [isPaid, setIsPaid] = React.useState(false);
  let intervalId: NodeJS.Timeout;
  useEffect(() => {
    if (intervalId) clearInterval(intervalId);
    if (isPaid) return;
    if (!apiGetCheckOrder) return;
    console.log(apiGetCheckOrder.error);
    if (
      apiGetCheckOrder.status === "error" &&
      apiGetCheckOrder.error?.status == 404
    )
      return notFound();

    if (isPaid || apiGetCheckOrder?.data?.isPaid) {
      setIsPaid(true);
      return;
    }
    const intervalRecheckHandler = function () {
      apiGetCheckOrder?.refetch();
    };
    intervalId = setInterval(intervalRecheckHandler, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [apiGetCheckOrder]);

  React.useEffect(() => {
    if (!apiGet?.data) return;
    console.log(apiGet?.data);
  }, [apiGet?.data]);

  const [timeLeft, setTimeLeft] = React.useState("");

  useEffect(() => {
    if (!apiGet?.data?.paymentInfo?.expiredAt)
      return setTimeLeft("Time expired");
    const expiryTimestamp = +apiGet?.data?.paymentInfo.expiredAt * 1000; // Replace this with the actual path to the expiry timestamp

    const intervalId = setInterval(() => {
      const now = moment();
      const expiry = moment(expiryTimestamp);
      const duration = moment.duration(expiry.diff(now));

      if (duration.asMilliseconds() <= 0) {
        setTimeLeft("Time expired");
        clearInterval(intervalId);
      } else {
        setTimeLeft(
          `${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`
        );
      }
    }, 1000);

    return () => clearInterval(intervalId); // This will clear the interval when the component unmounts
  }, [apiGet?.data?.paymentInfo.expiredAt]);
  console.log(apiGet?.data?.isPaid);
  console.log(isPaid);
  return apiGet?.isLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col">
      <div className="w-full">
        <CloseButton href="/take-away" />
      </div>
      {/* INFORMATION */}
      <div className="px-8 gap-6 flex flex-col mt-4">
        <div className="flex flex-row justify-between">
          {/* ID CODE */}
          <LineTexts title={t("order_code")} value={apiGet?.data?._id!} />
          <LineTexts
            className="items-end"
            title={t("payment_status")}
            value={
              isPaid || apiGet?.data?.isPaid
                ? t("is_paid_true")
                : t("is_paid_false")
            }
          />
        </div>
        <div className="flex flex-row justify-between">
          {/* Description */}
          <LineTexts
            title={t("order_description")}
            value={apiGet?.data?.paymentInfo?.description!}
          />
          {/* Amount */}
          <LineTexts
            className="items-end"
            title={t("order_amount")}
            value={
              (
                apiGet?.data?.amount && formatVND(+apiGet?.data?.amount)
              )?.toString()!
            }
          />
        </div>

        <div className="flex flex-col gap-4 items-center mt-12">
          <p className="text-base font-light text-center">{t("scan_qr")}</p>

          <Image
            priority
            src={apiGet?.data?.qrCodeImage!}
            width={218}
            height={218}
            alt="payment-qr"
          />
          <p className="text-sm font-light text-center text-[#ffffffab]">
            {t("waiting_to_confirm")}
          </p>
        </div>

        {/* Expire */}
        {!isPaid && !apiGet?.data?.isPaid ? (
          <div className="flex flex-col text-red-500 items-center text-lg">
            <div>{t("expire_after")}</div>
            <div>{timeLeft}</div>
          </div>
        ) : (
          <div className="flex flex-col text-green-500 items-center text-lg">
            {t("is_paid_true")}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;
