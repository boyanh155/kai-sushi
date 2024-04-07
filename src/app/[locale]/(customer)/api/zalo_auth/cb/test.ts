// import axios from "axios";
// import { NextRequest, NextResponse } from "next/server";


// type ZaloAccessTokenResponse = {
//   access_token: string;
//   refresh_token: string;
//   expires_in: number;
//   refresh_token_expires_in: string;
// };

// export async function GET(request: NextRequest) {
//   // const query = request.nextUrl.searchParams;
// // 
//   try {
//     // const code = query.get("code");
//     // const oa_id = query.get("oa_id");
//     // if (!code) {
//     //   throw new Error("Missing code");
//     // }

//     // get zalo access token
//     // const _res = await axios.post<ZaloAccessTokenResponse>(
//     //   `https://oauth.zaloapp.com/v4/oa/access_token`,
//     //   {
//     //     app_id: process.env.ZALO_APP_ID,
//     //     code,
//     //     oa_id,
//     //     grant_type: "authorization_code",
//     //   },
//     //   {
//     //     headers: {
//     //       secret_key: "3mC3IXDSg3VLVT7Y3VlE",
//     //       "Content-Type": "application/x-www-form-urlencoded",
//     //     },
//     //   }
//     // );
//     // const {
//     //   access_token,

//     // } = _res.data;
//     // console.log(access_token);
//     // console.log(refresh_token);
//     // console.log(expires_in);
//     // console.log(refresh_token_expires_in);
//     return NextResponse.json({}, { status: 200 });
//     // store db
//   } catch (err: any) {
//     return NextResponse.json({ message: err.message }, { status: 500 });
//   }
// }

// export async function POST(_: NextRequest) {
//   return new NextResponse("", { status: 200 });
// }
