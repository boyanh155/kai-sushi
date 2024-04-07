import connectDB from "@/libs/connectDb";
import { menuHeaderModel } from "@/models/Menu";
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

export const GET = async (
  _: NextRequest,
  { params: { headerId } }: Params
) => {
  try {
    if (!headerId) throw { status: 400, message: "Missing parameter" };

    await connectDB();

    const data = await menuHeaderModel
      .findById(headerId, {
        imageId: 0,

        __v: 0,
        order: 0,
        image:0
      })
      .populate({
        path: "children",
        populate: {
          path: "children",
        },
      });

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
