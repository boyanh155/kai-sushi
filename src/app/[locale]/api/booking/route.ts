import { NextRequest, NextResponse } from "next/server";
import moment from "moment";
import { IBooking } from "../../../../../types/Booking";
import { formatLocaleDate, formatLocaleDateString } from "@/libs/format";
import a from "./dummy.json";
import { sendMessageToManyRecipients } from "@/services/meta";
import bookingModel from "@/models/Booking";
import connectDB from "@/libs/connectDb";
import { generateQRCodeWithLogo } from "@/libs/qrcode";
import path from "path";
import fs from "fs";

export const POST = async (req: NextRequest) => {
  await connectDB();
  try {
    const body: IBooking = await req.json();
    console.log("HI");
    const { amount, bookDate, name, phone, isNotify, email, note } = body;

    //  // "recipientId"🙁"7247720955323500","7420483581350467","t_122093450708266926"]
    const _date = formatLocaleDateString(bookDate);

    if (
      !amount ||
      !moment.isMoment(moment(_date, formatLocaleDate)) ||
      !name ||
      !phone
    )
      throw {
        status: 400,
        message: "Missing information",
      };

    if (moment(_date).add(30, "seconds").isBefore(moment()))
      throw {
        status: 400,
        message: "Invalid date",
      };
    //  new booking
    const newBooking = await bookingModel.create({
      name,
      amount,
      phone,
      bookDate: moment(_date).toDate(),
      isNotify,
      email,
      note,
    });

    const bookingUrl = `${process.env.NEXT_PUBLIC_API_URL}/vi/booking/success?orderId=${newBooking._id}`;
    const outputQr = path.join("qrcode-booking", `qr_${newBooking._id}.png`);
    await generateQRCodeWithLogo(
      bookingUrl,
      `${process}/qrcode-booking/qr_${newBooking._id}.png`
    );
    const _url = new URL(outputQr, process.env.NEXT_PUBLIC_API_URL!);
    newBooking.qrcode = _url.href;

    await newBooking.save();
    await sendMessageToManyRecipients(a.recipientId, a.text, {
      orderID: newBooking._id,
      "user-name": newBooking.name,
      amount: newBooking.amount,
      "time-of-booking": moment(newBooking.bookDate).format("LT"),
      "date-of-booking": moment(newBooking.bookDate).format("LL"),
      "user-note": newBooking.note ?? "",
      "booking-url": bookingUrl,
      "user-phone": newBooking.phone,
    });

    return new NextResponse(bookingUrl, { status: 200 });
  } catch (err: any) {
    console.log(err.stack);
    return new NextResponse(err.message || err.stack, {
      status: err.status || 500,
    });
  }
};
