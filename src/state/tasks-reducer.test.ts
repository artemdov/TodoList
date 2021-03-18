import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from './tasks-reducer';
import {AddTodolistAC, RemoveTodolistAC, setTodolistsAC} from "./todolists-reducer";
import {TasksType} from "../TODOLIST";/*
type TaskStateType = {[p: string]: Array<TasksType>}
let startState: TaskStateType = {}

beforeEach(() => {
        startState = {
            "todolistId1": [
                {id: "1", title: "CSS", isDone: false},
                {id: "2", title: "JS", isDone: true},
                {id: "3", title: "React", isDone: false}
            ],
            "todolistId2": [
                {id: "1", title: "bread", isDone: false},
                {id: "2", title: "milk", isDone: true},
                {id: "3", title: "tea", isDone: false},
                {id: "4", title: "teaAD", isDone: false}
            ]
        };
    }
)


test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2","todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(3);
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
    expect(endState["todolistId2"].length).toBe(5);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("JS");
})


test('status of specified task should be changed', () => {


    const action = changeTaskStatusAC("2", false, "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].isDone).toBe(false);
    expect(endState['todolistId1'][1].completed).toBe(true);
});

test('status of specified task should be changed title', () => {

    const action = changeTaskTitleAC("2", 'beer', "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('beer');
    expect(endState['todolistId1'][1].title).toBe('JS');
});

test('new array should be added when new todolist is added', () => {

    const action = AddTodolistAC("new todolist");

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

/!*test('tasks should be added for todolist ', () => {

    const action = setTasksAC(startState["todolistId1"],"todolistId1");

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);
});*!/




*/