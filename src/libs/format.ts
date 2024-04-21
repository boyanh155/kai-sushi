import moment from "moment";

export const formatLocaleDate = `YYYY-MM-DD HH:mm:ss`;
export const formatLocaleDateString: (a: Date) => string = (date: Date) =>
  moment(new Date(date)).format(formatLocaleDate);

export const formatVND = (price: number) => {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency:"VND",
  });
};
