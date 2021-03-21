import {TaskType, UpdateTaskModelType} from "../api/task-api";
import {AddTodolistActionType, RemoveTodolistActionType, setTodolistACType} from "./todolists-reducer";
import {todolistAPI} from "../api/task-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

const initialState: TasksStateType = {}
export type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | setTodolistACType

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            const tasks = state[action.todolistId]
            copyState[action.todolistId] = tasks.filter((t) => t.id !== action.taskId)

            return copyState
        }
        case 'ADD-TASK': {
            const copyState = {...state}
            const NewTask = action.task
            const tasks = copyState[NewTask.todoListId]
            const newTasks = [NewTask, ...tasks]
            copyState[NewTask.todoListId] = newTasks
            return copyState
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId]
            let newTasksArray = todolistTasks.map((t) => t.id === action.taskId ? {...t, ...action.model} : t)
            state[action.todolistId] = newTasksArray
            return ({...state})
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId]
            let newTasksArray = todolistTasks.map((t) => t.id === action.taskId ? {...t, title: action.title} : t)
            state[action.todolistId] = newTasksArray
            return ({...state})

        }
        case 'ADD-TODOLIST': {
            let copyState = {...state}
            copyState[action.todolistId.id] = []
            return copyState

        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.todolistId]
            return copyState

        }
        case 'SET-TODOS': {
            let copyState = {...state}
            action.todos.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS': {
            let copyState = {...state}
            copyState[action.todolistId] = action.tasks

            return copyState
        }

        default:
            return state

    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const updateTaskStatusAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({type: 'CHANGE-TASK-STATUS', taskId, model, todolistId} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({type: 'CHANGE-TASK-TITLE', taskId: taskId, title: title, todolistId: todolistId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({type: 'SET-TASKS', tasks, todolistId} as const)

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
        })
}
export const deleteTaskTC = (id: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, id)
        .then((res) => {
            dispatch(removeTaskAC(id, todolistId))
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId, title)
        .then((res) => {
            const task = res.data.data.item
            dispatch(addTaskAC(task))
        })
}
export const updateTaskTC = (todolistId: string, id: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t=>t.id === id)
    if(!task) {
        console.warn('task is not found')
        return
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        startDate: task.startDate,
        description: task.description,
        status: task.status,
        priority: task.priority,
        deadline: task.deadline,
        ...domainModel
    }
    todolistAPI.updateTask(todolistId, id, apiModel)
        .then((res) => {
            dispatch(updateTaskStatusAC(id, domainModel , todolistId))
        })
}
