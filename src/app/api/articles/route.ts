import prisma from "@/PrismaDb/db";
import { AuthorBody } from "@/PrismaDb/types";
import { verifyToken } from "@/lib/generateToken";
import { Article, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    let pgNum: number = Number(request.nextUrl.searchParams.get("page"));
    let art;
    if (pgNum) {
      art = await prisma.article.findMany({
        skip: (pgNum - 1) * 6,
        take: 6,
      });
      return NextResponse.json(
        {
          length: art.length,
          data: art,
        },
        {
          status: 200,
        }
      );
    }
    art = await prisma.article.findMany();
    return NextResponse.json(
      {
        length: art.length,
        data: art,
      },
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
export async function POST(request: NextRequest) {
  try {
    const body: AuthorBody = await request.json();
    const validation = z.object({
      title: z
        .string({
          required_error: "title is required",
          invalid_type_error: "title must be a string",
        })
        .min(3),
      desc: z.string().min(3),
    });
    const { error } = validation.safeParse(body);
    if (error) {
      return NextResponse.json(error.issues[0].message, {
        status: 400,
      });
    }
    const user = verifyToken(request);
    if (!user || user.isAdmin == false) {
      return NextResponse.json(
        { message: "unauthorized access denied" },
        { status: 401 }
      );
    }
    let newArt: Article = await prisma.article.create({
      data: {
        title: body.title,
        desc: body.desc,
      },
    });
    return NextResponse.json(newArt, {
      status: 201,
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
