import { NavChild } from "./NavbarType";

export type MenuDataRequestBody = {
  title: string;
  slug: string;
  children: NavChild[];
  image: string;
  order: number;
};

export type MenuDataResponseBody = {
  _id: string;
  title: string;
  slug: string;
  type:string;
  children: NavChild[];
  image: string;
  order: number;
};;
