import {TaskType, UpdateTaskModelType} from "../api/task-api";
import {AddTodolistActionType, RemoveTodolistActionType, setTodolistACType} from "./todolists-reducer";
import {taskAPI} from "../api/task-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setErrorAC, setErrorActionType, setStatusAC, setStatusActionType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {PriorityStatuses, TaskStatuses} from "../api/todolist-api";

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: PriorityStatuses
    startDate?: string
    deadline?: string
}

const initialState: TasksStateType = {}
export type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskStatusAndTitleAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | setTodolistACType

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType =>
{
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK-STATUS-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId.id]: []
            }
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
        case 'SET-TASKS':
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: 'REMOVE-TASK',
    taskId,
    todolistId
} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const updateTaskStatusAndTitleAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({
    type: 'UPDATE-TASK-STATUS-TITLE',
    model,
    todolistId,
    taskId
} as const)

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({
    type: 'SET-TASKS',
    tasks,
    todolistId
} as const)

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionType | setStatusActionType>) => {
    dispatch(setStatusAC('loading'))
    taskAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
            dispatch(setStatusAC('succeeded'))
        })
}
export const deleteTaskTC = (id: string, todolistId: string) => (dispatch: Dispatch<ActionType
    | setStatusActionType>) => {
    dispatch(setStatusAC('loading'))
    taskAPI.deleteTask(todolistId, id)
        .then((res) => {
            dispatch(removeTaskAC(id, todolistId))
            dispatch(setStatusAC('succeeded'))
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionType | setErrorActionType
    | setStatusActionType>) => {
    dispatch(setStatusAC('loading'))
    taskAPI.createTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
                dispatch(setStatusAC('succeeded'))
            } else if (res.data.messages.length > 0) {
                dispatch(setErrorAC(res.data.messages[0]))
            } else {
                dispatch(setErrorAC('some error'))
            }
            dispatch(setStatusAC('failed'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)

        })
}
export const updateTaskTitleAndStatusTC = (taskId: string,domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionType | setStatusActionType | setErrorActionType>, getState: () => AppRootStateType) => {

        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
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
        taskAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskStatusAndTitleAC(taskId, domainModel, todolistId))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)

            })
    }


