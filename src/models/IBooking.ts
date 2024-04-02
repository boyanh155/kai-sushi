import { Document } from "mongoose";
import { EBookingState, IBooking } from "../../types/Booking";

export interface IBookingDocument extends Document<IBooking> {
  amount: number;
  bookDate: Date;
  name: string;
  phone: string;
  email?: string;
  isNotify: boolean;
  note?: boolean;
  expiredDate: Date;
  state: EBookingState;
  qrcode?:string;
}
