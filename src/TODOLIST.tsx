import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import './App.css';
import {FilterValuesType} from "./App";
import {AddItemForm} from './addItemForm'
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTitle: (id: string, newValue: string, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, id: string,) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValuesType
    id: string
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type AddItemFormPropsType = {
    addItem: (title: string) => void
}


export const Todolist = React.memo((props: PropsType) => {
    console.log('click')
    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter,props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter,props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter,props.id])
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.id, props.changeTodolistTitle])


    let taskForTodolist = props.tasks
    if (props.filter == 'active') {
        taskForTodolist = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter == 'completed') {
        taskForTodolist = props.tasks.filter(t => t.isDone)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm  addItem={addTask} />
            <ul>
                {
                    props.tasks.map(t => {
                        const onClickHandler = () => props.removeTask(t.id, props.id)
                        const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newIsDoneValue = e.currentTarget.checked
                            props.changeStatus(t.id, newIsDoneValue, props.id)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTitle(t.id, newValue, props.id)
                        }

                        return <Task
                        key={t.id}
                        task={t}

                        todolistId={props.id}

                        removeTask={props.removeTask}
                        changeStatus={props.changeStatus}
                        changeTitle={props.changeTitle}

                        />
                    })
                }
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>All
                </Button>
                <Button color={"primary"} variant={props.filter === 'active' ? 'contained' : 'text'} onClick={onActiveClickHandler}>
                    Active
                </Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? 'contained' : 'text'} onClick={onCompletedClickHandler}>
                    Completed
                </Button>
            </div>
        </div>
    )

})

export default Todolist