import { Document } from "mongoose";
import { IProductDocument } from "./IProduct";

export interface IOrderDocument extends Document {
  _id: string;
  name: string;
  phone: string;
  note?: string;
  time: string;
  items: IProductDocument[];
  createdAt: Date;
  updatedAt: Date;
  payStatus: boolean;
}
