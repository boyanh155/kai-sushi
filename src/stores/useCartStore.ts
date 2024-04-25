import { create } from "zustand";
import { TypeCart } from "../../types/CartType";
import { persist } from "zustand/middleware";
import { IProductDocument } from "@/models/IProduct";

interface CartState extends TypeCart {
  totalPrice: number;
  userInfo: {
    name: string;
    phone: string;
    time: string;
  };
}

interface CartStore extends CartState {
  addToCart: (_item: IProductDocument, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setUserInfo: (userInfo: CartState["userInfo"]) => void;
}

const initialState: Pick<CartStore, keyof CartState> = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  userInfo: {
    name: "",
    phone: "",
    time: "16:00",
  },
};

const useCartStore = create<CartStore, [["zustand/persist", unknown]]>(
  persist<CartStore>(
    (set) => ({
      ...initialState,
      addToCart: (_item, quantity) =>
        set((prev) => {
          const existingItemIndex = prev.items.findIndex(
            (item) => item._id === _item._id
          );

          const existingItem = prev.items[existingItemIndex];
          const updatedTotalQuantity = +prev.totalQuantity + +quantity;
          const totalPrice = prev.totalPrice + _item.price * quantity;

          let updatedItems;
          if (existingItem) {
            const updatedItem = {
              ...existingItem,
              quantity: +existingItem.quantity + +quantity,
            };
            updatedItems = [...prev.items];
            updatedItems[existingItemIndex] = updatedItem;
          } else {
            updatedItems = [
              ...prev.items,
              {
                ..._item,
                quantity: quantity,
              },
            ];
          }

          return {
            items: [...updatedItems],
            totalQuantity: updatedTotalQuantity,
            totalPrice,
          };
        }),
      removeFromCart: (id) =>
        set((prev) => {
          const existingItemIndex = prev.items.findIndex(
            (item) => item._id === id
          );
          if (existingItemIndex === -1) return { ...prev };
          const existingItem = prev.items[existingItemIndex];
          const updatedTotalQuantity = +prev.totalQuantity - 1;
          const updatedTotalPrice = prev.totalPrice - existingItem.price;
          let updatedItems;
          if (existingItem.quantity === 1) {
            updatedItems = prev.items.filter((item) => item._id !== id);
          } else {
            const updatedItem = {
              ...existingItem,
              quantity: +existingItem.quantity - 1,
            };
            updatedItems = [...prev.items];
            updatedItems[existingItemIndex] = updatedItem;
          }

          return {
            items: [...updatedItems],
            totalQuantity: updatedTotalQuantity,
            totalPrice: updatedTotalPrice,
          };
        }),
      setDetailItems: (items) => {
        set((prev) => {
          let price = 0;
          items.forEach((item) => {
            price += item.price * item.quantity;
          });
          return {
            ...prev,
            detailItems: [...items],
            totalPrice: price,
          };
        });
      },

      clearCart: () => set(initialState),

      // user
      setUserInfo: (_userInfo: Partial<CartState["userInfo"]>) =>
        set((prev) => {
          return {
            ...prev,
            userInfo: {
              ...prev.userInfo,
              ..._userInfo,
            },
          };
        }),
    }),
    {
      name: "cartStore", // unique name
    }
  )
);

export default useCartStore;

// selector
export const selectCartInfo = (state: CartStore) => ({
  items: state.items,
  totalQuantity: state.totalQuantity,
  totalPrice: state.totalPrice,
});
export const selectCartUserInfo = (state: CartStore) => state.userInfo;

export const addToCart = (state: CartStore) => state.addToCart;
export const removeFromCart = (state: CartStore) => state.removeFromCart;
export const clearCart = (state: CartStore) => state.clearCart;
export const setCartUserInfo = (state: CartStore) => state.setUserInfo;
