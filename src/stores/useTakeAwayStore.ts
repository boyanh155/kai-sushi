import { create } from "zustand";
import { TypeCategory, TypeTakeAway } from "../../types/TakeAway";
interface TakeAwayState {
  takeAwayData: TypeTakeAway[];
  categoryData: TypeCategory[];
  isOpenCategory: boolean;
  search: string;
  // current element
  categoryHeaderElement: HTMLElement | null;
  selectedCategory: string;

}

interface TakeAwayStore extends TakeAwayState {
  setTakeAwayData: (takeAwayData: TypeTakeAway[]) => void;
  setSearch: (search: string) => void;
  toggleCategory: (state: boolean) => void;
  setCateGoryHeaderElement: (element: HTMLElement) => void;
  setSelectedCategory: (category: string) => void;
}

const initialState: Pick<TakeAwayStore, keyof TakeAwayState> = {
  takeAwayData: [],
  categoryData: [],
  isOpenCategory: false,
  search: "",
  categoryHeaderElement: null,
  selectedCategory: "",
};

export const useTakeAwayStore = create<TakeAwayStore>((set) => ({
  ...initialState,
  setTakeAwayData: (takeAwayData: TypeTakeAway[]) =>
    set((prev) => {
      if (takeAwayData.length === 0) return { ...prev };
      const category = [...new Set(takeAwayData.map((v) => v.name))];

      return { ...prev, takeAwayData, categoryData: category };
    }),
  toggleCategory: (state: boolean) =>
    set((prev) => ({ ...prev, isOpenCategory: state })),
  setSearch: (search: string) =>
    set((prev) => {
      const _search = search.replace(/[|&;$%@"<>()+,]/g, "");
      return { ...prev, search: _search };
    }),
  setCateGoryHeaderElement: (element: HTMLElement) => {
    set((prev) => ({ ...prev, categoryHeaderElement: element }));
  },
  setSelectedCategory: (category: string) => {
    set((prev) => ({ ...prev, selectedCategory: category }));
  },
}));

export default useTakeAwayStore;

// selector
export const selectTakeAwayData = (state: TakeAwayStore) => state.takeAwayData;
export const selectCategoryData = (state: TakeAwayStore) => state.categoryData;
export const selectIsOpenCategory = (state: TakeAwayStore) =>
  state.isOpenCategory;

export const selectCategoryHeaderElement = (state: TakeAwayStore) =>
  state.categoryHeaderElement;
export const selectedSelectedCategory = (state: TakeAwayStore) =>
  state.selectedCategory;
export const selectSearch = (state: TakeAwayStore) => state.search;
export const toggleIsOpenCategory = (state: TakeAwayStore) =>
  state.toggleCategory;

export const setSearchTakeAway = (state: TakeAwayStore) => state.setSearch;
export const setTakeAwayData = (state: TakeAwayStore) => state.setTakeAwayData;
export const setCategoryHeaderElement = (state: TakeAwayStore) =>
  state.setCateGoryHeaderElement;
export const setSelectedCategory = (state: TakeAwayStore) =>
  state.setSelectedCategory;
