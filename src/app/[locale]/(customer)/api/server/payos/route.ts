import { verifyPayOSSignature } from "@/libs/apiMiddleware/payosVerify";
import connectDB from "@/libs/connectDb";
import { setCache } from "@/libs/redisConnection";
import orderModel from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

export const POST = verifyPayOSSignature(
  async (
    req: NextRequest & {
      verifiedData: PayOsType.WebhookDataType;
    }
  ) => {
    try {
      const body = req.verifiedData;
      const { orderCode } = body;

      if (!orderCode) {
        throw {
          message: "Missing required fields",
          status: 400,
        };
      }

      await connectDB();
      const _o = await orderModel.findOneAndUpdate(
        {
          order: orderCode,
        },
        {
          paidInfo: body,
          isPaid: true,
        },
        {
          new: true,
        }
      );

      if (_o) setCache(`order:payment:${_o._id}`, "paid");

      return new NextResponse(null, {
        status: 200,
      });
    } catch (err: any) {
      console.log(err);

      return NextResponse.json(
        { error: err.message },
        { status: err.status || 500 }
      );
    }
  }
);
