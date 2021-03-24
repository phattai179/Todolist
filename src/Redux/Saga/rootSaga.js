import { all } from 'redux-saga/effects'
import * as TodolistSaga from './TodolistSaga'


export function* rootSaga() {
    // Nghiệp vụ theo dõi các action saga todolist
    yield all([
        TodolistSaga.theoDoiActionGetTaskList(),
        TodolistSaga.theoDoiActionAddTask(),
        TodolistSaga.theoDoiActionDeleteTask(),
        TodolistSaga.theoDoiActionCheckDoneTask(),
        TodolistSaga.theoDoiActionRejectTask()
        // Nghiệp vụ khác thì cứ import rồi . đến

    ])


}