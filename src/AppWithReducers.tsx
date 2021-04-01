import React, {useReducer} from 'react';
import './App.css';
import {v1} from "uuid";
import {AddItemForm} from "./addItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import { changeTodolistFilterAC, ChangeTodolistTitleAC, removeTodolistAC, todolistsReducer } from "./state/todolists-reducer";
import {TaskType} from "./api/task-api";


export type TodolistType = {
    filter: FilterValuesType
    id: string
    title: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function AppWithReducers() {
/*   function changeTitle(id: string, newTitle: string, todolistId: string) {
       const action = changeTaskTitleAC(id,newTitle,todolistId)
       dispatchToTasks(action)

   }
    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasks(action)
    }
    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId)
        dispatchToTasks(action)
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id,isDone,todolistId)
        dispatchToTasks(action)

    }
    function changeTodolistTitle(id: string, newTitle: string) {
        const action = ChangeTodolistTitleAC(id,newTitle)
        dispatchToTodolist(action)
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = ChangeTodolistFilterAC(value,todolistId)
        dispatchToTodolist(action)

    }
    function removeTodolist(todolistId: string) {
        const action = RemoveTodolistAC(todolistId)
        dispatchToTasks(action)
        dispatchToTodolist(action)
    }
    function addTodolist(title: string) {
        const action = AddTodolistAC(title)
        dispatchToTasks(action)
        dispatchToTodolist(action)
    }

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatchToTodolist] = useReducer(todolistsReducer,[
        {id: todolistId1, title: 'What to learn', filter: 'all',  order: 0, addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter: 'all',  order: 0, addedDate: ''}
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
    })



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

                            return <Grid item>
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
    );*/
}

export default AppWithReducers;
