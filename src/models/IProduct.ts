import { Document } from "mongoose";

export interface IProductDocument extends Document {
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface ICategoryDocument extends Document {
  name: string;
  products: IProductDocument[];
}
