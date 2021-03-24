import React, {useCallback, useEffect} from 'react';
import './App.css';
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
    changeTodolistFilterAC, changeTodolistTC,
    fetchTodolistsTC,
    removeTodolistTC
} from "./state/todolists-reducer";
import {

    addTaskTC, updateTaskTitleAndStatusTC,
    deleteTaskTC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./api/task-api";
import {TaskStatuses, TodolistDomainType} from "./api/todolist-api";
import {ErrorSnackBar} from "./ErrorSnackBar/ErrorSnackBar";
import {RequestStatusType} from "./state/app-reducer";
import {Todolist} from "./TODOLIST";


export type TodolistType = {
    filter: FilterValuesType
    id: string
    title: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = 'all' | 'active' | 'completed'
type PropsDemoType = {
    demo?: false
}

function AppWithRedux({demo = false}: PropsDemoType) {

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo) {
        return
    }
        dispatch(fetchTodolistsTC())
    }, [])


    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        const action = updateTaskTitleAndStatusTC(id, {title: newTitle}, todolistId)
        dispatch(action)
    }, [])
    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(deleteTaskTC(id, todolistId))
    }, [])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(title, todolistId))
    }, [])
    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        debugger
        dispatch(updateTaskTitleAndStatusTC(id, {status}, todolistId))
    }, [])
    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTC(id, title))
    }, [])
    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC(todolistId))
    }, [])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [])


    return (
        <div className='App'>
            <ErrorSnackBar/>
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
                {status === "loading" && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={10}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id]

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>

                                    <Todolist
                                        todolist={tl}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                        removeTodolist={removeTodolist}
                                        key={tl.id}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        demo={demo}


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
