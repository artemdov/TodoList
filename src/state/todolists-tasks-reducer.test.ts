import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {addTodolistAC, todolistsReducer} from "./todolists-reducer";
import {TodolistDomainType, TodoType} from "../api/todolist-api";
/*

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodoType> = [];

    let todolist: TodoType = {
        title: 'NewTodo',
        id: 'anyId',
        addedDate: '',
        order: 0
    }

    const action = addTodolistAC(todolist);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});
*/
