'use client';

import { FormEvent, useState } from "react";
import { IoAdd, IoTrashOutline } from "react-icons/io5";
import { createTodo } from "../helpers/todos";
import { useRouter } from "next/navigation";


export const NewTodo = () => { 
    const [description,setDescription] = useState<string>("")
    const [isLoading,setIsloading] = useState<boolean>(false)
    const router =useRouter()
       const onSubmit = (e:FormEvent)=>{
        e.preventDefault()
if(!isLoading && description.trim().length){
    setIsloading(true)
    createTodo({description}).then(()=>{
        setIsloading(false);
        setDescription("")
        router.refresh()
    })
    
}
}
  return (
    <form onSubmit={onSubmit} className='flex w-full my-4'>
      <input type="text"
      value={description}
      onChange={(e)=> setDescription(e.target.value)}
        className="w-6/12  pl-3 pr-3 py-2 rounded-s-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?" />
      <button disabled={isLoading || !description.trim().length }  type='submit' className="text-2xl disabled:bg-gray-400  flex items-center justify-center rounded-e-lg ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
        <IoAdd />
      </button>
      
      <span className='flex flex-grow'></span>

      <button 
      
        //TODO: onClick={ () => deleteCompleted() }
        type='button' className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
        <IoTrashOutline />
        Delete
      </button>


    </form>
  )
}