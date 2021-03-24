import {setErrorAC, setErrorActionType, setStatusAC, setStatusActionType} from "../state/app-reducer";
import {ResponseType} from "../api/task-api";
import {Dispatch} from "redux";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<setErrorActionType | setStatusActionType>) => {
        if (data.messages.length) {
            dispatch(setErrorAC(data.messages[0]))
        } else {
            dispatch(setErrorAC('some error'))
        }
        dispatch(setStatusAC('failed'))
}
export const handleServerNetworkError = (error: { message: string },  dispatch: Dispatch<setErrorActionType | setStatusActionType>) => {
    dispatch(setErrorAC(error && error.message))
    dispatch(setStatusAC('failed'))

}