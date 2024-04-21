import { IProductDocument } from "@/models/IProduct";

export type TypeCartItem = IProductDocument & {
  quantity: number;
};
export type TypeCart = {
  items: TypeCartItem[];
  totalQuantity: number;
};
