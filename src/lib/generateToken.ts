import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
export interface PayloadDataType {
  id: number;
  isAdmin: boolean;
  username: string;
}
export function generateToken(payloadData: PayloadDataType): string {
  return jwt.sign(payloadData, process.env.JWT_SECRET as string);
}
export function verifyToken(request: NextRequest): PayloadDataType | null {
  let authToken = request.cookies.get("tokenNameInBrowser")?.value;

  if (!authToken) {
    return null;
  }

  try {
    return jwt.verify(
      authToken,
      process.env.JWT_SECRET as string
    ) as PayloadDataType;
  } catch (error) {
    return null; // إرجاع null إذا كان التوكن غير صالح
  }
}
