import { productTags } from "@/libs/cacheTags";
import connectDB from "@/libs/connectDb";
import { getCache, setCache } from "@/libs/redisConnection";
import { IProductDocument } from "@/models/IProduct";
import { ProductModel } from "@/models/Product";
import { isValidObjectId } from "mongoose";

export const getProductById = async (_id: string) => {
  try {
    if (!isValidObjectId(_id))
      throw { message: "Invalid product ID", status: 400 };

    const cacheTag = productTags(_id);
    const cached = await getCache(cacheTag);

    if (cached) return JSON.parse(cached);
    await connectDB();
    const product = await ProductModel.findById<IProductDocument>(_id, {
      price: 1,
      name: 1,
      description: 1,
      _id: 1,
    });
    if (!product) throw { message: "Product not found", status: 404 };

    if (product) setCache(cacheTag, JSON.stringify(product));
    return product;
  } catch (err) {
    return err;
  }
};
