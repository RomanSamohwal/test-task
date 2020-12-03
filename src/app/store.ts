import {combineReducers, configureStore} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk'
import {appProcesses} from '../bll/process-reducer';
import {useDispatch} from 'react-redux';
import {appJobs} from '../bll/jobs-reducer';
import {appFind} from '../bll/find-reducer';
import {appReducer} from '../bll/app-reducer';

const rootReducer = combineReducers({
    app: appReducer,
    processes: appProcesses,
    jobs: appJobs,
    find: appFind
})

export type RootReducerType = typeof rootReducer

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<RootReducerType>
export type AppDispatchType = typeof store.dispatch
export const useAppDispatch = () => <AppDispatchType>useDispatch()
