import { Todo } from "@prisma/client"

const headers={
    "Accept":"application/json",
    "Content-Type":"application/json",
}
export const getTodos =async (take:string="10",skip:string="0"):Promise<Todo[]>=>{
    const searchParams =  new URLSearchParams({
        take,skip
    })
  const res = await fetch(`/api/todos?${searchParams}`,{ headers })
  const {data } = await res.json() as {data:Todo[]}
  return data
}
export const getTodo =async (id:string):Promise<Todo>=>{
    
  const res = await fetch(`/api/todos/${id}`,{ headers })
  const data = await res.json() as Todo
    return data
}
export const createTodo =async (todo:{complete?:boolean,description:string}):Promise<Todo>=>{

    const res = await fetch(`/api/todos`,{ headers,method:"POST",body:JSON.stringify(todo)})
    const data = await res.json() as Todo
    return data
}
export const updateTodo =async (id:string,todo:Partial<Todo>):Promise<Todo>=>{
    const res = await fetch(`/api/todos/${id}`,{ headers,method:"PUT",body:JSON.stringify(todo)})

    const data = await res.json() as Todo
    return data
}