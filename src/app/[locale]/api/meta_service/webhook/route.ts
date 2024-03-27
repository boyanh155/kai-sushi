import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const query = req.nextUrl.searchParams;

    const mode = query.get("hub.mode");
    const token = query.get("hub.verify_token");
    const challenge = query.get("hub.challenge");

    if (mode === "subscribe" && token === process.env.FB_VERIFY_CODE) {
      return new NextResponse(challenge, { status: 200 });
    } else {
      return new NextResponse(null, { status: 404 });
    }
  } catch (err: any) {
    return new NextResponse(null, err.status || 500);
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    if (body.object === "page") {
        console.log(body)
        console.log(body.entry[0].messaging);
      return new NextResponse("EVENT_RECEIVED", { status: 200 });
    } else {
      return new NextResponse(null, { status: 404 });
    }
  } catch (err: any) {
    return new NextResponse(null, err.status || 500);
  }
};
