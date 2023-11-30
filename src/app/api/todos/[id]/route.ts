import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";
interface Args {
  params: {
    id: string;
  };
}
export async function GET(request: Request, { params }: Args) {
  const { id } = params;
  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo)
    return NextResponse.json({ message: "Not Found" }, { status: 404 });

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  description: yup.string().optional().max(200),
  complete: yup.boolean().optional(), // ! Mostrar algo interesante
});
export async function PUT(request: Request, { params }: Args) {
  const { id } = params;
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo)
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  try {
    const { description, complete } = await putSchema.validate(
      await request.json()
    );
    const updadatedTodo = await prisma.todo.update({
      where: { id },
      data: { description, complete },
    });

    return NextResponse.json(updadatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
