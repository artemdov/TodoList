import axios from 'axios'
import {FilterValuesType} from "../App";
import {RequestStatusType} from "../state/app-reducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '6621fc0e-be07-42d9-b090-d92a4129df07'
    }
})
//api
export const todolistAPI = {
    getTodolist() {
        return instance.get<Array<TodoType>>('todo-lists')
    },
    updateTodolist(todolistId: string, title: string) {
       return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string)  {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    createTodolist(title: string)  {
        return instance.post<CommonResponseType<{item: TodoType}>>('todo-lists', {title})
    }

}
//types
export type CommonResponseType<T={}> = {
    data: T
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}
export enum TaskStatuses  {
    New,
    InProgress,
    Completed,
    Draft
}
export enum PriorityStatuses {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}
export type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TodolistDomainType =TodoType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}