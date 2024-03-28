import { useTranslations } from "next-intl";
import React from "react";

type Props = {};

const OrderInfoPage = (props: Props) => {
  const t = useTranslations("Booking");
  return (
    <div className="dropdown w-full dropdown-open">
      <div
        tabIndex={0}
        role="button"
        className=" relative m-1 input-golden flex justify-between items-center w-full"
      >
        <p>Button</p>
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
      <ul tabIndex={0} className="dropdown-content z-[1] menu w-full p-0">
        <li className="w-full input-golden">
          Item 1
        </li>
        <li className="w-full input-golden">
          Item 2
        </li>
      </ul>
    </div>
  );
};

export default OrderInfoPage;
