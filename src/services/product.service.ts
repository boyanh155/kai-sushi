import connectDB from "@/libs/connectDb";
import { IProductDocument } from "@/models/IProduct";
import { ProductModel } from "@/models/Product";
import { isValidObjectId } from "mongoose";

export const getProductById = async (_id: string) => {
  try {
    if (!isValidObjectId(_id))
      throw { message: "Invalid product ID", status: 400 };
    await connectDB();
    const product = await ProductModel.findById<IProductDocument>(_id, {
      price: 1,
      name: 1,
    });
    if (!product) throw { message: "Product not found", status: 404 };
    return product;
  } catch (err) {
    return err;
  }
};
