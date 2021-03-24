import Axios from 'axios'
import { DOMAIN, STATUS_CODE } from '../../Util/setting'
import { GET_TASK_LIST } from '../Const/TodolistConst'

export const getTaskListAction = () => {
    return async dispatch => {

        try {
            let { data, status } = await Axios({
                url: `${DOMAIN}/api/ToDoList/GetAllTask`,
                method: 'GET'
            })

            if (status === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_TASK_LIST,
                    taskList: data
                })
            }

        } catch (err) {
            console.log(err.response?.data)
        }

    }
}

export const addTaskListAction = (taskName) => {
    return async dispatch => {

        try {
            let {status } = await Axios({
                url: `${DOMAIN}/api/ToDoList/AddTask
                `,
                method: 'POST',
                data: { taskName: taskName }
            })

            if(status === STATUS_CODE.SUCCESS){
                dispatch(getTaskListAction())
            }

        } catch (err) {
            console.log(err.response?.data)
        }

    }
}

export const deleteTaskAction = (taskName) => {
    return async dispatch => {
        try{
            let {status} = await Axios({
                url: `${DOMAIN}/api/ToDoList/deleteTask?taskName=${taskName}`,
                method: 'DELETE'
            })

            if(status === STATUS_CODE.SUCCESS){
                dispatch(getTaskListAction())
            }

        }catch(err){
            console.log(err.response?.data)
        }
    }
}

export const checkDoneTaskAction = (taskName) => {
    try{
        return async dispatch => {
            let {status} = await Axios({
                url: `${DOMAIN}/api/ToDoList/doneTask?taskName=${taskName}`,
                method: 'PUT'
            })

            if(status === STATUS_CODE.SUCCESS){
                dispatch(getTaskListAction())
            }
        }
    }catch(err){
        console.log(err.response?.data)
    }
}

export const rejectTaskAction = (taskName) => {
    try{
        return async dispatch => {
            let {status} = await Axios({
                url: `${DOMAIN}/api/ToDoList/rejectTask?taskName=${taskName}`,
                method: 'PUT'
            })
            if(status === STATUS_CODE.SUCCESS){
                dispatch(getTaskListAction())
            }
        }
    }catch(err) {
        console.log(err.response?.data)
    }
}