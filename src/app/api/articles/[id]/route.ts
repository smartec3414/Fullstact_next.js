import prisma from "@/PrismaDb/db";
import { verifyToken } from "@/lib/generateToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const article = await prisma.article.findUnique({
      where: { id: Number(id) },
      include: {
        comments: {
          include: {
            userComments: {
              select: { id: true, username: true, email: true, isAdmin: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(article, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const article = await prisma.article.findUnique({
    where: { id: Number(id) },
  });

  if (!article) {
    return NextResponse.json({ message: "Article not found" }, { status: 404 });
  }

  const user = verifyToken(request);
  if (!user || !user.isAdmin) {
    return NextResponse.json(
      { message: "Unauthorized access denied" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const updatedArticle = await prisma.article.update({
    where: { id: Number(id) },
    data: { title: body.title, desc: body.desc },
  });

  return NextResponse.json(updatedArticle, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const article = await prisma.article.findUnique({
      where: { id: Number(id) },
      include: { comments: true },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    const user = verifyToken(request);
    if (!user || !user.isAdmin) {
      return NextResponse.json(
        { message: "Unauthorized access denied" },
        { status: 401 }
      );
    }

    await prisma.article.delete({ where: { id: Number(id) } });
    await prisma.comment.deleteMany({
      where: { id: { in: article.comments.map((c) => c.id) } },
    });

    return NextResponse.json({ message: "Article deleted" }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
