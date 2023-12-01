import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const take = +(searchParams.get("take") ?? 10);
  const skip = +(searchParams.get("skip") ?? 0);
  if (isNaN(take))
    return NextResponse.json(
      {
        errors: "take must be a number",
      },
      { status: 400 }
    );
  if (isNaN(skip))
    return NextResponse.json(
      {
        errors: "offset must be a number",
      },
      { status: 400 }
    );
  const todos = await prisma.todo.findMany({ skip, take,orderBy:[{complete:"asc"}] });
  return NextResponse.json({ total: todos.length, data: todos });
}
const postSchema = yup.object({
  description: yup.string().required().max(200),
  complete: yup.boolean().optional().default(false), // ! Mostrar algo interesante
});

export async function POST(req: Request) {
  try {
    const { description, complete } = await postSchema.validate(
      await req.json()
    );
    const todo = await prisma.todo.create({ data: { description, complete } });
    return NextResponse.json(todo, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.errors,
      },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  
  const todos = await prisma.todo.deleteMany({ where: { complete:true } });

  return NextResponse.json({data:todos});
}