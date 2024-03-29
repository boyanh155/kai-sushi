import { NextRequest, NextResponse } from "next/server";
import moment from "moment";
import { IBooking } from "../../../../../types/Booking";

export const POST = async (req: NextRequest) => {
  try {
    const body: IBooking = await req.json();
    const { amount, bookDate, name, phone, isNotify } = body;
    console.log({ amount, bookDate, name, phone, isNotify });
    if (!amount || !moment.isDate(bookDate) || !name || !phone || !isNotify)
      return new NextResponse("Bad request", { status: 400 });
    if (moment(bookDate).add(30, "seconds").isBefore(moment())) {
      return new NextResponse("Invalid dat e", { status: 400 });
    }
    const _time = moment(bookDate).toISOString();
  } catch (err: any) {
    return new NextResponse(err.message || err.stack, {
      status: err.status || 500,
    });
  }
};
