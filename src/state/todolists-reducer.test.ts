import {
    addTodolistAC, ChangeTodolistTitleAC,
    RemoveTodolistAC, setTodolistsAC,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType} from '../App';
import {TodolistDomainType, TodoType} from "../api/todolist-api";

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: ''},
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: ''}
    ]
})


test('correct todolist should be removed', () => {


    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

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

    let newFilter: FilterValuesType = "completed";

    const action = setTodolistsAC(startState)

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);

});


