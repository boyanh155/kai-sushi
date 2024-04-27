import { Document } from "mongoose";
import { NavChildType } from "../../types/NavbarType";

export interface IMenuChild extends Document {
  title: string;
  type: NavChildType;
  children?: IMenuChild[];
  order: number;
  description?: string;
  price?: string;
  // en
  enTitle?: string;
  enDescription?: string;
}

export interface IMenuHeader extends Document {
  title: string;
  image?: string;
  imageId?: string;
  type: "food" | "beverage";
  order: number;
  slug: string;
  children: IMenuChild[];
  //en
  enTitle?: string;
  
}
