import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();
  const factory = Array.from({ length: 10 }).map((v, i) => ({
    description: "Todo " + (i + 1),
  }));
  const user = await prisma.user.create({
    data: {
      email: "chango@gmail.com",
      name: "changuito Perez",
      password: bcrypt.hashSync("12345678"),
      roles: ["admin", "client", "super-user"],
      todos: { create: factory },
    },
  });

  return NextResponse.json({ message: "Seed Exeecuted", user });
}
