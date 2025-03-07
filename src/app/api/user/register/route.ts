import { NextRequest, NextResponse } from "next/server";
import prisma from "@/PrismaDb/db";
import { z } from "zod";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/generateToken";
import { serialize } from "cookie";
export async function POST(request: NextRequest) {
  try {
    let { username, email, password }: User = await request.json();
    let validationRegister = z.object({
      username: z
        .string({
          required_error: "username is required",
        })
        .min(3, { message: "username must be at least 3 characters long" }),
      email: z.string().email(),
      password: z.string().min(6),
    });
    const { error } = validationRegister.safeParse({
      username,
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
    if (findUser) {
      return NextResponse.json(
        { message: "user already exist" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const HashedPassword = await bcrypt.hash(password, salt);
    let newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: HashedPassword,
        isAdmin: false, // ← أضف هذا السطر
      },
      select: {
        username: true,
        email: true,
        id: true,
        createdAt: true,
        updatedAt: true,
        isAdmin: true, // ← أضف هذا السطر لضمان إرجاع القيمة
      },
    });
    let token = generateToken({ id: newUser.id, username, isAdmin: false });
    // set cookie
    const cookie = serialize("tokenNameInBrowser", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    return NextResponse.json(
      {
        userData: {
          ...newUser,
        },
      },
      {
        status: 201,
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
