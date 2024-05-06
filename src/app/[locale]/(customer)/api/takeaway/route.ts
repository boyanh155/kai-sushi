import { getMenuTakeAway } from "@/services/takeaway.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_: NextRequest) => {
  try {
    const menu = await getMenuTakeAway();
    const _menu = menu?.map(({
      products,
      ...v
    }) => {
      
      return {
        ...v,
        children: products,
      };
    });
    return NextResponse.json(_menu, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
