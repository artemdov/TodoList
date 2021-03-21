import {
    addTaskAC,
    changeTaskTitleAC,
    removeTaskAC, setTasksAC,
    tasksReducer, updateTaskStatusAC
} from './tasks-reducer';

import {addTodolistAC, RemoveTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {TaskType} from "../api/task-api";
import {PriorityStatuses, TaskStatuses} from "../api/todolist-api";

type TaskStateType = { [p: string]: Array<TaskType> }
let startState: TaskStateType = {}

beforeEach(() => {
        startState = {
            "todolistId1": [
                {
                    id: '1',
                    title: "title1",
                    todoListId: 'todolistId1',
                    description: '',
                    startDate: '',
                    deadline: '',
                    status: TaskStatuses.Completed,
                    order: 0,
                    addedDate: '',
                    priority: PriorityStatuses.Low,
                    completed: true
                },
                {
                    id: '2',
                    title: "title2",
                    todoListId: 'todolistId2',
                    description: '',
                    startDate: '',
                    deadline: '',
                    status: TaskStatuses.Completed,
                    order: 0,
                    addedDate: '',
                    priority: PriorityStatuses.Low,
                    completed: false
                },
                {
                    id: '3',
                    title: "title3",
                    todoListId: 'todolistId3',
                    description: '',
                    startDate: '',
                    deadline: '',
                    status: TaskStatuses.Completed,
                    order: 0,
                    addedDate: '',
                    priority: PriorityStatuses.Low,
                    completed: true
                }

            ],
            "todolistId2": [
                {
                    id: '1',
                    title: "title1",
                    todoListId: 'todolistId1',
                    description: '',
                    startDate: '',
                    deadline: '',
                    status: TaskStatuses.Completed,
                    order: 0,
                    addedDate: '',
                    priority: PriorityStatuses.Low,
                    completed: true
                },
                {
                    id: '2',
                    title: "title2",
                    todoListId: 'todolistId2',
                    description: '',
                    startDate: '',
                    deadline: '',
                    status: TaskStatuses.Completed,
                    order: 0,
                    addedDate: '',
                    priority: PriorityStatuses.Low,
                    completed: false
                },
                {
                    id: '3',
                    title: "title3",
                    todoListId: 'todolistId3',
                    description: '',
                    startDate: '',
                    deadline: '',
                    status: TaskStatuses.Completed,
                    order: 0,
                    addedDate: '',
                    priority: PriorityStatuses.Low,
                    completed: true
                }
            ]
        };
    }
)


test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"][0].id).toBe("1");
    expect(endState["todolistId2"][1].id).toBe("3");

})


test('correct task should be added to correct array', () => {


    const action = addTaskAC({
        completed: false,
        todoListId: 'todolistId2',
        id: '11',
        title: 'JS',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: 0,
        startDate: '',
        status: 0

    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("JS");
})


test('status of specified task should be changed', () => {


    const action = updateTaskStatusAC("2", {...startState}, "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(2);
    expect(endState['todolistId1'][1].completed).toBe(false);
});

test('status of specified task should be changed title', () => {

    const action = changeTaskTitleAC("2", 'NewTitle', "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('NewTitle');
    expect(endState['todolistId1'][1].title).toBe('title2');
});

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({
        id: 'Bla',
        title: 'new todolist',
        order: 0,
        addedDate: ''
    })


    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = RemoveTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty arrays should be added we set todolists', () => {

    const action = setTodolistsAC([
        {id: '1', title: "title1", order: 0, addedDate: ''},
        {id: '2', title: "title2", order: 0, addedDate: ''},

    ]);

    const endState = tasksReducer({}, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState['1']).toStrictEqual([]);
});

test('tasks should be added for todolist ', () => {

    const action = setTasksAC(startState["todolistId1"], "todolistId1");

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);
})





