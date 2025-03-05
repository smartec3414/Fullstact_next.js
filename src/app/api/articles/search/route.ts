import { NextRequest, NextResponse } from "next/server";
import prisma from "@/PrismaDb/db";

export async function GET(request: NextRequest) {
  try {
    let searchText = request.nextUrl.searchParams.get("searchText");
    let art;
    if (searchText) {
      art = await prisma?.article.findMany({
        where: {
          title: {
            contains: searchText,
            mode: "insensitive",
          },
        },
      });
    } else {
      art = await prisma?.article.findMany();
    }
    return NextResponse.json(art, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "internal server error" + e },
      { status: 500 }
    );
  }
}
