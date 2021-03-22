import {FilterValuesType, TodolistType} from "../App"
import {todolistAPI, TodolistDomainType, TodoType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {act} from "react-dom/test-utils";

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export type setTodolistACType = ReturnType<typeof setTodolistsAC>

export type ActionType =
    | ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>

const initialState: Array<TodolistDomainType> = []


export const todolistsReducer = (state = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOS':
            return action.todos.map(tl => ({...tl, filter: 'all'}))

        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [...state, {...action.todolistId, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default :
            return state
        }
    }

    export const RemoveTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId} as const)
    export const addTodolistAC = (todolistId: TodoType) => ({type: 'ADD-TODOLIST', todolistId} as const)
    export const ChangeTodolistTitleAC = (id: string, title: string) => ({
        type: 'CHANGE-TODOLIST-TITLE',
        title,
        id
    } as const)
    export const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string) => ({
        type: 'CHANGE-TODOLIST-FILTER',
        filter,
        id
    } as const)
    export const setTodolistsAC = (todos: Array<TodoType>) => ({type: 'SET-TODOS', todos} as const)

    export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionType>) => {
        todolistAPI.getTodolist()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
            })
    }
    export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                dispatch(RemoveTodolistAC(todolistId))
            })
    }
    export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
        todolistAPI.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
    export const changeTodolistTC = (id: string, title: string) => (dispatch: Dispatch<ActionType>) => {
        todolistAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(ChangeTodolistTitleAC(id, title))
            })
    }

