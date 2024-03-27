import { Document } from "mongoose";

export interface IBooking extends Document {
  amount: number;
  bookDate: Date;
  name: string;
  phone: string;
  email?: string;
  isNotify: boolean;
  note?: boolean;
  expiredDate: Date;
  state: "pending" | "approved" | "rejected";
}
