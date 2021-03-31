import {appReducer, InitialStateType, setErrorAC, setInitializedAC, setStatusAC} from "./app-reducer";

let startState: InitialStateType

beforeEach(() => {

    startState = {
        error: null,
        status: 'loading',
        isInitialized: true
    }
})


test('correct error message should be set', () => {

    const endState = appReducer(startState,setErrorAC('some error'))
    expect(endState.error).toBe('some error');
});
test('correct status should be set', () => {

    const endState = appReducer(startState,setStatusAC('loading'))
    expect(endState.status).toBe('loading');
});
test('correct isInitialized should be set', () => {

    const endState = appReducer(startState,setInitializedAC(true))
    expect(endState.isInitialized).toBe(true);
});