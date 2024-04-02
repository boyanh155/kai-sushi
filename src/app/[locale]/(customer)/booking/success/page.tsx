"use client";
import React, { useState } from "react";
import { useGetBookingById } from "../../../../../hooks/api/useBooking";
import BackwardButton from "@/components/Booking/BackwardButton";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { gideon } from "@/libs/GoogleFont";
import moment from "moment";
import Loading from "@/components/shared/Loading";
import { screenShotElement } from "@/libs/screenshot";
import { useRouter } from "next/navigation";

type Props = {
  searchParams: {
    orderId: string;
    [key: string]: string | string[] | undefined;
  };
};

const saveButtonClickHandler = () => {
  screenShotElement("#kai-booking__screenshot__success-order");
};
const SuccessPage = ({ searchParams: { orderId } }: Props) => {
  const [isCopy, setIsCopy] = useState(false);
  const copyButtonClickHandler = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopy(true);
  };
  const router = useRouter();
  const api = useGetBookingById(orderId);
  const t = useTranslations("Booking");

  return api?.isLoading ? (
    <Loading />
  ) : (
    <>
      <Link
        href={`order-info?orderId=${orderId}`}
        className="flex absolute top-16 left-8"
      >
        <BackwardButton />
      </Link>
      {/* SCREEN SHOT PART */}
      <div
        id="kai-booking__screenshot__success-order"
        className="flex flex-col items-center"
      >
        <h2
          className={`pt-32 text-white uppercase text-3xl ${gideon.className}`}
        >
          {t("booking")}
        </h2>
        {/* ID */}
        <p className="text-[#959595] font-light mt-6">#{orderId}</p>
        <p className="font-light mt-1">{t("success_message")}</p>
        {/* Info card */}
        <div className="flex flex-col gap-2 w-full text-base mt-9 text-white border-golden border px-5 p-4">
          <p className=" capitalize  text-base">{api?.data?.name}</p>
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
            <p
              className={
                "text-nowrap flex items-center justify-center gap-2  font-light"
              }
            >
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
        <div className="mt-8 flex justify-between">
          {/* Scan me */}
          <div className="flex flex-col ">
            <p className="text-white font-light">{t("scan_qr")}</p>
            <p className="text-white font-light">{t("or")}</p>
            <div className="flex flex-row gap-2">
              {/* Download */}
              <div
                onClick={saveButtonClickHandler}
                className="cursor-pointer hover:opacity-60 mt-5 transition-all w-10 h-10 rounded-sm bg-[#8C773E] text-white flex justify-center items-center"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M8.16241 13.6553C7.96521 13.8486 7.96204 14.1651 8.15527 14.3623L11.6465 17.8535C11.7401 17.9474 11.8674 18.0002 12 18C12.1326 18.0001 12.2598 17.9474 12.3535 17.8535L15.8447 14.3623C16.0352 14.1679 16.0352 13.8569 15.8447 13.6625C15.6514 13.4653 15.3349 13.462 15.1377 13.6553L12.5 16.293V2.5C12.5 2.22388 12.2761 2 12 2C11.7239 2 11.5 2.22388 11.5 2.5V16.293L8.86224 13.6553C8.66791 13.4648 8.35681 13.4648 8.16241 13.6553ZM18 9H16.5C16.2239 9 16 9.22388 16 9.5C16 9.77612 16.2239 10 16.5 10H18C19.104 10.0014 19.9986 10.896 20 12V19C19.9986 20.104 19.104 20.9986 18 21H6C4.896 20.9986 4.0014 20.104 4 19V12C4.0014 10.896 4.896 10.0014 6 10H8.5C8.77612 10 9 9.77612 9 9.5C9 9.22388 8.77612 9 8.5 9H6C4.34387 9.00183 3.00183 10.3439 3 12V19C3.00183 20.6561 4.34387 21.9982 6 22H18C19.6561 21.9982 20.9982 20.6561 21 19V12C20.9982 10.3439 19.6561 9.00183 18 9Z"
                    fill="#FEFEFE"
                  />
                </svg>
              </div>
              {/* COPY LINk */}
              <div
                onClick={copyButtonClickHandler}
                className={`cursor-pointer hover:opacity-60 transition-all mt-5  w-10 h-10 rounded-sm bg-[#8C773E] text-white flex justify-center items-center ${
                  isCopy ? "opacity-60 " : ""
                }`}
              >
                {isCopy ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    x="0px"
                    y="0px"
                    width="24"
                    height="24"
                    viewBox="0,0,256,256"
                    style={{ fill: "#000000" }}
                  >
                    <g
                      fill="#ffffff"
                      fill-rule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                      style={{ mixBlendMode: "normal" }}
                    >
                      <g transform="scale(10.66667,10.66667)">
                        <path d="M20.29297,5.29297l-11.29297,11.29297l-4.29297,-4.29297l-1.41406,1.41406l5.70703,5.70703l12.70703,-12.70703z"></path>
                      </g>
                    </g>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M12.0374 2.83372L12.0374 2.83373C12.4569 2.42893 13.017 2.20271 13.5999 2.20271C14.1829 2.20271 14.743 2.42893 15.1624 2.83373L15.1641 2.83538L15.1641 2.83539C15.3701 3.04056 15.5336 3.28439 15.6451 3.55289C15.7566 3.82139 15.814 4.10926 15.814 4.4C15.814 4.69073 15.7566 4.97861 15.6451 5.2471C15.5336 5.51551 15.3702 5.75926 15.1643 5.9644L12.0374 2.83372ZM12.0374 2.83372L12.0355 2.8356L8.80221 6.06893C8.73844 6.1327 8.66274 6.18329 8.57942 6.2178C8.4961 6.25231 8.4068 6.27007 8.31661 6.27007C8.22643 6.27007 8.13713 6.25231 8.05381 6.2178C7.97049 6.18329 7.89478 6.1327 7.83101 6.06893C7.76724 6.00516 7.71666 5.92945 7.68214 5.84614C7.64763 5.76282 7.62987 5.67351 7.62987 5.58333C7.62987 5.49315 7.64763 5.40384 7.68214 5.32053C7.71666 5.23721 7.76724 5.1615 7.83101 5.09773L11.0723 1.86473C11.0724 1.86469 11.0724 1.86465 11.0725 1.8646C11.7454 1.19595 12.6555 0.820654 13.6041 0.820654C14.5527 0.820654 15.4627 1.19588 16.1356 1.86442C16.8041 2.53729 17.1793 3.4473 17.1793 4.39583C17.1793 5.34446 16.804 6.25457 16.1353 6.92747C16.1353 6.92751 16.1353 6.92756 16.1352 6.9276L12.9021 10.1691L12.9018 10.1694C12.8383 10.2334 12.7627 10.2843 12.6794 10.3189C12.5961 10.3536 12.5068 10.3715 12.4166 10.3715C12.3264 10.3715 12.2371 10.3536 12.1538 10.3189C12.0705 10.2843 11.995 10.2334 11.9314 10.1694L11.9306 10.1685C11.8665 10.105 11.8157 10.0294 11.781 9.94613C11.7463 9.86285 11.7284 9.77354 11.7284 9.68333C11.7284 9.59312 11.7463 9.50381 11.781 9.42054C11.8157 9.33727 11.8665 9.26169 11.9306 9.19816L11.931 9.19773L15.1641 5.96461L12.0374 2.83372ZM5.96244 15.1663L5.96246 15.1663L5.96434 15.1644L9.19768 11.9311C9.32647 11.8023 9.50114 11.7299 9.68328 11.7299C9.86541 11.7299 10.0401 11.8023 10.1689 11.9311C10.2977 12.0599 10.37 12.2345 10.37 12.4167C10.37 12.5988 10.2977 12.7735 10.1689 12.9023L6.92956 16.1333C6.24932 16.7571 5.35454 17.0945 4.43166 17.075C3.50776 17.0554 2.62714 16.6797 1.9737 16.0262C1.32027 15.3728 0.944533 14.4922 0.924974 13.5683C0.905436 12.6454 1.2428 11.7506 1.86668 11.0704L5.09768 7.83106C5.22647 7.70227 5.40114 7.62992 5.58328 7.62992C5.76541 7.62992 5.94009 7.70227 6.06888 7.83106C6.19767 7.95985 6.27002 8.13453 6.27002 8.31666C6.27002 8.4988 6.19767 8.67348 6.06888 8.80227L2.83576 12.0354C2.62977 12.2406 2.46632 12.4844 2.3548 12.7529C2.24327 13.0214 2.18586 13.3093 2.18586 13.6C2.18586 13.8907 2.24327 14.1786 2.3548 14.4471C2.46632 14.7156 2.62977 14.9594 2.83576 15.1646L2.83745 15.1663C3.25688 15.5711 3.81704 15.7973 4.39995 15.7973C4.98285 15.7973 5.54301 15.5711 5.96244 15.1663ZM6.95081 11.7333L6.94908 11.7333C6.85915 11.7339 6.77 11.7166 6.68674 11.6826C6.60349 11.6486 6.52776 11.5985 6.46391 11.5352L6.35828 11.6417L6.46391 11.5352C6.39986 11.4716 6.34903 11.3961 6.31433 11.3128C6.27964 11.2295 6.26178 11.1402 6.26178 11.05C6.26178 10.9598 6.27964 10.8705 6.31433 10.7872C6.34902 10.7039 6.39986 10.6284 6.46391 10.5648L6.46434 10.5644L10.5643 6.4644C10.6931 6.33561 10.8678 6.26325 11.0499 6.26325C11.2321 6.26325 11.4068 6.33561 11.5355 6.4644C11.6643 6.59319 11.7367 6.76786 11.7367 6.95C11.7367 7.13213 11.6643 7.30681 11.5355 7.4356L7.43598 11.5352C7.43591 11.5352 7.43583 11.5353 7.43576 11.5354C7.37195 11.5986 7.29631 11.6486 7.21315 11.6826C7.12989 11.7166 7.04074 11.7339 6.95081 11.7333Z"
                      fill="#FEFEFE"
                      stroke="#8C773E"
                      stroke-width="0.3"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
          {/* Qr code */}
          <div className="flex flex-col gap-3 items-center basis-[135px]">
            <img
              src={api?.data?.qrcode!}
              alt="qrcode"
              className="w-[135px] h-[135px] max-w-36"
            />
            <p className="text-[#959595] font-light text-base hover:opacity-60 transition-all cursor-pointer">
              {t("booking_cancel")}
            </p>
          </div>
        </div>
        <p className="mt-9 text-sm font-light">{t("thanks")}</p>
        {/* Check menu */}
        <div
          onClick={() => {
            router.replace("/");
          }}
          className="cursor-pointer hover:opacity-60 transition-all mt-7 flex justify-center py-2 w-full font-light text-base uppercase border-[0.4px] border-[#fefefea6] bg-[#0E0E10BF]"
        >
          {t("menu_check")}
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
