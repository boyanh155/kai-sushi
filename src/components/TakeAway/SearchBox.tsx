"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useRef } from "react";
import {

  selectSearch,
  setCategoryHeaderElement,
  toggleIsOpenCategory,
} from "../../stores/useTakeAwayStore";
import { isEmpty } from "lodash";
import { setSearchTakeAway } from "../../stores/useTakeAwayStore";
import useTakeAwayStore, {

  selectIsOpenCategory,
} from "@/stores/useTakeAwayStore";


const SearchBox = () => {
  const t = useTranslations("TakeAway");

  const [isOpenSearch, setIsOpenSearch] = React.useState(false);
  const isOpen = useTakeAwayStore(selectIsOpenCategory);
  const toggleIsOpen = useTakeAwayStore(toggleIsOpenCategory);
  const _setCategoryHeader = useTakeAwayStore(setCategoryHeaderElement);
  const headerRef = useRef<HTMLDivElement>(null);
  const search = useTakeAwayStore(selectSearch);
  const setSearch = useTakeAwayStore(setSearchTakeAway);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    _setCategoryHeader(headerRef.current);
  }, [headerRef.current]);
  //
  return (
    <div
      className={`w-full flex flex-row capitalize ${
        !isOpenSearch ? "gap-6" : " "
      } text-white border-golden-1 overflow-hidden  border-b-[0.4px] px-7 py-5 bg-black transition-all duration-50 sticky top-0`}
    >
      {/* Category */}
      <div
        tabIndex={0}
        onClick={toggleIsOpen}
        ref={headerRef}
        className={`${
          isOpenSearch ? "basis-0 w-0" : "basis-[65%] ps-5 pe-4 py-1"
        }  rounded-full overflow-hidden cursor-pointer bg-[#8C773EBF]  flex flex-row justify-between items-center  transition-all duration-50`}
      >
        <p className="text-sm">{t("category")}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 20 20"
          fill="none"
          className={`transition-all duration-50 ${
            isOpen ? "" : "transform rotate-90"
          }`}
        >
          <path
            d="M9.99994 12.3611L5.47217 7.83335L6.10411 7.20142L9.99994 11.1111L13.9097 7.20142L14.5277 7.83335L9.99994 12.3611Z"
            fill="#FEFEFE"
          />
        </svg>
      </div>
      {/* Drop down content */}

      {/* Search */}
      <label className="input  rounded-full bg-[#8C773EBF] px-3 flex flex-row flex-grow items-center py-1 gap-2 h-full justify-between transition-all duration-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M14.2475 14.8624L14.3189 14.9338L14.3896 14.8616L14.8982 14.3424L14.9675 14.2716L14.8973 14.2016L9.66416 8.98534C9.99983 8.58863 10.266 8.12678 10.4631 7.60081L10.3695 7.56571L10.4631 7.60081C10.6724 7.04242 10.7771 6.46959 10.7771 5.88284C10.7771 4.53308 10.3042 3.3857 9.35979 2.44674C8.41552 1.50792 7.26569 1.03782 5.91623 1.03782C4.56669 1.03782 3.41965 1.50859 2.48116 2.44886C1.54269 3.38908 1.07285 4.53722 1.07285 5.88723C1.07285 7.2373 1.54366 8.38462 2.48402 9.32312C3.42443 10.2617 4.57562 10.7314 5.93141 10.7314C6.49634 10.7314 7.05759 10.6316 7.61472 10.4327C8.14205 10.2445 8.60988 9.97773 9.01735 9.63228L14.2475 14.8624ZM8.72996 8.68696C7.96832 9.44671 7.03651 9.8263 5.92821 9.8263C4.81807 9.8263 3.88473 9.44667 3.12186 8.6869C2.35911 7.92725 1.978 6.9953 1.978 5.88461C1.978 4.77394 2.35911 3.84199 3.12186 3.08234C3.88473 2.32257 4.81807 1.94294 5.92821 1.94294C7.03651 1.94294 7.96832 2.32253 8.72996 3.08228C9.49148 3.84193 9.87202 4.77389 9.87202 5.88461C9.87202 6.99535 9.49148 7.92732 8.72996 8.68696Z"
            fill="#FEFEFE"
            stroke="#FEFEFE"
            strokeWidth="0.2"
          />
        </svg>
        <input
          ref={inputRef}
          onFocus={() => setIsOpenSearch(true)}
          onBlur={(e) => isEmpty(e.target.value) && setIsOpenSearch(false)}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className={`bg-[#8C773EBF] text-sm placeholder:text-white capitalize transition-all duration-100  ${
            isOpenSearch ? "w-full" : "w-12"
          }`}
          placeholder={t("search")}
        />
        {!isEmpty(search) && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            onClick={() => {
              setSearch("");
              setIsOpenSearch(false);
              inputRef.current?.blur();
            }}
          >
            <g opacity="0.75">
              <path
                d="M7 13.5898L10 10.5898L13 13.5898L13.5898 13L10.5898 10L13.5898 7L13 6.41025L10 9.41025L7 6.41025L6.41025 7L9.41025 10L6.41025 13L7 13.5898ZM10.0028 17.5C8.96567 17.5 7.9906 17.3032 7.07758 16.9096C6.16457 16.516 5.37037 15.9818 4.69498 15.3071C4.0196 14.6323 3.48493 13.8389 3.09096 12.9267C2.69699 12.0145 2.5 11.0399 2.5 10.0028C2.5 8.96567 2.6968 7.9906 3.0904 7.07758C3.48401 6.16457 4.01819 5.37037 4.69294 4.69498C5.36769 4.0196 6.16114 3.48493 7.07329 3.09096C7.98546 2.69699 8.9601 2.5 9.99721 2.5C11.0343 2.5 12.0094 2.6968 12.9224 3.0904C13.8354 3.48401 14.6296 4.01819 15.305 4.69294C15.9804 5.36769 16.5151 6.16114 16.909 7.07329C17.303 7.98546 17.5 8.9601 17.5 9.99721C17.5 11.0343 17.3032 12.0094 16.9096 12.9224C16.516 13.8354 15.9818 14.6296 15.3071 15.305C14.6323 15.9804 13.8389 16.5151 12.9267 16.909C12.0145 17.303 11.0399 17.5 10.0028 17.5Z"
                fill="#FEFEFE"
              />
            </g>
          </svg>
        )}
      </label>
      {/* <div className=""></div> */}
    </div>
  );
};

export default SearchBox;
