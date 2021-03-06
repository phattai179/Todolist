import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Todolist.css'
// import Axios from 'axios'
// import { addTaskListAction, getTaskListAction, deleteTaskAction, checkDoneTaskAction, rejectTaskAction } from '../../Redux/Action/TodolistAction'
import { ADD_TASK_API_SAGA, CHECK_DONE_TASK_API_SAGA, DELETE_TASK_API_SAGA, GET_TASK_API_SAGA, REJECT_TASK_API_SAGA } from '../../Redux/Const/TodolistConst'

export default function BaiTapToDoListReduxThunk(props) {

    const { taskList } = useSelector(state => state.TodolistReducer)
    const dispatch = useDispatch()

    // Sử dụng useState để tạo state trên component
    const [state, setState] = useState({
        values: {
            taskName: '',
        },

        errors: {
            taskName: '',
        }
    })


    // Dùng useEffect để chạy 1 lần thì component hiện ra như componentDidMount
    useEffect(() => {
        // getTaskList()
        dispatch({
            type: GET_TASK_API_SAGA,
        })
        // Npte cần thêm [] để chạy 1 lần sau khi hiển thị
    })

    const renderTaskToDo = () => {
        return taskList?.filter(task => !task.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button onClick={() => {
                        deleteTask(item.taskName)
                    }} type="button" className="remove">
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button onClick={() => {
                        checkDoneTask(item.taskName)
                    }} type="button" className="complete">
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }

    const renderTaskToDone = () => {
        return taskList?.filter(task => task.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button onClick={() => {
                        deleteTask(item.taskName)
                    }} type="button" className="remove">
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button onClick={() => {
                        rejectTask(item.taskName)
                    }} type="button" className="complete">
                        <i class="far fa-undo-alt"></i>
                        <i class="fas fa-undo-alt"></i>
                    </button>
                </div>
            </li>
        })
    }

    // Get taskList
    const getTaskList = () => {
        // Dispatch action saga

        dispatch({
            type: GET_TASK_API_SAGA,
        })
    }

    // Xóa Task
    const deleteTask = (taskName) => {
        // Dispatch action saga

        dispatch({
            type: DELETE_TASK_API_SAGA,
            taskName: taskName
        })
    }

    // checkDoneTask 
    const checkDoneTask = (taskName) => {
        // Dispatch action saga

        dispatch({
            type: CHECK_DONE_TASK_API_SAGA,
            taskName
        })
    }

    // RejectTask
    const rejectTask = (taskName) => {
        dispatch({
            type: REJECT_TASK_API_SAGA,
            taskName
        })
    }


    // ChangeInput
    const handleChangeInput = (e) => {
        let { name, value } = e.target

        // Cập nhật giá trị mới
        let newValue = { ...state.values }
        newValue[name] = value

        // Cập nhật lỗi
        let newError = { ...state.errors }
        if (value.trim() === "") {
            newError[name] = name + " không được bỏ trống"
        } else {
            newError[name] = ""
        }

        setState({
            ...state,
            values: newValue,
            errors: newError
        })

    }

    // ChangeSubmit (AddTask)
    const handleChangeSubmit = (e) => {
        e.preventDefault()

        let { values, errors } = state
        let valid = true;

        if (values.taskName.trim() === "" || errors.taskName !== "") {
            valid = false;
        }

        if (!valid) {
            alert("Dữ liệu add không hợp lệ")
            return
        }

        // Dispatch action saga
        dispatch({
            type: ADD_TASK_API_SAGA,
            taskName: values.taskName
        })



    }

    return (
        <div className="card">
            <button className="btn btn-primary" onClick={getTaskList} >Get Todolist ReduxThunk</button>

            <div className="card__header">
                <img src="./img/X2oObC4.png" alt="123" />
            </div>
            {/* CardBody */}
            <form onSubmit={handleChangeSubmit} className="card__body">
                <div className="card__content">
                    <div className="card__title">
                        <h2>My Tasks</h2>
                        <p>September 9,2020</p>
                    </div>

                    <div className="card__add">
                        <input onChange={handleChangeInput} name="taskName" id="newTask" type="text" placeholder="Enter an activity..." />
                        <button type="submit" id="addItem">
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                    <p className="text text-danger" >{state.errors.taskName}</p>
                    <div className="card__todo">
                        {/* Uncompleted tasks */}
                        <ul className="todo" id="todo">
                            {renderTaskToDo()}
                        </ul>

                        {/* Completed tasks */}
                        <ul className="todo" id="completed">
                            {renderTaskToDone()}
                        </ul>
                    </div>
                </div>
            </form>
        </div>

    )
}
