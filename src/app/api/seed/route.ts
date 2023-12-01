import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();

  const factory = Array.from({ length: 50 }).map((v, i) => ({
    description: "Todo " + (i + 1),
  }));
  const total = await prisma.todo.createMany({ data: factory });

  return NextResponse.json({ message: "Seed Exeecuted", total });
}
