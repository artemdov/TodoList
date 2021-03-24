import {
    addTodolistAC, changeTodolistEntityStatusAC, changeTodolistFilterAC, ChangeTodolistTitleAC,
    removeTodolistAC, setTodolistsAC,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType} from '../App';
import {TodolistDomainType, TodoType} from "../api/todolist-api";
import {RequestStatusType} from "./app-reducer";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: '', entityStatus: "idle"},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: '', entityStatus: "idle"}
    ]
})


test('correct todolist should be removed', () => {


    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {

    let todolist: TodoType = {
        title: 'NewTodo',
        id: 'anyId',
        addedDate: '',
        order: 0
    }


    const endState = todolistsReducer(startState, addTodolistAC(todolist))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(todolist.title);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle: string = "New Todolist";

    const action = ChangeTodolistTitleAC(todolistId2, newTodolistTitle)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe("What to learn");
});

test('todos should be set to the state', () => {

    const action = setTodolistsAC(startState)
    const endState = todolistsReducer([], action);
    expect(endState.length).toBe(2);

});

test('correct entity status of todolist should be changed', () => {

    let newStatus: RequestStatusType = "loading";

    const action = changeTodolistEntityStatusAC(todolistId2, newStatus)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action = changeTodolistFilterAC(newFilter, todolistId2)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});


