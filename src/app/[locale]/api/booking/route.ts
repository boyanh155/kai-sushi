import { NextRequest, NextResponse } from "next/server";
import moment from "moment";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { amount, bookDate, name, phone, isNotify } = body;
    if (!amount || !moment.isDate(bookDate) || !name || !phone || !isNotify)
      return new NextResponse("Bad request", { status: 400 });
    if (moment(bookDate).add(30, "seconds").isBefore(moment())) {
      return new NextResponse("Invalid date", { status: 400 });
    }
    const _time = moment(bookDate).toISOString();
  } catch (err: any) {
    return new NextResponse(err.message || err.stack, {
      status: err.status || 500,
    });
  }
};
