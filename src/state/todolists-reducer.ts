import {FilterValuesType, TodolistType} from "../App"
import {todolistAPI, TodolistDomainType, TodoType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setStatusAC, setStatusActionType} from "./app-reducer";

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type setTodolistACType = ReturnType<typeof setTodolistsAC>

export type ActionType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

const initialState: Array<TodolistDomainType> = []


export const todolistsReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOS':
            return action.todos.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [...state, {...action.todolistId, filter: 'all', entityStatus: "idle"}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl,entityStatus: action.status} : tl)
        default :
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId} as const)
export const addTodolistAC = (todolistId: TodoType) => ({type: 'ADD-TODOLIST', todolistId} as const)
export const ChangeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title,
    id
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id,
    status
} as const)
export const setTodolistsAC = (todos: Array<TodoType>) => ({type: 'SET-TODOS', todos} as const)

//thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionType | setStatusActionType>) => {
    dispatch(setStatusAC('loading'))
    //dispatch(changeTodolistEntityStatusAC( 'loading'))
    todolistAPI.getTodolist()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setStatusAC('succeeded'))
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionType | setStatusActionType>) => {
    dispatch(setStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setStatusAC('succeeded'))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionType | setStatusActionType>) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setStatusAC('succeeded'))
        })
}
export const changeTodolistTC = (id: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(ChangeTodolistTitleAC(id, title))
        })
}

