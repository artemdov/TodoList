import React, {useCallback, useEffect} from 'react';
import './App.css';
import Todolist from "./TODOLIST";
import {AddItemForm} from "./addItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton, LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistTC,
    ChangeTodolistFilterAC, changeTodolistTC,
    fetchTodolistsTC,
    removeTodolistTC
} from "./state/todolists-reducer";
import {

    addTaskTC, updateTaskTC,
    deleteTaskTC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./api/task-api";
import {TaskStatuses} from "./api/todolist-api";
import {ErrorSnackBar} from "./ErrorSnackBar/ErrorSnackBar";


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
    const changeTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        const action = updateTaskTC(todolistId, id, {title: newTitle})
        dispatch(action)
    }, [])
    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(deleteTaskTC(id, todolistId))
    }, [])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(title, todolistId))
    }, [])
    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, id, {status}))
    }, [])
    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTC(id, title))
    }, [])
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const action = ChangeTodolistFilterAC(value, todolistId)
        dispatch(action)
    }
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [])
    const addTodolist = useCallback((title: string) => {

        dispatch(addTodolistTC(title))
    }, [])

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTodolistsTC())

    }, [])
    return (
        <div className='App'>
            <ErrorSnackBar />
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
                <LinearProgress/>
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


                            return <Grid item key={tl.id}
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
