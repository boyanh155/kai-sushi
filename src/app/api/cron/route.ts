import { NextResponse } from "next/server";

export async function GET() {
  console.log("Hi, I'm a warm cron job");
  return new NextResponse("Hi, keep warm", { status: 200 });
}
