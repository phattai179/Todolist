import {applyMiddleware, combineReducers, createStore} from 'redux'
import { TodolistReducer } from './TodolistReducer';

import reduxThunk from 'redux-thunk'
import createMiddleWareSaga from 'redux-saga'
import {rootSaga} from '../Saga/rootSaga'
import { LoadingReducer } from './LoadingReducer';

// import createMiddleWareSaga from 'redux-saga'
// import { rootSaga } from '../Saga/rootSaga';
// const middleWareSaga = createMiddleWareSaga();

const middleWareSaga = createMiddleWareSaga()

const rootReducer = combineReducers({
    TodolistReducer,
    LoadingReducer
    
    
})

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga))

middleWareSaga.run(rootSaga)

//middleWareSaga.run(rootSaga)


export default store;