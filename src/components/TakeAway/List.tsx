"use client";
import useCartStore, {
  addToCart,
  removeFromCart,
  selectCartInfo,
} from "@/stores/useCartStore";
import useTakeAwayStore, {
  selectCategoryHeaderElement,
  selectedSelectedCategory,
  selectSearch,
  selectTakeAwayData,
} from "@/stores/useTakeAwayStore";
import { _normalize } from "@/libs/format";

import React, { useEffect, useRef } from "react";
import { isEmpty } from "lodash";
import { useTranslations } from "next-intl";
import { setCurrentDetailItem } from "../../stores/useCartStore";
import RenderAddButton from "./RenderAddButton";

const HighlightText = ({ text, search }) => {
  if (!search || !text) {
    return <>{text}</>;
  }

  const normalizedSearch = _normalize(search);
  const normalizedText = _normalize(text);

  const parts = normalizedText.split(new RegExp(`(${normalizedSearch})`, "gi"));

  let currentIndex = 0;
  return (
    <>
      {parts.map((part, i) => {
        const originalPart = text.substr(currentIndex, part.length);
        currentIndex += part.length;
        return part.toLowerCase() === normalizedSearch.toLowerCase() ? (
          <span key={i} style={{ backgroundColor: "#ffff0a7d" }}>
            {originalPart}
          </span>
        ) : (
          <span key={i}>{originalPart}</span>
        );
      })}
    </>
  );
};
const List = () => {
  const listTakeAway = useTakeAwayStore(selectTakeAwayData);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const _selectedCategory = useTakeAwayStore(selectedSelectedCategory);

  const pCategoryHeader = useTakeAwayStore(selectCategoryHeaderElement);

  const _ref = useRef<HTMLDivElement>(null);
  const _search = useTakeAwayStore(selectSearch);
  const search = _normalize(_search);
  const [renderTakeAway, setRenderTakeAway] = React.useState<any[]>([]);
  const t = useTranslations("TakeAway");
  const _setCurrentDetailItem = useCartStore(setCurrentDetailItem);

  useEffect(() => {
    const handleScroll = () => {
      if (!pCategoryHeader) return;
      if (window.scrollY < 209) pCategoryHeader.textContent = t("category");
      const text = itemsRef.current.find((v, index) => {
        if (!v || !itemsRef?.current?.[index + 1]) return;
        if (
          v.getBoundingClientRect().top < 91 &&
          itemsRef.current[index + 1].getBoundingClientRect().top > 91
        ) {
        }
        return (
          v.getBoundingClientRect().top < 91 &&
          itemsRef.current[index + 1].getBoundingClientRect().top > 91
        );
      })?.textContent;
      if (text && pCategoryHeader) {
        pCategoryHeader.textContent = text;
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [itemsRef.current, pCategoryHeader]);

  useEffect(() => {
    if (isEmpty(listTakeAway)) return;
    if (!search) setRenderTakeAway(listTakeAway);
    const _result = listTakeAway.filter(
      (category) =>
        _normalize(category?.name).includes(search) ||
        category?.children?.some(
          (product: any) =>
            (product?.name && _normalize(product.name).includes(search)) ||
            (product?.description &&
              _normalize(product.description).includes(search))
        )
    );
    setRenderTakeAway(_result);
  }, [search, listTakeAway]);
  useEffect(() => {
    if (_selectedCategory) {
      const _index = listTakeAway.findIndex(
        (v) => v.name === _selectedCategory
      );
      if (_index > -1) {
        const elementTop =
          itemsRef.current[_index]?.getBoundingClientRect().top || 0;
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const top = elementTop + scrollTop - 90;

        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }, [_selectedCategory]);
  return (
    <div className="flex flex-col px-7 gap-16 mt-10  pb-28" ref={_ref}>
      {renderTakeAway.length > 0 ? (
        renderTakeAway.map((v, id) => {
          return (
            <div key={id} className="flex flex-col gap-2">
              {/* CATE */}
              <div
                ref={(el) => {
                  itemsRef.current[id] = el!;
                  itemsRef.current = [...itemsRef.current];
                }}
                className="text-category-fixed text-base font-semibold golden-title uppercase"
              >
                <HighlightText text={v.name} search={search} />
              </div>
              {/*  CHILDREN */}
              {v.children &&
                v.children.map((child, childIndex) => (
                  <div
                    key={childIndex}
                    className="flex flex-row gap-4 text-white items-center "
                    // click open popup

                    onClick={() => {
                      _setCurrentDetailItem(child);
                    }}
                  >
                    {child.image && (
                      <img
                        src={child.image}
                        alt={child.name}
                        className="w-[56px] h-[56px] rounded-sm"
                      />
                    )}
                    {/* content */}
                    <div className="flex flex-row justify-between gap-1 flex-grow items-end">
                      <div className="flex flex-col gap-1 py-3 basis-9/12">
                        <div className="text-base font-light uppercase">
                          <HighlightText text={child.name} search={search} />
                        </div>
                        <div className="text-xs font-light text-[#959595]">
                          <HighlightText
                            text={child.description}
                            search={search}
                          />
                        </div>
                        <div className="font-medium text-base">
                          {child.price}
                        </div>
                      </div>
                      {/* add button */}
                      <div className="py-6 flex-grow flex justify-end">
                        <RenderAddButton child={child} />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          );
        })
      ) : (
        <div>No data</div>
      )}
    </div>
  );
};

export default List;
