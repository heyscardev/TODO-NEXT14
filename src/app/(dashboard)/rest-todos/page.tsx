import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { TodosGrid, NewTodo } from "@/todos";
import { Revalidate } from "next/dist/server/lib/revalidate";

export const metadata: Metadata = {
  title: "Rest Todos",
  description: "Todos Pages for get and view the todos with rest api",
};
export const dynamic = "force-dynamic";

export const revalidate: Revalidate = 0;

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({
    orderBy: [{ complete: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="p-4 py-0">
      <h1 className=" text-4xl font-medium border-b-[3px] border-b-slate-400 pr-8 pb-2 bg-gradient-to-b from-gray-400 drop-shadow-lg  to-slate-500 inline-block text-transparent bg-clip-text">
        Rest Todos
      </h1>
      <NewTodo />
      <TodosGrid todos={todos} />
    </div>
  );
}
