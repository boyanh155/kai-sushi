import React from "react";

type Props = {
  width?: number;
  height?: number;
};

const SuShiBig = ({ width = 64, height = 64 }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
    >
      <g clip-path="url(#clip0_632_735)">
        <path
          d="M0 16V48C0 56.836 14.326 64 32 64C49.674 64 64 56.836 64 48V16H0Z"
          fill="#0E0E10"
        />
        <path
          d="M32 32C49.6731 32 64 24.8366 64 16C64 7.16344 49.6731 0 32 0C14.3269 0 0 7.16344 0 16C0 24.8366 14.3269 32 32 32Z"
          fill="#0E0E10"
        />
        <path
          d="M32 28C47.464 28 60 22.6274 60 16C60 9.37258 47.464 4 32 4C16.536 4 4 9.37258 4 16C4 22.6274 16.536 28 32 28Z"
          fill="#F4F4F4"
        />
        <path
          d="M26 18C30.4183 18 34 16.2091 34 14C34 11.7909 30.4183 10 26 10C21.5817 10 18 11.7909 18 14C18 16.2091 21.5817 18 26 18Z"
          fill="#FFE167"
        />
        <path
          d="M38 18C42.4183 18 46 16.2091 46 14C46 11.7909 42.4183 10 38 10C33.5817 10 30 11.7909 30 14C30 16.2091 33.5817 18 38 18Z"
          fill="#F45151"
        />
        <path
          d="M32 22C36.4183 22 40 20.2091 40 18C40 15.7909 36.4183 14 32 14C27.5817 14 24 15.7909 24 18C24 20.2091 27.5817 22 32 22Z"
          fill="url(#paint0_linear_632_735)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_632_735"
          x1="32.127"
          y1="19.8947"
          x2="32.127"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#8C773E" />
          <stop offset="1" stop-color="#D7CEB8" stop-opacity="0.88" />
        </linearGradient>
        <clipPath id="clip0_632_735">
          <rect width={width} height={height} fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SuShiBig;
