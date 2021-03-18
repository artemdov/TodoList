import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '6621fc0e-be07-42d9-b090-d92a4129df07'
    }
})

type ResponseType<T={}> = {
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
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    todoListId: string
}
export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}
type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const todolistAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    updateTask(todolistId: string,  id: string, model: UpdateTaskModelType) {
       return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${id}`, {model})
    },
    deleteTask(todolistId: string, id: string)  {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${id}`)
    },
    createTask(todolistId: string, title: string)  {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
    }

}
