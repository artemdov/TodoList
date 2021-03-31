import {Dispatch} from "redux";
import {todolistAPI} from "../api/todolist-api";
import {handleServerNetworkError} from "../utils/error-utils";
import {ActionType, setTodolistsAC} from "./todolists-reducer";
import {authAPI} from "../api/auth-api";
import {setIsLoggedInAC} from "./login-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null,
    isInitialized: false
}

export type InitialStateType = {
    //происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    //если произошла глобальная ошибка - сюда запилим текст ошибки
    error: string | null
    //true когда проинизиализировалось(проверили юзера,получили настройки и т.д.)
    isInitialized: boolean
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}

export const setErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setInitializedAC = (value: boolean) => ({type: 'APP/SET-INITIALIZED', value} as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
        authAPI.me()
            .then(res => {
                if(res.data.resultCode === 0){
                    dispatch(setIsLoggedInAC(true))
                } else {

                }
                dispatch(setInitializedAC(true))

            })
}

export type setErrorActionType = ReturnType<typeof setErrorAC>;
export  type setInitializedActionType = ReturnType<typeof setInitializedAC>;
export  type setStatusActionType = ReturnType<typeof setStatusAC>;
type ActionsType = setErrorActionType | setStatusActionType | setInitializedActionType