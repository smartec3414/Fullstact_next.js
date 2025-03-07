import prisma from "@/PrismaDb/db";
import { verifyToken } from "@/lib/generateToken";
import { Article } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  try {
    let oneArt = await prisma.article.findUnique({
      where: { id: +id },
      include: {
        comments: {
          include: {
            userComments: {
              select: {
                id: true,
                username: true,
                email: true,
                isAdmin: true,
              },
            },
          },

          orderBy: { createdAt: "desc" },
        },
      },
    });
    if (!oneArt) {
      return NextResponse.json(
        {
          message: "article not found",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(oneArt, {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      { message: "internal server error" },
      {
        status: 500,
      }
    );
  }
}
export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  let oneArt: Article | null = await prisma.article.findUnique({
    where: { id: +id },
  });
  if (!oneArt) {
    return NextResponse.json(
      {
        message: "article not found",
      },
      {
        status: 404,
      }
    );
  }
  const user = verifyToken(request);
  if (!user || user.isAdmin == false) {
    return NextResponse.json(
      { message: "unauthorized access denied" },
      { status: 401 }
    );
  }
  const body: { title: string; desc: string } = await request.json();
  let updateArt: Article = await prisma.article.update({
    where: { id: +id },
    data: {
      title: body.title,
      desc: body.desc,
    },
  });
  return NextResponse.json(updateArt, {
    status: 200,
  });
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
    let oneArt = await prisma.article.findUnique({
      where: { id: +id },
      include: {
        comments: true,
      },
    });
    if (!oneArt) {
      return NextResponse.json(
        {
          message: "article not found",
        },
        {
          status: 404,
        }
      );
    }
    const user = verifyToken(request);
    if (!user || user.isAdmin == false) {
      return NextResponse.json(
        { message: "unauthorized access denied" },
        { status: 401 }
      );
    }
    await prisma.article.delete({ where: { id: +id } });
    const comments = oneArt.comments.map((comment) => comment.id);
    await prisma.comment.deleteMany({ where: { id: { in: comments } } });
    return NextResponse.json(
      { message: "article deleted" },
      {
        status: 200,
      }
    );
  } catch (e) {
    return NextResponse.json(
      { message: "internal server error" },
      {
        status: 500,
      }
    );
  }
}
