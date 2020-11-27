import {combineReducers, configureStore} from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk'
import {appProcesses} from '../process-reducer';
import {useDispatch} from 'react-redux';

const rootReducer = combineReducers({
    processes: appProcesses
})

export type RootReducerType = typeof rootReducer

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<RootReducerType>
export type AppDispatchType  = typeof store.dispatch
export const useAppDispatch = () => <AppDispatchType>useDispatch()