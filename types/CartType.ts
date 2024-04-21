export type TypeCartItem = {
  _id: string;
  quantity: number;
};
export type TypeCart = {
  items: (TypeCartItem)[];
  totalQuantity: number;
 
};
