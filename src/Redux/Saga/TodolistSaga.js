import { call, delay, put, takeLatest } from 'redux-saga/effects'
// import {fork, take, takeEvery} from 'redux-saga/effects'
// import Axios from 'axios'
import {STATUS_CODE } from '../../Util/setting'
import { ADD_TASK_API_SAGA, CHECK_DONE_TASK_API_SAGA, DELETE_TASK_API_SAGA, GET_TASK_API_SAGA, GET_TASK_LIST, REJECT_TASK_API_SAGA } from '../Const/TodolistConst'
import { toDoListService } from '../../Services/TodolistService'
import { DISPLAY_LOADING, HIDE_LOADING } from '../Const/LoadingCont'


// redux 2 loại action: 
// action => object (action thường)
// action => function (middleWare thường dùng để xử lý api hoặc gọi các action khác)

// Chức năng getTaskLiat

function* getTaskListApiAction() { // function được xem như 1 action

    // while (true) {
    //     yield take('getTaskListApi'); // Theo dõi action => Xem action nào dispatch mới làm các công việc bên dưới
    //     console.log('getTaskApi')
    // }

    // yield delay(2000) // Đợi sau 2s sẽ chạy các hàm phía dưới . Vd nhấn nút 4 lần dispatch sẽ sau 2s sẽ hiển thị 4 console.log
    // console.log('yield takeLastest & takevery')

    // put giống dispatch action
    // Gọi dispatch display_loading để hiện thị loading khi dữ liệu từ server chưa dc gửi về
    yield put({
        type: DISPLAY_LOADING
    })

    yield delay(1000)

    try {
        // yield call nhận vào 1 hàm trả về promise
        let { data, status } = yield call(toDoListService.getTaskApi)


        if (status === STATUS_CODE.SUCCESS) {
            // Sau khi lấy giá trị thành công dùng put (giống dispatch bên thunk)
            yield put({
                type: GET_TASK_LIST,
                taskList: data
            })
        }

    } catch (err) {
        console.log(err)
    }

    // Ẩn loading sau khi đã dispatch gàm GET_TASK_LIST lấy dc giá trị về
    yield put({
        type: HIDE_LOADING
    })

}


export function* theoDoiActionGetTaskList() {
    // yield fork // Hàm lắng nghe action dùng để gọi action và là null locking chạy không cần chờ
    //yield fork(getTaskListApiAction)

    // yield takeEvery
    //yield takeEvery('getTaskListApi', getTaskListApiAction) // Hàm kết hợp fork và take là lắng nghe và gọi đến action. Nhưng nó nếu gọi nhiều lần sẽ trả về nhiều lần. Vd nhấn nút 10 lần thì sẽ trả về lấn lượt 10 giá trị nên khi dispatch lên sẽ không chính xác 

    yield takeLatest(GET_TASK_API_SAGA, getTaskListApiAction) // Giống hàm takeEvery Hám này kết hợp giữa fork và take là lắng nghe và gọi đến action và theo dõi action đó khi nó được thực thu // Kết hợp với delay dù có nhấn 10 lần nút dispatch thì chỉ hiển thị cái thứ 10

}


// Chức năng Add task

function* addTaskApiAction(action) {

    let { taskName } = action

    // Gọi Api
    // yield call nhận vào 1 hàm trả về promise

    try {
        let { status } = yield call(() => {
            return toDoListService.addTaskApi(taskName)
        })

        // Nếu thành công thì gọi lại action GET_TASKLIST_API (action saga thực thi)
        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_API_SAGA
            })
        }

    } catch (err) {
        console.log(err)
    }

}

export function* theoDoiActionAddTask() {
    yield takeLatest(ADD_TASK_API_SAGA, addTaskApiAction)
}

// Chức năng xóa task

function* deleteTaskApiAction(action) {
    let { taskName } = action

    // Gọi Api
    try {
        let { status } = yield call(() => {
            return toDoListService.deleteTaskApi(taskName)
        })

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_API_SAGA
            })
        }

    } catch (err) {
        console.log(err)
    }

}

export function* theoDoiActionDeleteTask() {
    yield takeLatest(DELETE_TASK_API_SAGA, deleteTaskApiAction)
}

// Chức năng checkDoneTask

function* doneTaskApiAction(action) {
    let { taskName } = action

    // Gọi Api
    try {
        let { data, status } = yield call(() => {
            return toDoListService.doneTaskApi(taskName)
        })

        console.log('data', data)

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_API_SAGA
            })
        }

    } catch (err) {
        console.log(err)
    }

}

export function* theoDoiActionCheckDoneTask() {
    yield takeLatest(CHECK_DONE_TASK_API_SAGA, doneTaskApiAction)
}

// Chức năng rejectTask

function* rejectTaskApiAction(action) {
    let { taskName } = action

    // Gọi api
    try {
        let { status } = yield call(() => {
            return toDoListService.rejectTaskApi(taskName)
        })

        if (status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASK_API_SAGA
            })
        }

    } catch (err) {
        console.log(err)
    }

}

export function* theoDoiActionRejectTask() {
    yield takeLatest(REJECT_TASK_API_SAGA, rejectTaskApiAction)
}