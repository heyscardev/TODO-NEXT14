"use client";
import type { Todo } from "@prisma/client";
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";
import { startTransition, useEffect, useOptimistic } from "react";
import { useState } from "react";
interface Props {
  todo: Todo;
  updateTodo: (id: string, todo: Partial<Todo>) => Promise<Todo | void>;
}
interface OptTodo extends Todo {
  loading: boolean;
}
export const TodoItem = ({ todo, updateTodo }: Props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoOpt, updateTodoOpt] = useOptimistic(
    todo,
    (state: Todo, newTodoValue: Partial<Todo>): OptTodo => ({
      ...state,
      ...newTodoValue,
      loading: true,
    })
  );
  const [description, setDescription] = useState(todoOpt.description);
  useEffect(() => {
    startTransition(() => updateTodoOpt(todo));
    setDescription(todo.description);
  }, [todo, updateTodoOpt]);

  const update = async (todoToUpdate: Partial<Todo>) => {
    setIsUpdating(true);
    try {
      startTransition(() => updateTodoOpt(todoToUpdate));
      await updateTodo(todoOpt.id, todoToUpdate);
    } catch (e) {}
    // updateTodoOpt(todo);
    setIsUpdating(false);
  };
  const onUpdateDescription = () =>
    description && description !== todoOpt.description
      ? update({ description })
      : null;

  return (
    <div
      className={`${
        todoOpt.complete ? styles.todoDone : styles.todoPending
      } relative `}
    >
      {isUpdating && (
        <BiLoaderAlt className="text-cyan-800 animate-spin text-xs absolute bottom-1 right-1" />
      )}
      <div
        className={`flex flex-col  sm:flex-row justify-between w-full items-center space-x-  `}
      >
        <div
          onClick={() => update({ complete: !todoOpt.complete })}
          className={`
        flex p-2 rounded-md cursor-pointer
        hover:bg-white  text-4xl 
        `}
        >
          {todo.complete ? (
            <IoCheckboxOutline className="text-neutral-800" />
          ) : (
            <IoSquareOutline className="text-neutral-800 " />
          )}
        </div>
        <input
          onBlur={onUpdateDescription}
          onKeyUpCapture={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
          }}
          maxLength={40}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${
            todoOpt.complete ? "line-through focus:no-underline" : ""
          } text-center sm:text-left shadow-inner shadow-neutral-400  bg-white p-4 min-w-[60%]   rounded-xl`}
        />
      </div>
    </div>
  );
};
