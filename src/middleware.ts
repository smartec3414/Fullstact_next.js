import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  async function middleware(request: NextRequest) {
    let authToken = request.cookies.get("tokenNameInBrowser")?.value as string;
    if (!authToken) {
      return NextResponse.json(
        { message: "un Authenticated" },
        { status: 400 }
      );
    }
  },
  {
    // لو كله تمام وديه للي هو عاوزه
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/api/user/profile/:path*"],
};
