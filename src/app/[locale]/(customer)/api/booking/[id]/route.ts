import connectDB from "@/libs/connectDb";
import bookingModel from "@/models/Booking";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: {
    id: string;
  };
};
export const GET = async (_: NextRequest, { params: { id } }: Props) => {
  try {
    await connectDB();
    const booking = await bookingModel.findById(id, {
      expiredDate: 0,
      state: 0,
    });

    return NextResponse.json(booking, { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, { status: 500 });
  }
};
