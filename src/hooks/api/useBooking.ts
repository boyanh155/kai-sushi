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

export const useCancelBooking = (id: string) => {
  const api = useApi({
    key: ["cancelBooking", id],
    method: "DELETE",
    url: `booking`,
  }).deleteObj;
  return api;
};
