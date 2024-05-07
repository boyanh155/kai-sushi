import { IProductDocument } from "@/models/IProduct";

export type TypeCartItem = IProductDocument & {
  quantity: number;
  note?: string;
};
export type TypeCart = {
  items: TypeCartItem[];
  totalQuantity: number;
};
