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
    type: String,
  },
  enTitle: {
    type: String,
  },
  enDescription: {
    type: String,
  },
});

menuChild.index({ type: -1 });
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
    enum: ["food", "beverage","cafe"],
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
  enTitle: {
    type: String,
  },
});

menuHeader.post("findOneAndDelete", async function (next) {
  // 'this' is the MenuHeader being removed. Provide callbacks here if you want
  // to be notified of the calls' result.

  const removedChildren = [...(this as any).children];
  const contentChildren = await model("MenuChild").find({
    _id: { $in: removedChildren },
  });

  for (const _child of contentChildren) {
   
    await model("MenuChild").deleteMany({
      _id: { $in: _child.children },
    });
  }
  await model("MenuChild").deleteMany({
    _id: { $in: removedChildren },
  });
  next();
});

menuHeader.index({ type: -1, slug: 1 });

const menuHeaderModel =
  models.MenuHeader || model<IMenuHeader>("MenuHeader", menuHeader);

const menuChildModel =
  models.MenuChild || model<IMenuChild>("MenuChild", menuChild);

export { menuHeaderModel, menuChildModel };
