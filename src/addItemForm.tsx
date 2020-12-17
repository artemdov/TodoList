import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import './App.css';
import {AddItemFormPropsType} from "./TODOLIST";



export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
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

    return (
        <div>
            <input
                value={title}
                onChange={onChangeTaskHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''}/>

            <button onClick={addTask}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}