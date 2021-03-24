import Axios from 'axios'
import { DOMAIN } from '../Util/setting'

export class TodolistService {
    getTaskApi = () => {
        return Axios({
            url: `${DOMAIN}/api/ToDoList/GetAllTask`,
            method: 'GET'
        })
    }

    addTaskApi = (taskName) => {
        return Axios({
            url: `${DOMAIN}/api/ToDoList/AddTask`,
            method: 'POST',
            data: {taskName: taskName}
        })
    }

    deleteTaskApi = (taskName) => {
        return Axios({
            url: `${DOMAIN}/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })
    }

    doneTaskApi = (taskName) => {
        return Axios({
            url:`${DOMAIN}/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })
    }

    rejectTaskApi = (taskName) => {
        return Axios({
            url: `${DOMAIN}/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        })
    }

}

export const toDoListService = new TodolistService();