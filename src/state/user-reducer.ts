export type StateType = {
    name: string
    age: number
    childrenCount: number
}
// 3 типа действий: action type
//описание(тип) действия и (возможно!!!) какието параметры(9 строка-параметры)
// action-обьект у которго есть тип действий
type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType) => {
        switch (action.type) {
            case 'INCREMENT-AGE':
                const newState = {...state}
                newState.age = state.age + 1
                return newState
            case 'INCREMENT-CHILDREN-COUNT':
                return {...state, childrenCount: state.childrenCount + 1}
            case 'CHANGE-NAME':
                return {...state, name: action.newName}
            default:
               // return state
                throw new Error("I don't understand this type")
        }
}