import { menuHeaderModel } from "@/models/Menu";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    headerId: string;
  };
};
export const DELETE = async (
  req: NextRequest,
  { params: { headerId } }: Params
) => {
  try {
    if (!headerId) throw { status: 400, message: "Missing parameter" };
    await menuHeaderModel.deleteOne({
      _id: headerId,
    });
    return new NextResponse("success", { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: err.status || 500,
        message: err.message || err.message,
      },
      { status: err.status || 500 }
    );
  }
};
