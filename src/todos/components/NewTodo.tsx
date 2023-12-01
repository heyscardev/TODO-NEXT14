"use client";

import { FormEvent, useState } from "react";
import { IoAdd, IoTrashOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { createTodo, deleteCompletedTodos } from "../actions/todo-actions";

export const NewTodo = () => {
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const router = useRouter();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isLoading && description.trim().length) {
      setIsloading(true);
      createTodo({ description }).then(() => {
        setIsloading(false);
        setDescription("");
      });
    }
  };
  const onDelete = () => {
    if (!isLoading) {
      setIsloading(true);
      deleteCompletedTodos().then(() => {
        setIsloading(false);
      });
    }
  };
  return (
    <form onSubmit={onSubmit} className="flex w-full items-center my-4">
      <input
        maxLength={40}
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-6/12  pl-3 pr-3 py-2 rounded-s-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="what are you going to do?"
      />
      <button
        disabled={isLoading || !description.trim().length}
        type="submit"
        className="text-2xl disabled:bg-gray-400  flex items-center justify-center rounded-e-lg ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        <IoAdd />
      </button>

      <span className="flex flex-grow"></span>

      <button
        disabled={isLoading}
        onClick={onDelete}
        type="button"
        className="flex items-center disabled:bg-gray-400 justify-center rounded ml-2 bg-gradient-to-r from-red-400 to-yellow-300  p-2 tex-lg text-white hover:bg-amber-400 transition-all"
      >
        <IoTrashOutline size={30} className="mr-2" />
        Delete completed
      </button>
    </form>
  );
};
