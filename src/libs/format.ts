import moment from "moment";

export const formatLocaleDate = `YYYY-MM-DD HH:mm:ss`;
export const formatLocaleDateString: (a: Date) => string = (date: Date) =>
  moment(new Date(date)).format(formatLocaleDate);

export const formatVND = (price: number) => {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const _normalize = (_str: string) => {
  if (!_str) return "";
  let str = _str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  return str;
};
