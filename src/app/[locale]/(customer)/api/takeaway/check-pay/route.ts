import { verifyBodyHmac } from "@/libs/apiMiddleware/hmac";
import connectDB from "@/libs/connectDb";
import orderModel from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

// socket io
export const POST = async (req: NextRequest) => {
  try {
    console.log("sdsd");
    const body = await req.json();
    const signature = req.headers.get("x-hmac-sign") || "";
    const { orderID } = body;
    if (!orderID) {
      throw {
        message: "Missing required fields",
        status: 400,
      };
    }
    const isVerified = await verifyBodyHmac(signature, body);

    if (!isVerified) {
      throw {
        message: "Invalid request",
        status: 401,
      };
    }
    await connectDB();
    const order = await orderModel.findById(orderID, {
      active: 1,
      "paymentInfo.expiredAt": 1,
      "paymentInfo.status": 1,
      payStatus: 1,
    });
    return NextResponse.json(order, {
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.stack || err.message },
      { status: err.status || 500 }
    );
  }
};
