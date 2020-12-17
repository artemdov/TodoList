import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';
import {FilterValuesType} from "./App";


export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValuesType
    id: string
}
type TaskType = {
    id: string
    title: string
    isDone: boolean

}



function Todolist(props: PropsType) {
    let [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim(), props.id)
            setTitle('')
        } else {
            setError('Title required')
        }
    }
    const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodolist = () => {props.removeTodolist(props.id)}
    return (
        <div>
            <h3>{props.title}<button onClick={removeTodolist}>X</button></h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeTaskHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''}/>

                <button onClick={addTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTask(t.id, props.id)
                        const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newIsDoneValue = e.currentTarget.checked
                            props.changeStatus(t.id, newIsDoneValue, props.id)
                        }
                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type='checkbox'
                                   checked={t.isDone}
                                   onChange={onChangeCheckboxHandler}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>X</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>
                    Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>
                    Completed
                </button>
            </div>
        </div>
    )
}

export default Todolist