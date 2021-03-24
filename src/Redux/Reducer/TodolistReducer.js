import { GET_TASK_LIST } from "../Const/TodolistConst"

const stateDefault = {
    taskList: []
}

export const TodolistReducer = (state = stateDefault, action) => {

    switch (action.type) {

        case GET_TASK_LIST: {
            return { ...state, taskList: action.taskList }

        }

        default:
            return { ...state }
    }
}
