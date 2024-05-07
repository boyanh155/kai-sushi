import { generateHmac } from "@/libs/apiMiddleware/hmac";
import orderModel from "@/models/Order";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const params = req.nextUrl.searchParams;
    const orderID = params.get("orderId");
    const _signature = params.get("signature");
    const signature = await generateHmac(orderID);
    console.log(signature, _signature);

    if (signature !== _signature) {
      throw {
        message: "Invalid signature",
        status: 400,
      };
    }
    const status = params.get("status");
    const error = params.get("error");
    console.log(Date.now() / 1000);
    const _order = await orderModel.findOneAndUpdate(
      {
        _id: orderID,
        active: 1,
        "paymentInfo.expiredAt": { $gte: Date.now() / 1000 },
      },
      {
        "paymentInfo.status": status,
        payStatus: error == "1" ? false : true,
        active: 0,
      },
      {
        new: true,
      }
    );

    if (!_order) {
      await orderModel.findOneAndUpdate(
        { _id: orderID },
        {
          active: 0,
        }
      );
      throw {
        message: "Order not found or expired",
        status: 404,
      };
    }

    return new NextResponse(null, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.status || 500 }
    );
  }
};
