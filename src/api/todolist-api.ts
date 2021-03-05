import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '6621fc0e-be07-42d9-b090-d92a4129df07'
    }
})

type CommonResponseType<T={}> = {
    data: T
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

export type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export const todolistAPI = {
    getTodolist() {
        return instance.get<Array<TodoType>>('todo-lists')

    },
    updateTodolist(todolistId: string, title: string) {
       return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})

    },
    createTodolist(title: string)  {
        return instance.post<CommonResponseType<{item: TodoType}>>('todo-lists', {title})

    },
    deleteTodolist(todolistId: string)  {
        return instance.delete<CommonResponseType>(`todo-lists${todolistId}`)

    }
}
