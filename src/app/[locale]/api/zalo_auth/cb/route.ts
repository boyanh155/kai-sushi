import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  query: {
    state?: string;
  };
};

type ZaloAccessTokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_token_expires_in: string;
};

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams;
  console.log(query);
  try {
    const code = query.get("code");
    if (!code) {
      throw new Error("Missing code");
    }

    // get zalo access token
    const _res = await axios.post<ZaloAccessTokenResponse>(
      `https://oauth.zaloapp.com/v4/access_token `,
      {
        app_id: process.env.ZALO_APP_ID,
        code: code,
        grant_type: "authorization_code",
      },
      {
        headers: {
          secret_key: "3mC3IXDSg3VLVT7Y3VlE",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const {
      access_token,
      refresh_token,
      expires_in,
      refresh_token_expires_in,
    } = _res.data;
    console.log(access_token);
    console.log(refresh_token);
    console.log(expires_in);
    console.log(refresh_token_expires_in);
    return NextResponse.json({}, { status: 200 });
    // store db
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

//     const data = await zaloAuthModel.findOne({ code });
//     if (!data) {
//       throw new Error("Invalid code");
//     }
//     return NextResponse.redirect(
//       `${process.env.NEXT_PUBLIC_WEB_URL}/auth/zalo?access_token=${data.access_token}`
//     );
//   } catch (error: any) {
//     console.log(error);
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
