import { Schema, model, models } from "mongoose";
import { NavChildType } from "../../types/NavbarType";

interface IMenuHeader {
  title: string;
  image?: string;
  slug: string;
  children: IMenuChild[];
}
interface IMenuChild {
  title: string;
  type: NavChildType;
  children?: IMenuChild[];
  description?: string;
  price: number;
}

const menuChild = new Schema<IMenuChild>({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [NavChildType.Body, NavChildType.Content],
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
});

menuChild.add({ children: [menuChild] });

const menuHeader = new Schema<IMenuHeader>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  children: {
    type: [menuChild],
    required: true,
  },
});

const menuHeaderModel = model<IMenuHeader>("MenuHeader", menuHeader);

export default menuHeaderModel;
