import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};
export const GET = (_: NextRequest, { params: { id } }: Params) => {
  try {
    if (!isValidObjectId(id))
      throw {
        statusCode: 400,
        message: "Invalid ID",
      };

    //const order = await Order
    return NextResponse.json("HI");
  } catch (err: any) {
    return NextResponse.json(
      { error: err.stack || err.message },
      { status: err.statusCode || 500 }
    );
  }
};
