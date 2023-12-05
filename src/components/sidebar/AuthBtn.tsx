"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { CiLogin, CiLogout } from "react-icons/ci";
import { AiOutlineLoading } from "react-icons/ai";
export const AuthBtn = () => {
  const { status, data } = useSession();
  if (status === "loading")
    return (
      <div className="flex justify-center w-full">
        <AiOutlineLoading size={30} className="animate-spin text-cyan-600" />
      </div>
    );
  if (status === "authenticated")
    return (
      <button
        onClick={() => signOut()}
        className="px-4 py-3 dark:text-white flex items-center space-x-4 rounded-md text-gray-600 group"
      >
        <CiLogout size={30} />
        <span className="group-hover:text-gray-700 dark:text-white">
          Logout
        </span>
      </button>
    );
  return (
    <button
      onClick={() => signIn()}
      className="px-4 py-3 dark:text-white flex items-center space-x-4 rounded-md text-gray-600 group"
    >
      <CiLogin size={30} />
      <span className="group-hover:text-gray-700 dark:text-white">SigIn</span>
    </button>
  );
};
