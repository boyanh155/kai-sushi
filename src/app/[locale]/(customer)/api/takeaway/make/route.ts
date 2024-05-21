import { generateHmac } from "@/libs/apiMiddleware/hmac";
import connectDB from "@/libs/connectDb";
import { generateQRCodeWithLogo } from "@/libs/qrcode";
import { setCache } from "@/libs/redisConnection";
import orderModel from "@/models/Order";
import { payOSService } from "@/services/payos";
import { getProductById } from "@/services/product.service";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { phone, name, items, time, note } = body;

    if (!phone || !name || !items || !time) {
      throw {
        message: "Missing required fields",
        status: 400,
      };
    }
    await connectDB();
    const products = await Promise.all(
      items.map(async (item) => {
        const product = await getProductById(item.productId);
        if (!product) {
          throw {
            message: "Product not found",
            status: 404,
          };
        }
        return {
          productId: item.productId,
          productPrice: product.price,
          quantity: item.quantity,
        };
      })
    );

    const total = products.reduce((acc, item) => {
      return acc + item.productPrice * 1000 * item.quantity;
    }, 0);
    const expiredAt = Math.round((Date.now() + 1000 * 60 * 30) / 1000);

    const newOrder = await orderModel.create({
      phone,
      name,
      items,
      time,
      note,
      amount: total,
      "paymentInfo.expiredAt": expiredAt,
    });
    const _signature = await generateHmac(newOrder._id);

    const payOSBody: PayOsType.CheckoutRequestType = {
      orderCode: newOrder.order,
      amount: total,
      expiredAt,
      description: `Payment for order ${newOrder.order} `,
      cancelUrl: `${process.env.NEXT_PUBLIC_API_URL}/vi/api/takeaway/return?orderId=${newOrder._id}&error=1&signature=${_signature}`,
      returnUrl: `${process.env.NEXT_PUBLIC_API_URL}/vi/api/takeaway/return?orderId=${newOrder._id}&error=0&signature=${_signature}`,
    };
    const link = await payOSService.createPaymentLink(payOSBody);

    if (!link) {
      throw {
        message: "Failed to create payment link",
        status: 500,
      };
    }

    const qrCodeImage = await generateQRCodeWithLogo(
      link.qrCode,
      newOrder._id,
      "qrcode-order-payment"
    );
    newOrder.paymentInfo = link;
    newOrder.qrCodeImage = qrCodeImage;
    newOrder.save();

    setCache(`order:payment:${newOrder._id}`, "unpaid");

    return NextResponse.json(newOrder, {
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.stack || err.message },
      { status: err.status || 500 }
    );
  }
};
