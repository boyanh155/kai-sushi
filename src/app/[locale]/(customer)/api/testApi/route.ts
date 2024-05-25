import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = req.nextUrl;
  return NextResponse.json(body);
};
