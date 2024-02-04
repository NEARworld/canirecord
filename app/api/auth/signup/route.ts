import { prisma } from "@/lib/prismadb";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const user = await request.json();

    const found = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (found)
      return Response.json("the email or username is duplicate", {
        status: 400,
      });

    const hashedPassword = await bcrypt.hash(user.password, 8);

    const data = await prisma.user.create({
      data: {
        email: user.email,
        username: user.username,
        password: hashedPassword,
      },
    });

    return Response.json(
      { data },
      { status: 200, statusText: "successfully registered!" },
    );
  } catch (e) {
    return Response.json(
      { error: "The request is invalid" },
      { status: 500, statusText: "something went wrong" },
    );
  }
}
