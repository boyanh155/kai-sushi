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
    note: string;
  };

  //modal detail item
  currentDetailItem: IProductDocument | null;
}

interface CartStore extends CartState {
  addToCart: (_item: IProductDocument, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setUserInfo: (userInfo: Partial<CartState["userInfo"]>) => void;
  setCurrentDetailItem: (_item: IProductDocument | null) => void;
  setItemNote: (itemID: string | null, note: string | null) => void;
  setItemCart: (_item: IProductDocument, quantity: number) => void;
  removeItemCart: (_itemID: string) => void;
}

const initialState: Pick<CartStore, keyof CartState> = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  userInfo: {
    name: "",
    phone: "",
    time: "16:00",
    note: "",
  },
  currentDetailItem: null,
};

const useCartStore = create<CartStore, [["zustand/persist", unknown]]>(
  persist<CartStore>(
    (set, get) => ({
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
      setCurrentDetailItem: (item) =>
        set((prev) => ({ ...prev, currentDetailItem: item })),
      setItemNote: (itemID, note) =>
        set((prev) => {
          console.log(prev.items, itemID);
          const existingItemIndex = prev.items.findIndex(
            (item) => item._id === itemID
          );
          console.log("existingItemIndex", existingItemIndex);
          if (existingItemIndex === -1) return { ...prev };
          const existingItem = prev.items[existingItemIndex];
          const updatedItem = {
            ...existingItem,
            note,
          };
          console.log("updatedItem", updatedItem);
          const updatedItems = [...prev.items];
          updatedItems[existingItemIndex] = updatedItem as any;
          return {
            ...prev,
            items: updatedItems,
          };
        }),
      setItemCart: (_item: IProductDocument, quantity: number) => {
        const currentQuantity =
          get().items.find((item) => item._id === _item._id)?.quantity || 0;
        get().addToCart(_item, quantity - currentQuantity);
      },
      removeItemCart: (_itemID: string) =>
        set((prev) => {
          const existingItemIndex = prev.items.findIndex(
            (item) => item._id === _itemID
          );
          if (existingItemIndex === -1) return { ...prev };
          const updatedItems = [...prev.items].filter(
            (item) => item._id !== _itemID
          );
          console.log("updatedItems", updatedItems);
          return {
            ...prev,
            items: [...updatedItems],
          };
        }),
    }),
    {
      name: "cartStore", // unique name
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !["currentDetailItem"].includes(key)
          )
        ) as any,
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

export const selectCurrentDetailItem = (state: CartStore) =>
  state.currentDetailItem;

export const selectCurrentInCartFRomDetailId = (state: CartStore) => {
  return (
    state.currentDetailItem &&
    state.items.find((item) => item._id === state.currentDetailItem?._id)
  );
};

export const addToCart = (state: CartStore) => state.addToCart;
export const removeFromCart = (state: CartStore) => state.removeFromCart;
export const clearCart = (state: CartStore) => state.clearCart;

export const setCartUserInfo = (state: CartStore) => state.setUserInfo;

export const setCurrentDetailItem = (state: CartStore) =>
  state.setCurrentDetailItem;

export const setItemNote = (state: CartStore) => state.setItemNote;
export const setItemCart = (state: CartStore) => state.setItemCart;
export const removeItemCart = (state: CartStore) => state.removeItemCart;
