import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, params: any) => {
  try {
    const query = request.nextUrl.searchParams;
    const mode = query.get("hub.mode");
    const token = query.get("hub.verify_token");
    const challenge = query.get("hub.challenge");

    if (mode === "subscribe" && token === process.env.FB_VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      return new NextResponse(challenge, { status: 200 });
    } else {
      throw { status: 403 };
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};

export const POST = async (request: Request, params: any) => {
  try {
    const body = await request.json();
    console.log(body);

    if (body.object === "page") {
      // Returns a '200 OK' response to all requests
      console.log(body);
      console.log(body.entry[0].messaging);
      return NextResponse.json("EVENT_RECEIVED", { status: 200 });
    } else {
      // Return a '404 Not Found' if event is not from a page subscription
      throw { status: 404 };
    }
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { message: err.message || err.stack },
      { status: err.status || 500 }
    );
  }
};
