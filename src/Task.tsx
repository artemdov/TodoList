import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./api/task-api";
import {TaskStatuses} from "./api/todolist-api";


export type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string,todolistId: string) => void
    changeStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTitle:(taskId: string, newTitle: string,todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
         const newIsDoneValue = e.currentTarget.checked
        props.changeStatus(props.task.id, props.task.status, props.todolistId)
    }
    const onChangeTitleHandler = (newValue: string) => {
        props.changeTitle(props.task.id, newValue, props.todolistId)
    }

    const removeTask = () => {}

    return <li key={props.task.id} className={props.task.completed ? 'is-done' : ''}>

        <Checkbox color={"primary"}
                  checked={props.task.completed}
                  onChange={onChangeCheckboxHandler}/>
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </li>
})