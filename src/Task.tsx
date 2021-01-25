import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";

type TaskPropsType = {
    taskId: string
    todolistId: string
    isDone: boolean
    title: string
    removeTask: (taskId: string,todolistId: string) => void
    changeStatus:(id: string, isDone: boolean, todolistId: string) => void
    changeTitle:(taskId: string, newTitle: string,todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.taskId, props.todolistId)
    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
         const newIsDoneValue = e.currentTarget.checked
        props.changeStatus(props.taskId, newIsDoneValue, props.todolistId)
    }
    const onChangeTitleHandler = (newValue: string) => {
        props.changeTitle(props.taskId, newValue, props.todolistId)
    }

    return <li key={props.taskId} className={props.isDone ? 'is-done' : ''}>

        <Checkbox color={"primary"}
                  checked={props.isDone}
                  onChange={onChangeCheckboxHandler}/>
        <EditableSpan title={props.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </li>
})