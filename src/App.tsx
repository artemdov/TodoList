import React, {useState} from 'react';
import './App.css';
import Todolist from "./TODOLIST";
import {v1} from "uuid";

export type TodolistType = {
    filter: FilterValuesType
    id: string
    title: string


}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    function removeTask(id: string, todolistId: string) {
        const todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    function addTask(title: string, todolistId: string) {
        const todolistTasks = tasks[todolistId]
        const newTask = {id: v1(), title: title, isDone: false}
        tasks[todolistId] = [newTask, ...todolistTasks]
        setTasks({...tasks})
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        const todolistTasks = tasks[todolistId]
        const task = todolistTasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }

    }

    function changeFilter(value: FilterValuesType, todolistId: string) {

        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function removeTodolist(todolistId: string) {
        let filteredTdolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTdolist)
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState({
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
            {
                todolists.map(tl => {
                    let allTodolisttasks = tasks[tl.id]
                    let taskForTodolist = allTodolisttasks

                    if (tl.filter == 'active') {
                        taskForTodolist = allTodolisttasks.filter(t => !t.isDone)
                    }
                    if (tl.filter == 'completed') {
                        taskForTodolist = allTodolisttasks.filter(t => t.isDone)
                    }

                    return <Todolist
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
                })
            }
        </div>
    );
}

export default App;
