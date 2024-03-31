export enum EBookingState {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}
export interface IBooking {
  amount: number;
  bookDate: Date;
  name: string;
  phone: string;
  email?: string;
  note?: string;
  isNotify: boolean;
  expiredDate: Date;
  state: EBookingState;
  qrcode?:string;
}

export interface IBookingClient
  extends Omit<IBooking, "expiredDate" | "state" > {}
