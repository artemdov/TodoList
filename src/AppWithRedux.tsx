import React, {useReducer, useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./TODOLIST";
import {v1} from "uuid";
import {AddItemForm} from "./addItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type TodolistType = {
    filter: FilterValuesType
    id: string
    title: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function AppWithRedux() {
    function changeTitle(id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatch(action)
    }
    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatch(action)
    }
    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId)
        dispatch(action)
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
    }
    function changeTodolistTitle(id: string, newTitle: string) {
        const action = ChangeTodolistTitleAC(id, newTitle)
        dispatch(action)
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = ChangeTodolistFilterAC(value, todolistId)
        dispatch(action)
    }
    function removeTodolist(todolistId: string) {
        const action = RemoveTodolistAC(todolistId)
        dispatch(action)
    }
    function addTodolist(title: string) {
        const action = AddTodolistAC(title)
        dispatch(action)
    }

    /*
        const todolistId1 = v1()
        const todolistId2 = v1()

        const [todolists, dispatchToTodolist] = useReducer(todolistsReducer,[
            {id: todolistId1, title: 'What to learn', filter: 'all'},
            {id: todolistId2, title: 'What to buy', filter: 'all'}
        ])
        const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
            [todolistId1]:
                [{id: v1(), title: "HTML&CSS", isDone: false},
                    {id: v1(), title: "JS", isDone: true},
                    {id: v1(), title: "ReactJS", isDone: true}
                ],
            [todolistId2]: [
         {id: v1(), title: "Book", isDone: false},
                {id: v1(), title: "Beer", isDone: true},
                {id: v1(), title: "Milk", isDone: true}
            ]
        })*/
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    return (
        <div className='App'>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={10}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id]
                            let taskForTodolist = allTodolistTasks

                            if (tl.filter == 'active') {
                                taskForTodolist = allTodolistTasks.filter(t => !t.isDone)
                            }
                            if (tl.filter == 'completed') {
                                taskForTodolist = allTodolistTasks.filter(t => t.isDone)
                            }

                            return <Grid  item key={tl.id}
                            >
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        changeTitle={changeTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                        removeTodolist={removeTodolist}
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={taskForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        filter={tl.filter}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
