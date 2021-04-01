import React, {useEffect, useState} from 'react'
import {taskAPI} from "../api/task-api";
import {start} from "repl";

export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = 'da981980-4e81-41d7-ab44-2e637b59ea99'
        taskAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const createTask = () => {
        taskAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={'title'} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
        <button onClick={createTask}>Add</button>
    </div>
    </div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [description, setDescription] = useState<string>('description1')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const [id, setId] = useState<string>('')
    const [title, setTitle] = useState<string>('title1')

    const updateTask = () => {

        taskAPI.updateTask(todolistId, id, {
                deadline: '',
                priority: priority,
                status: status,
                description: description,
                startDate: '',
                title: title
        })
            .then((res) => {
                setState(res.data)
            })
    }



    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={'taskId'} value={id} onChange={(e) => {setId(e.currentTarget.value)}}/>
        <input placeholder={'title'} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
        <input placeholder={'description'} value={description} onChange={(e) => {setDescription(e.currentTarget.value)}}/>
        <input placeholder={'priority'} value={priority} type='number' onChange={(e) => {setPriority(+(e.currentTarget.value))}}/>
        <input placeholder={'deadline'} value={deadline} onChange={(e) => {setDeadline(e.currentTarget.value)}}/>
        <input placeholder={'startDate'} value={startDate} onChange={(e) => {setStartDate(e.currentTarget.value)}}/>
        <input placeholder={'status'} value={status} type='number' onChange={(e) => {setStatus(+(e.currentTarget.value))}}/>

        <button onClick={updateTask}>update task</button>
    </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTask = () => {
        taskAPI.deleteTask(todolistId, id)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={'taskId'} value={id} onChange={(e) => {setId(e.currentTarget.value)}}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>

}