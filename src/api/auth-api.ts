import axios from 'axios'
import {CommonResponseType} from "./todolist-api";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '6621fc0e-be07-42d9-b090-d92a4129df07'
    }
})
//api
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<CommonResponseType<{userId?: number}>>('auth/login', data)
    },
    me() {
        return instance.get<CommonResponseType<{ id: number, email: string ,login: string}>>('auth/me')
    },
    logout() {
        return instance.delete<CommonResponseType<{userId?: number}>>('auth/login')
    }
}

//types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
