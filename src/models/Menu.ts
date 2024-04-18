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
});

menuChild.index({ type: "text" });
menuChild.index({ slug: "text" }, { unique: true });
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

menuHeader.post("findOneAndDelete", async function (next) {
  // 'this' is the MenuHeader being removed. Provide callbacks here if you want
  // to be notified of the calls' result.
  console.log("remove children");
  console.log((this as any).children);
  const removedChildren = [...(this as any).children];
  const contentChildren = await model("MenuChild").find({
    _id: { $in: removedChildren },
  });

  for (const _child of contentChildren) {
    console.log(_child.children);
    await model("MenuChild").deleteMany({
      _id: { $in: _child.children },
    });
  }
  await model("MenuChild").deleteMany({
    _id: { $in: removedChildren },
  });
  next();
});

const menuHeaderModel =
  models.MenuHeader || model<IMenuHeader>("MenuHeader", menuHeader);

const menuChildModel =
  models.MenuChild || model<IMenuChild>("MenuChild", menuChild);

export { menuHeaderModel, menuChildModel };
