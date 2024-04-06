import connectDB from "@/libs/connectDb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();
    return new NextResponse("Hello World", { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
