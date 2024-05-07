import { getProductById } from "@/services/product.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  _: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const product = await getProductById(id);
    return NextResponse.json(product, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 || err.status }
    );
  }
};
