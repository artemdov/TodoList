import {FilterValuesType, TasksStateType, TodolistType} from "../App"
import {v1} from "uuid";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    newTitle: string
    id: string
}
const initialState: Array<TodolistType> = []

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}
type ActionType = ChangeTodolistFilterActionType | ChangeTodolistTitleActionType | AddTodolistActionType | RemoveTodolistActionType

export const todolistsReducer = (state = initialState, action:ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            const NewTodolist: TodolistType = {
            id: action.todolistId,
            title: action.title,
            filter: 'all'
        }
        return [...state, NewTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.newTitle
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
    return {type:'REMOVE-TODOLIST', todolistId:todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type:'ADD-TODOLIST', title: title, todolistId:v1()}
}
export const ChangeTodolistTitleAC = (newTitle: string, id: string): ChangeTodolistTitleActionType => {
    return {type:'CHANGE-TODOLIST-TITLE', newTitle: newTitle, id: id}
}
export const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    return {type:'CHANGE-TODOLIST-FILTER', filter: filter, id: id}
}