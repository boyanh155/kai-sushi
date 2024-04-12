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
    });
    if (!booking) throw { message: "Booking not found", status: 404 };

    return NextResponse.json(booking, { status: 200 });
  } catch (err: any) {
    return new NextResponse(err.message || "Interval server", {
      status: err.status || 500,
    });
  }
};

export const DELETE = async (_: NextRequest, { params: { id } }: Props) => {
  try {
    await connectDB();
    await bookingModel.findByIdAndUpdate(id, {
      state: "cancelled",
    });
    return new NextResponse(null, { status: 204 });
  } catch (err: any) {
    return new NextResponse(err.message || "Interval server", {
      status: err.status || 500,
    });
  }
};
