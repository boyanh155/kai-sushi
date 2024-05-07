import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  console.log(req.headers.get("accept-language"));
  const body = req.nextUrl;
  console.log();
  return NextResponse.json(body);
};
