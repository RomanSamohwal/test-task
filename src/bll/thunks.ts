import {createAsyncThunk} from '@reduxjs/toolkit';
import {restoreJobs, restoreProcesses, saveJobs, saveProcesses} from '../dal/localStorage';
import {setAppStatus} from './app-reducer';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs',
    async (param, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus({status: 'loading'}))
            let jobs = await restoreJobs()
            dispatch(setAppStatus({status: 'succeeded'}))
            return {jobs}
        } catch (error) {
            dispatch(setAppStatus({status: 'failed'}))
            return rejectWithValue(error)
        }
    })

export const saveJob = createAsyncThunk('jobs/saveJobs',
    async (param, {dispatch, rejectWithValue, getState}) => {
        try {
            let state = getState()
            // @ts-ignore
            let array = []
            // @ts-ignore
            for (const jobKey in state.jobs) {
                // @ts-ignore
                state.jobs[jobKey].forEach(j => array.push(j))
            }
            dispatch(setAppStatus({status: 'loading'}))
            // @ts-ignore
            await saveJobs(array)
            dispatch(setAppStatus({status: 'succeeded'}))

        } catch (error) {
            dispatch(setAppStatus({status: 'failed'}))
            rejectWithValue(error)
        }
    })

export const fetchProcesses = createAsyncThunk('processes/fetchProcesses',
    async (param, {dispatch, rejectWithValue, getState}) => {
        try {
            dispatch(setAppStatus({status: 'loading'}))
            let processes = await restoreProcesses()
            dispatch(setAppStatus({status: 'succeeded'}))
            return {processes}
        } catch (error) {
            dispatch(setAppStatus({status: 'failed'}))
            rejectWithValue(error)
        }
    })

export const saveProcess = createAsyncThunk('processes/saveProcess',
    async (param, {dispatch, rejectWithValue, getState}) => {
        try {
            let state = getState()
            // @ts-ignore
            let allProcesses = state.processes
            dispatch(setAppStatus({status: 'loading'}))
            await saveProcesses(allProcesses)
            dispatch(setAppStatus({status: 'succeeded'}))
        } catch (error) {
            dispatch(setAppStatus({status: 'failed'}))
            rejectWithValue(error)
        }
    })