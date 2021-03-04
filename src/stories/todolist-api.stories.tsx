import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '6621fc0e-be07-42d9-b090-d92a4129df07'
    }
}

export const GetTodolists = () => {
    const [state, setState] =  useState<any>(null)
    useEffect(() => {
            axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
                .then((res) => {
                    setState(res.data);
                })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}



export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "newTodolist"
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings).then((res) => {
            setState(res.data);
        })
    },[])

        return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistsId = ''
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists${todolistsId}`).then((res) => {
            setState(res.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = ''
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'REACT>>>>>>>>>'}, settings)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
