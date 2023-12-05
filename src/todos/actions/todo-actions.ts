"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getUserSessionServer } from "../../auth/actions/auth-actions";
export const sleep = async (seconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};
export const updateTodo = async (
  id: string,
  { description, complete }: Partial<Todo>
): Promise<Todo> => {
  const user = await getUserSessionServer();
  if (!user || !user.id) throw Error("user authenticated is required");
  //   await sleep(3);
  //   throw new Error("error");
  const todo = await prisma.todo.findFirst({ where: { id, userId: user.id } });
  if (!todo) {
    throw `Todo with ID ${id} Not found`;
  }
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete, description },
  });

  revalidatePath("/");
  return updatedTodo;
};

interface CreatingTodo {
  complete?: boolean;
  description: string;
}
export const createTodo = async ({
  description,
  complete,
}: CreatingTodo): Promise<Todo> => {
  const user = await getUserSessionServer();
  if (!user || !user.id) throw Error("user authenticated is required");
  const data = await prisma.todo.create({
    data: { complete, description, userId: user.id },
  });

  revalidatePath("/");
  return data;
};
export const deleteCompletedTodos = async (): Promise<any> => {
  const user = await getUserSessionServer();
  if (!user || !user.id) throw Error("user authenticated is required");
  const data = await prisma.todo.deleteMany({
    where: { complete: true, userId: user.id },
  });

  revalidatePath("/");
  return data;
};
