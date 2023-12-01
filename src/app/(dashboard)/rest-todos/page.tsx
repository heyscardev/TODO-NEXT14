import { type Metadata } from "next";
import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";
import { NewTodo } from "@/todos/components/NewTodo";

export const metadata: Metadata = {
  title: "Rest Todos",
  description: "Todos Pages for get and view the todos with rest api",
};
export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({orderBy:[{complete:"asc"},{createdAt:"desc"}] });

  return (
    <div className="p-4">
      {/* TODO: add form to add todos */}
      <h1 className="mb-3">Rest Todos</h1>
      <NewTodo />
      <TodosGrid todos={todos} />
    </div>
  );
}
