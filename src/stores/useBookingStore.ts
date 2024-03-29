import { create } from "zustand";
import { IBookingClient } from "../../types/Booking";

interface BookingState {
  bookingInfo: IBookingClient;
}

interface BookingStore extends BookingState {
  setBookingInfo: (bookingInfo: IBookingClient) => void;
}
const intialState: Pick<BookingStore, keyof BookingState> = {
  bookingInfo: {
    amount: 2,
    bookDate: new Date(),
    name: "",
    phone: "",
    email: "",
    isNotify: false,
    note: "",
  },
};
export const useBookingStore = create<BookingStore>((set) => ({
  ...intialState,
  setBookingInfo: (bookingInfo: Partial<IBookingClient>) =>
    set((prev) => ({
      ...prev,
      bookingInfo: { ...prev.bookingInfo, ...bookingInfo },
    })),
}));

export default useBookingStore;
// selector
export const selectBookingState: (
  state: BookingStore
) => BookingState["bookingInfo"] = (state) => state.bookingInfo;

export const setBookingState: (
  state: BookingStore
) => BookingStore["setBookingInfo"] = (state) => state.setBookingInfo;
