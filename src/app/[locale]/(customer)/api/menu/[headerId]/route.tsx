import { menuHeaderTags, menuTags } from "@/libs/cacheTags";
import connectDB from "@/libs/connectDb";
import { delCache, getCache, setCache } from "@/libs/redisConnection";
import { menuHeaderModel } from "@/models/Menu";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { headerLocaleKey } from "../../../../../../../constant/apiHelper";
import { isEmpty } from "lodash";

type Params = {
  params: {
    headerId: string;
    locale: string;
  };
};
export const DELETE = async (
  _: NextRequest,
  { params: { headerId } }: Params
) => {
  try {
    if (!headerId) throw { status: 400, message: "Missing parameter" };

    await connectDB();

    const data = await menuHeaderModel.findOneAndDelete({
      _id: headerId,
    });
    if (!data) throw { status: 404, message: "Data not found" };
    const cacheKey = menuHeaderTags(headerId);
    const cacheKey2 = menuTags(data?.type);
    const cacheKey3 = menuTags("both");

    delCache(cacheKey);
    delCache(cacheKey2);
    delCache(cacheKey3);
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

export const GET = async (
  req: NextRequest,
  { params: { headerId } }: Params
) => {
  try {
    if (!headerId) throw { status: 400, message: "Missing parameter" };
    if (!isValidObjectId(headerId))
      throw { status: 404, message: "Invalid headerId" };
    const locale = req.headers.get(headerLocaleKey) || "en";
    const cacheKey = menuHeaderTags(headerId);
    const cachedData = await getCache(cacheKey);
    let data: any = {};
    if (!cachedData) {
      await connectDB();

      data = await menuHeaderModel
        .findById(headerId, {
          imageId: 0,

          __v: 0,
        })
        .populate({
          path: "children",
          populate: {
            path: "children",
          },
        });
      if (data) setCache(cacheKey, JSON.stringify(data));
    } else {
      data = JSON.parse(cachedData);
    }

    if (locale === "en") {
      data = {
        ...data,
        children: data.children.map((item) => ({
          ...item,
          title: item.enTitle || item.title,
          description: item.enDescription || item.description,
          children: isEmpty(item.children)
            ? []
            : item.children.map((_item) => ({
                ..._item,
                title: _item.enTitle || _item.title,
                description: _item.enDescription || _item.description,
                children: isEmpty(_item.children)
                  ? []
                  : _item.children.map((__item) => ({
                      ...__item,
                      title: __item.enTitle || __item.title,
                      description: __item.enDescription || __item.description,
                    })),
              })),
        })),
      };
    }
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

export const PUT = async (
  req: NextRequest,
  { params: { headerId } }: Params
) => {
  try {
    if (!headerId) throw { status: 400, message: "Missing parameter" };
    if (!isValidObjectId(headerId))
      throw { status: 404, message: "Invalid headerId" };

    await connectDB();
    const body = await req.formData();
    //
    const data = await menuHeaderModel.findByIdAndUpdate(headerId, body, {
      new: true,
    });
    if (!data) throw { status: 404, message: "Data not found" };

    //
    setCache(menuHeaderTags(headerId), JSON.stringify(data));
    return new NextResponse(data, { status: 200 });
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
