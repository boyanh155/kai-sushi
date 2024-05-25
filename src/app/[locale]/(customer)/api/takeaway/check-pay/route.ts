import { verifyBodyHmac } from "@/libs/apiMiddleware/hmac";
import connectDB from "@/libs/connectDb";
import { delCache, getCache, setCache } from "@/libs/redisConnection";
import orderModel from "@/models/Order";
import { isValidObjectId } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// socket io
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

    let currentPaidStatus = await getCache(`order:payment:${orderID}`);
    console.log(currentPaidStatus);

    if (!currentPaidStatus) {
      await connectDB();
      const order = await orderModel.findOne(
        {
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
        },
        {
          isPaid: 1,
        }
      );
      if (!order) {
        throw {
          message: "Order not found",
          status: 404,
        };
      }
      if (order.isPaid) delCache(`order:payment:${orderID}`);

      return NextResponse.json(
        {
          isPaid: order.isPaid,
        },
        {
          status: 200,
        }
      );
    }
 
    if (currentPaidStatus === "paid") delCache(`order:payment:${orderID}`);

    return NextResponse.json(
      {
        isPaid: currentPaidStatus === "paid",
      },
      {
        status: 200,
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.stack || err.message },
      { status: err.status || 500 }
    );
  }
};
