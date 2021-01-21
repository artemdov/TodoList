import {TasksStateType} from "../App"
import {v1} from "uuid";
import {TaskType} from "../TODOLIST";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}
const initialState: TasksStateType = {}
export type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state=initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            const tasks = state[action.todolistId]
            copyState[action.todolistId] = tasks.filter(t => t.id !== action.taskId)

            return copyState
        }
        case 'ADD-TASK': {
            let copyState = {...state}
            let NewTask: TaskType = {id: v1(), title: action.title, isDone: false}
            copyState[action.todolistId] = [NewTask, ...copyState[action.todolistId]]

            return copyState
        }
        case 'CHANGE-TASK-STATUS': {
           let todolistTasks = state[action.todolistId]
            let newTasksArray = todolistTasks.map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            state[action.todolistId] = newTasksArray
            return ({...state})
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId]
            let newTasksArray = todolistTasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            state[action.todolistId] = newTasksArray
            return ({...state})

        }
        case 'ADD-TODOLIST': {

            let copyState = {...state}
            copyState[action.todolistId] = []
            return copyState

        }
        case 'REMOVE-TODOLIST': {

            let copyState = {...state}
            delete copyState[action.todolistId]
            return copyState

        }

        default:
            return state

    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskId: taskId, isDone: isDone, todolistId: todolistId,}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskId: taskId, title: title, todolistId: todolistId}
}

