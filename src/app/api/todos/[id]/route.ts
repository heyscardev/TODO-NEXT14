import { getUserSessionServer } from "@/auth/actions/auth-actions";
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
  const user = await getUserSessionServer();
  if (!user || !user.id)
    return NextResponse.json({ error: "no authenticated" }, { status: 401 });
  const { id } = params;
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo)
    return NextResponse.json({ message: "Not Found" }, { status: 404 });

  if (todo.userId !== user.id)
    return NextResponse.json(
      { message: "don't have permissions" },
      { status: 403 }
    );
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

export async function DELETE(request: Request, { params }: Args) {
  const user = await getUserSessionServer();
  if (!user || !user.id)
    return NextResponse.json({ error: "no authenticated" }, { status: 401 });
  const { id } = params;
  const todo = await prisma.todo.delete({ where: { id, userId: user.id } });
  if (!todo)
    return NextResponse.json({ message: "Not Found" }, { status: 404 });

  return NextResponse.json(todo);
}
