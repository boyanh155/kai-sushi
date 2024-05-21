import { Document } from "mongoose";
import { IProductDocument } from "./IProduct";

export interface IOrderDocument extends Document {
  _id: string;
  name: string;
  phone: string;
  note?: string;
  time: string;
  amount: number;
  items: IProductDocument[];
  createdAt: Date;
  updatedAt: Date;
  isPaid: boolean;
  qrCodeImage?: string;
  active: boolean;
  order?: number;
  paymentInfo: Partial<PayOsType.CheckoutResponseDataType>;
  paidInfo?: PayOsType.WebhookDataType;
}
