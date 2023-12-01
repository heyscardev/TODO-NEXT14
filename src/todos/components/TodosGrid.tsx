"use client";
import { type Todo } from "@prisma/client";
import { updateTodo } from "../helpers/todos";
import { TodoItem } from "./TodoItem";
import { useRouter } from "next/navigation";

interface Props {
  todos?: Todo[];
}
export const TodosGrid = ({ todos = [] }: Props) => {
  const updaTodo = async (id: string, todo: Partial<Todo>) => {
    await updateTodo(id, todo);
    router.refresh();
  };
  const router = useRouter();
  return todos.length ? (
    <div className="  grid grid-cols-4 max-md:grid-cols-1  max-lg:grid-cols-2 gap-5">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} updateTodo={updaTodo} />
      ))}
      {/* <code className=" text-neutral-300 whitespace-pre ">
        {JSON.stringify(todos, null, " ")}
      </code> */}
    </div>
  ) : (
    <div className="text-cyan-500 mt-20 drop-shadow-xl shadow-cyan-400 text-3xl  flex-grow w-full flex justify-center items-center">
      Nothing for doing!
    </div>
  );
};
