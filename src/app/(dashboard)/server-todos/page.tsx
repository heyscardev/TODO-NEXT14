import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { TodosGrid, NewTodo } from "@/todos";

export const metadata: Metadata = {
  title: "Server Todos",
  description: "Todos Pages for get and view the todos with server actions",
};
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({
    orderBy: [{ complete: "asc" }, { createdAt: "desc" }, { id: "asc" }],
  });

  return (
    <div className="p-4 py-0">
      <h1 className=" text-4xl font-medium border-b-[3px] border-b-slate-400 pr-8 pb-2 bg-gradient-to-b from-gray-400 drop-shadow-lg  to-slate-500 inline-block text-transparent bg-clip-text">
        Server Todos
      </h1>
      <NewTodo />
      <TodosGrid todos={todos} />
    </div>
  );
}
