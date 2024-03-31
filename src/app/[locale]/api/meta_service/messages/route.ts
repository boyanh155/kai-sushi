import { sendMessageToManyRecipients } from "@/services/meta";
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
    const result = await sendMessageToManyRecipients(recipientId, _text);

    return NextResponse.json({ result }, { status: 200 });
  } catch (err: any) {
    return new NextResponse(err.message || err.stack, { status: 500 });
  }
};
