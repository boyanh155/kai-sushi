import { MenuDataResponseBody } from "./ApiMenuType";

export enum NavChildType {
  Body = "body",
  Content = "content",
}

export type NavHeader =
  | {
      title: string;
      image: string;
      slug: string;
      order: number;
      type: "food" | "beverage" | "cafe";
      children?: NavChild[];
    }
  | MenuDataResponseBody;
export type NavChild = {
  title: string;
  type: NavChildType;
  children?: NavChild[];
  order: number;
  description?: string;
  price?: string;
};
