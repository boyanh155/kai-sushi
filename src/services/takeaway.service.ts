import { takeAwayTags } from "@/libs/cacheTags";
import connectDB from "@/libs/connectDb";
import { getCache, setCache } from "@/libs/redisConnection";
import { CategoryModel } from "@/models/Product";

export const getMenuTakeAway = async () => {
  try {
    const cacheKey = takeAwayTags;

    const data = await getCache(cacheKey);
    if (data) return JSON.parse(data);
    await connectDB();
    const categories = await CategoryModel.find().populate("products");
    setCache(cacheKey, JSON.stringify(categories));
    return categories;
  } catch (err) {
    console.error(err);
    return null;
  }
};
