export type TypeCategory = string;
export type TypeTakeAway = {
  isTitle: boolean;
  name: string;
  category: TypeCategory;
  children?: (Partial<TypeTakeAway> & {
    price: string;
    _id: string;
    description?: string;
  })[];
};
