import { type Metadata } from "next";
import prisma from "@/lib/prisma";
import { TodosGrid } from "@/todos";

export const metadata: Metadata = {
  title: "Rest Todos",
  description: "Todos Pages for get and view the todos with rest api",
};
export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({orderBy:[{id:"asc"},{updatedAt:"desc"}] });

  return (
    <div>
      {/* TODO: add form to add todos */}
      <h1 className="mb-3">Rest Todos</h1>
      <TodosGrid todos={todos} />
    </div>
  );
}
