import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const {
      recipientId,
      text,
      vars,
    }: { recipientId: string[]; text: string; vars: Record<string, string> } =
      body;
    if (!recipientId || !text) {
      return { status: 400, message: "Bad Request" };
    }
    let _text = text;
    if (vars) {
      for (const _var in vars) {
        _text = _text.replace(new RegExp(`\\[${_var}\\]`, "g"), vars[_var]);
      }
    }

    const _promiseArr = recipientId.map(
      (_id: string) =>
        new Promise((resolve, reject) =>
          axios
            .post(
              `https://graph.facebook.com/v19.0/me/messages`,
              {},
              {
                params: {
                  recipient: { id: _id },
                  message: { text: _text },
                  message_type: "RESPONSE",
                  access_token: process.env.FB_PAGE_ACCESS_TOKEN,
                },
              }
            )
            .then((res) => {
              resolve(res.data);
            })
            .catch((err: any) => {
              reject(err);
            })
        )
    );
    const result = await Promise.allSettled(_promiseArr);

    return NextResponse.json({ result }, { status: 200 });
  } catch (err: any) {
    return new NextResponse(err.message || err.stack, err.status || 500);
  }
};
