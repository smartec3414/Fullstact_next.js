import { NextRequest, NextResponse } from "next/server";
import prisma from "@/PrismaDb/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/generateToken";
import { serialize } from "cookie";
export async function POST(request: NextRequest) {
  try {
    let { email, password }: { email: string; password: string } =
      await request.json();
    let validationLogin = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });
    const { error } = validationLogin.safeParse({
      email,
      password,
    });
    if (error) {
      return NextResponse.json(error.issues[0].message, {
        status: 400,
      });
    }
    let findUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!findUser) {
      return NextResponse.json(
        {
          message: "invalid email or password",
        },
        { status: 400 }
      );
    }
    let passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
      return NextResponse.json(
        {
          message: "invalid email or password",
        },
        { status: 400 }
      );
    }
    let payloadData = {
      id: findUser.id,
      isAdmin: findUser.isAdmin,
      username: findUser.username,
    };
    let token = generateToken(payloadData);
    // set cookie
    const cookie = serialize("tokenNameInBrowser", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    let { password: _, ...userWithoutPassword } = findUser;
    return NextResponse.json(
      {
        user: userWithoutPassword,
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": cookie,
        },
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
