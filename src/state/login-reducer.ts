import {Dispatch} from "redux";
import {setErrorAC, setStatusAC} from "./app-reducer";
import {authAPI, LoginParamsType} from "../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

type initialStateType = typeof initialState
const initialState = {
    isLoggedIn: false
}
export type ActionType = ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setStatusAC>


export const authReducer = (state: initialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'login/SET_IS_LOGGED_IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) => ({
    type: 'login/SET_IS_LOGGED_IN',
    value
} as const)

//thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setStatusAC('succeeded'))
            }  else if (res.data.messages.length > 0) {
                dispatch(setErrorAC(res.data.messages[0]))
            } else {
                dispatch(setErrorAC('some error'))
            }
            dispatch(setStatusAC('failed'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)

        })
    dispatch(setStatusAC('succeeded'))
}


export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
    dispatch(setStatusAC('succeeded'))
}