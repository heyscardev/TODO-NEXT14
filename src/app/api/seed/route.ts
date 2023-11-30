import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  console.log("i execute");
  await prisma.todo.createMany({
    data: [
      { description: "Piedra del alma" },
      { description: "Piedra del alma1" },
      { description: "Piedra del alma2" },
      { description: "Piedra del alma3" },
      { description: "Piedra del alma4" },
      { description: "Piedra del alma5" },
      { description: "Piedra del alma6" },
      { description: "Piedra del alma7" },
      { description: "Piedra del alma8" },
      { description: "Piedra del alma9" },
      { description: "Piedra del alma10" },
      { description: "Piedra del alma11" },
      { description: "Piedra del alma12" },
      { description: "Piedra del alma13" },
      { description: "Piedra del alma7" },
      { description: "Piedra del alma7" },
      { description: "Piedra del alma7" },
      { description: "Piedra del alma7" },
      { description: "Piedra del alma7" },
      { description: "Piedra del alma7" },
    ],
  });
  return NextResponse.json({ message: "Seed Exeecuted" });
}
