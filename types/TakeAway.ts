export type TypeCategory = string;
export type TypeTakeAway = {
  name: string;
  children?: (Partial<TypeTakeAway> & {
    price: string;
    _id: string;
    description?: string;
  })[];
};
