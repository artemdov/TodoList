import {FilterValuesType} from "../App"
import {todolistAPI, TodolistDomainType, TodoType} from "../api/todolist-api";
import {Dispatch} from "redux";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolistId: TodoType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}


export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}
type ActionType =
    ChangeTodolistFilterActionType
    | ChangeTodolistTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | setTodolistACType

const initialState: Array<TodolistDomainType> = []


export const todolistsReducer = (state = initialState, action: ActionType): Array<TodoType> => {
    switch (action.type) {
        case 'SET-TODOS': {
            return action.todos.map(tl => {
                return {
                    ...tl,
                    filter: 'all'
                }
            })
        }
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            const newTodolist: TodolistDomainType = {...action.todolistId, filter: 'all'}
            return [...state, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
                return [...state]
            }
            return state
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
                return [...state]
            }
            return state
        }
        default:

            return state

    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', todolistId: todolistId}
}
export const addTodolistAC = (todolistId: TodoType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST',  todolistId}
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title,  id}
}
export const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id}
}
export const setTodolistsAC = (todos: Array<TodoType>) => ({type: 'SET-TODOS', todos} as const)
export type setTodolistACType = ReturnType<typeof setTodolistsAC>

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolist()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(RemoveTodolistAC(todolistId))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodolistTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(ChangeTodolistTitleAC(id, title))
        })
}
