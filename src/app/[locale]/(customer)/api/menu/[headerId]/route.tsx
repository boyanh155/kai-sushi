import connectDB from "@/libs/connectDb";
import { getCache, setCache } from "@/libs/redisConnection";
import { menuHeaderModel } from "@/models/Menu";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    headerId: string;
  };
};
export const DELETE = async (
  _: NextRequest,
  { params: { headerId } }: Params
) => {
  try {
    if (!headerId) throw { status: 400, message: "Missing parameter" };

    await connectDB();

    await menuHeaderModel.deleteOne({
      _id: headerId,
    });
    return new NextResponse("success", { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: err.status || 500,
        message: err.message || err.message,
      },
      { status: err.status || 500 }
    );
  }
};

export const GET = async (_: NextRequest, { params: { headerId } }: Params) => {
  try {
    if (!headerId) throw { status: 400, message: "Missing parameter" };
    if (!isValidObjectId(headerId))
      throw { status: 404, message: "Invalid headerId" };
    const cacheKey = `menu::header::${headerId}`;
    const cachedData = await getCache(cacheKey);
    if (cachedData)
      return NextResponse.json(JSON.parse(cachedData), { status: 200 });
    await connectDB();

    const data = await menuHeaderModel
      .findById(headerId, {
        imageId: 0,

        __v: 0,
        order: 0,
        image: 0,
      })
      .populate({
        path: "children",
        populate: {
          path: "children",
        },
      });
    if (data) setCache(cacheKey, JSON.stringify(data));

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: err.status || 500,
        message: err.message || err.message,
      },
      { status: err.status || 500 }
    );
  }
};
