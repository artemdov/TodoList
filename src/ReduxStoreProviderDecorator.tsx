import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers, createStore} from 'redux'
import {tasksReducer} from '../src/state/tasks-reducer'
import {todolistsReducer} from '../src/state/todolists-reducer'
import {v1} from 'uuid'
import {AppRootStateType} from '../src/state/store'

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
/*

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all",  order: 0, addedDate: ''},
        {id: "todolistId2", title: "What to buy", filter: "all",  order: 0, addedDate: ''}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: ()=>React.ReactNode) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)


*/

