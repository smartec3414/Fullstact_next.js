import { NextRequest, NextResponse } from "next/server";
import prisma from "@/PrismaDb/db";
import { verifyToken } from "@/lib/generateToken";
import { z } from "zod";
export async function POST(request: NextRequest) {
  try {
    // 1- المستخدم مسجل ولا لا
    // 2- فالديشن
    // 3- اضافة التعليق
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "unauthorized please login" },
        { status: 401 }
      );
    }
    let body = await request.json();
    let commentValidation = z.object({
      text: z.string({
        required_error: "text is required",
      }),
      articleId: z.number(),
    });
    const validation = commentValidation.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.issues[0].message, {
        status: 400,
      });
    }
    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        userId: user.id,
        articleId: body.articleId,
      },
    });
    return NextResponse.json(newComment, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { message: "internal server error" + e },
      { status: 500 }
    );
  }
}
export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user || user.isAdmin == false) {
      return NextResponse.json(
        { message: "unauthorized access denied" },
        { status: 401 }
      );
    }

    const getComments = await prisma.comment.findMany();
    return NextResponse.json(getComments, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "internal server error" + e },
      { status: 500 }
    );
  }
}
