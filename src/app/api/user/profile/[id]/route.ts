import { NextRequest, NextResponse } from "next/server";
import prisma from "@/PrismaDb/db";
import { PayloadDataType, verifyToken } from "@/lib/generateToken";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";

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
    let findUser = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        comments: true,
      },
    });
    if (!findUser) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    let authToken = request.cookies.get("tokenNameInBrowser")?.value as string;
    if (!authToken) {
      return NextResponse.json(
        { message: "un Authenticated" },
        { status: 400 }
      );
    }
    let decodedToken = jwt.verify(
      authToken,
      process.env.NEXT_PUBLIC_JWT_SECRET as string
    ) as PayloadDataType;

    if (findUser.id === decodedToken.id) {
      await prisma.user.delete({ where: { id: findUser.id } });
      const comments = findUser.comments.map((comment) => comment.id);
      await prisma.comment.deleteMany({ where: { id: { in: comments } } });
      return NextResponse.json(
        {
          message: "deleted successfully",
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "forbidden doing this only for the owner",
        },
        { status: 400 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        message: "internal server error " + err,
      },
      {
        status: 500,
      }
    );
  }
}
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
    let findUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!findUser) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    // decoded to check if the user who logged in who send the token or not
    let decodedToken = verifyToken(request);
    if (decodedToken && findUser.id === decodedToken.id) {
      let { password, ...userData } = findUser;
      return NextResponse.json(userData, {
        status: 200,
      });
    }
    return NextResponse.json(
      {
        message: "forbidden doing this only for the owner",
      },
      { status: 400 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "internal server error " + err,
      },
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
  try {
    let body = await request.json();
    let validationLogin = z.object({
      email: z.string().email(),
      password: z.string().min(6, { message: "password must be at least 6" }),
      username: z.string().min(3),
    });
    const { error } = validationLogin.safeParse(body);
    if (error) {
      return NextResponse.json(error.issues[0].message, {
        status: 400,
      });
    }
    let findUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!findUser) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    // decoded to check if the user who logged in who send the token or not
    let decodedToken = verifyToken(request);
    if (body.password) {
      let salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }
    if (decodedToken && findUser.id === decodedToken.id) {
      let updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          username: body.username,
          email: body.email,
          password: body.password,
        },
      });
      let { password, ...userData } = updatedUser;
      return NextResponse.json(
        { ...userData },
        {
          status: 200,
        }
      );
    }
    // accept only the owner
    return NextResponse.json(
      {
        message: "forbidden doing this only for the owner",
      },
      { status: 400 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "internal server error " + err,
      },
      {
        status: 500,
      }
    );
  }
}
