import { verifyBodyHmac } from "@/libs/apiMiddleware/hmac";
import connectDB from "@/libs/connectDb";
import orderModel from "@/models/Order";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const search = req.nextUrl.searchParams;
    const orderID = search.get("orderId") || "";
    const signature = search.get("signature") || "";
    if (!orderID || !isValidObjectId(orderID)) {
      throw {
        message: "Missing required fields",
        status: 400,
      };
    }

    console.log(`orderId=${orderID}`);

    const isVerified = await verifyBodyHmac(signature, `orderId=${orderID}`);

    if (!isVerified) {
      throw {
        message: "Invalid request",
        status: 401,
      };
    }

    await connectDB();
    const order = await orderModel.findOne({
      $and: [
        { _id: orderID },
        {
          "paymentInfo.expiredAt": {
            $gte: Date.now() / 1000,
          },
        },
        {
          active: 1,
        },
        {
          isPaid: 0,
        },
      ],
    });
    if (!order) {
      throw {
        message: "Order not found",
        status: 404,
      };
    }
    return NextResponse.json(order, {
      status: 200,
    });
  } catch (e: any) {
    return NextResponse.json(
      { message: e.stack || e.message },
      { status: e.status || 500 }
    );
  }
};
