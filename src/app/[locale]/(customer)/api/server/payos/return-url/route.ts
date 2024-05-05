import { verifyPayOSSignature } from "@/libs/apiMiddleware/payosVerify";
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
      console.log(body);
      const { orderCode } = body;

      if (!orderCode) {
        throw {
          message: "Missing required fields",
          status: 400,
        };
      }

      await orderModel.findOneAndUpdate(
        {
          order: orderCode,
        },
        {
          paidInfo: body,
        },
        {
          new: true,
        }
      );

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
