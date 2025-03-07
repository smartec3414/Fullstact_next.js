import { NextRequest, NextResponse } from "next/server";
import prisma from "@/PrismaDb/db";
import { z } from "zod";
import { verifyToken } from "@/lib/generateToken";

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  try {
    let comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 }
      );
    }
    const user = verifyToken(request);
    if (!user || user.id !== comment.userId) {
      return NextResponse.json(
        { message: "unauthorized access denied" },
        { status: 401 }
      );
    }
    let body = await request.json();
    let validationComment = z.object({
      text: z
        .string({
          required_error: "text is required",
        })
        .min(3, { message: "text must be at least 3 characters long" }),
    });
    const { error } = validationComment.safeParse(body);
    if (error) {
      return NextResponse.json(error.issues[0].message, {
        status: 400,
      });
    }
    const updComment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: {
        text: body.text,
      },
    });
    return NextResponse.json(updComment, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "internal server error" + e },
      { status: 500 }
    );
  }
}
export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;
  try {
    let comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 }
      );
    }
    const user = verifyToken(request);
    if (!user || user.id !== comment.userId || user.isAdmin == false) {
      return NextResponse.json(
        { message: "unauthorized access denied" },
        { status: 401 }
      );
    }

    await prisma.comment.delete({ where: { id: parseInt(id) } });
    return NextResponse.json("comment deleted", { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "internal server error" + e },
      { status: 500 }
    );
  }
}
