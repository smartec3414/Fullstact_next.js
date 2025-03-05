import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  try {
    cookies().delete("tokenNameInBrowser");
    return NextResponse.json(
      { message: "logout successfully" },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
