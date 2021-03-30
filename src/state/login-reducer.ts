import {Dispatch} from "redux";
import {setErrorActionType, setStatusAC, setStatusActionType} from "./app-reducer";
import {authAPI, LoginParamsType} from "../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

type ThunkDispatch = Dispatch<ActionType> | setStatusActionType | setErrorActionType
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
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)

        })

    dispatch(setStatusAC('succeeded'))


}