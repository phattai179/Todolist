import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import style from './Todolist.css'
// import Axios from 'axios'
import { addTaskListAction, getTaskListAction, deleteTaskAction, checkDoneTaskAction, rejectTaskAction } from '../../Redux/Action/TodolistAction'

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
        dispatch(getTaskListAction())
        // Note cần thêm [] để chạy 1 lần sau khi hiển thị
    })

    const renderTaskToDo = () => {
        return taskList.filter(task => !task.status).map((item, index) => {
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
        return taskList.filter(task => task.status).map((item, index) => {
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
                        <i className="far fa-undo-alt"></i>
                        <i className="fas fa-undo-alt"></i>
                    </button>
                </div>
            </li>
        })
    }

    // Get taskList
    // const getTaskList = () => {
    //     dispatch(getTaskListAction())
    // }

    // Xóa Task
    const deleteTask = (taskName) => {
        dispatch(deleteTaskAction(taskName))
    }

    // checkDoneTask 
    const checkDoneTask = (taskName) => {
        dispatch(checkDoneTaskAction(taskName))
    }

    // RejectTask
    const rejectTask = (taskName) => {
        dispatch(rejectTaskAction(taskName))
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

        dispatch(addTaskListAction(values.taskName))


    }

    return (
        <div className="card">
            {/* <button className="btn btn-primary" onClick={getTaskList} >Get Todolist ReduxThunk</button> */}

            <div className="card__header">
                <img src="./img/X2oObC4.png" alt="12345" />
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
                        Uncompleted tasks
                        <ul className="todo" id="todo">
                            {renderTaskToDo()}
                        </ul>

                        Completed tasks
                        <ul className="todo" id="completed">
                            {renderTaskToDone()}
                        </ul>
                    </div>
                </div>
            </form>
        </div>

    )
}
