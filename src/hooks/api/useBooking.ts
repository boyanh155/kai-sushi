import { IBooking } from "../../../types/Booking";
import useApi from "./useApi";

export const useGetBookingById = (id: string) => {
  const api = useApi<IBooking & { qrcode: string }>({
    key: ["bookingDetail", id],
    method: "GET",
    url: `booking/${id}`,
  }).get;
  return api;
};
