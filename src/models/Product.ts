import { model, models, Schema } from "mongoose";
import { ICategoryDocument, IProductDocument } from "./IProduct";

const product = new Schema<IProductDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const category = new Schema<ICategoryDocument>({
  name: {
    type: String,
    required: true,
  },
  products: [product],
});

product.index({ name: 1 }, { unique: true });

const ProductModel =
  models.Product || model<IProductDocument>("Product", product);
const CategoryModel =
  models.Category || model<ICategoryDocument>("Category", category);

export { ProductModel, CategoryModel };
