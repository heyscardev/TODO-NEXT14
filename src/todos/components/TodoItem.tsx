"use client"
import type { Todo } from "@prisma/client";
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoCheckboxSharp, IoCheckmark, IoSquareOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";

import { useState } from "react";
interface Props {
  todo: Todo;
  updateTodo:(id:string,todo:Partial<Todo>) =>Promise<Todo | void>
}
export const TodoItem = ({ todo ,updateTodo}: Props) => {
    const [isUpdating,setIsUpdating] = useState(false)
    const update = async(todoToUpdate:Partial<Todo>)=>{
        if(!isUpdating){
            setIsUpdating(true)
            await updateTodo(todo.id,todoToUpdate)
            
            setIsUpdating(false)
        }
     
    }
    const onUpdateDescription =  (description?:string)=>description && description !== todo.description ?update({description}):null
    
  return (
    <div className={`${todo.complete ? styles.todoDone : styles.todoPending} `}>

     <div className={`flex flex-col  sm:flex-row justify-between w-full items-center space-x-  `}>
        <div onClick={()=>update({complete:!todo.complete})}
         className={`
        flex p-2 rounded-md cursor-pointer
        hover:bg-white  text-4xl 
        `}>{isUpdating ? <BiLoaderAlt className="text-cyan-800 text-3xl animate-spin" />:(todo.complete ?<IoCheckboxOutline className="text-neutral-800"  />:<IoSquareOutline className="text-neutral-800 " />)}
        </div>
        <input 
        onBlur={(e)=>onUpdateDescription(e.target.value)}
        onKeyUpCapture={(e)=>{
            if(e.key === 'Enter' )
            e.currentTarget.blur()
        }}
        maxLength={20}
         defaultValue={todo.description}  className={`${todo.complete ?"line-through focus:no-underline":""} text-center sm:text-left shadow-inner shadow-neutral-400  bg-white p-4 min-w-[60%]   rounded-xl`}/>
  
     </div>
   
    </div>
  );
};
