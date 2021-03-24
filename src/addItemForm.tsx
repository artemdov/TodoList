import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import './App.css';
import {IconButton, TextField} from "@material-ui/core";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormPropsType) => {
    console.log('AddItForm called')
    let [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null)
            setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }

    return (
        <div>

            <TextField
                disabled={disabled}
                value={title}
                variant={"outlined"}
                label={"Type value"}
                onChange={onChangeTaskHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}/>

            <IconButton disabled={disabled} onClick={addTask} color={"primary"}>+</IconButton>
        </div>
    )
})