import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import './App.css';
import {AddItemFormPropsType} from "./TODOLIST";
import {Button, IconButton, TextField} from "@material-ui/core";
import {TextFields} from "@material-ui/icons";


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

            <TextField
                value={title}
                variant={"outlined"}
                label={"Type value"}
                onChange={onChangeTaskHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error }
            helperText={error}/>

            <IconButton onClick={addTask}  color={"primary"}>+</IconButton>
        </div>
    )
}