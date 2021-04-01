import axios from 'axios'
import {PriorityStatuses, TaskStatuses} from "./todolist-api";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '6621fc0e-be07-42d9-b090-d92a4129df07'
    }
})

export type ResponseType<T={}> = {
    data: T
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

export type TaskType = {
    id: string
    title: string
    addedDate: string
    order: number
    description: string
    status: TaskStatuses
    priority: PriorityStatuses
    startDate: string
    deadline: string
    todoListId: string
}
export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: PriorityStatuses
    startDate: string
    deadline: string
}

export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    updateTask(todolistId: string,  taskId: string, model: UpdateTaskModelType) {
        debugger
       return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId: string, id: string)  {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${id}`)
    },
    createTask(todolistId: string, title: string)  {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    }

}
