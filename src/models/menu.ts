import { Schema, model, models } from "mongoose";
import { NavChildType } from "../../types/NavbarType";
import { IMenuChild, IMenuHeader } from "./IMenu";

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
  order: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
});

menuChild.add({
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "MenuChild",
    },
  ],
});

// auto generate number
menuChild.pre("save", function (next) {
  if (!this.order) {
    this.order = this._id;
  }
  next();
});

const menuHeader = new Schema<IMenuHeader>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  order: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  imageId: {
    type: String,
  },
  type: {
    type: String,
    required: true,
    enum: ["food", "beverage"],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: "MenuChild",
    },
  ],
});

const menuHeaderModel =
  models.MenuHeader || model<IMenuHeader>("MenuHeader", menuHeader);

const menuChildModel =
  models.MenuChild || model<IMenuChild>("MenuChild", menuChild);

export { menuHeaderModel, menuChildModel };
