import {createAsyncThunk} from '@reduxjs/toolkit';
import {restoreJobs, restoreProcesses, saveJobs, saveProcesses} from '../dal/localStorage';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs',
    async (param, {dispatch, rejectWithValue}) => {
        try {
            let jobs = await restoreJobs()
            return {jobs}
        } catch (error) {
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
            // @ts-ignore
            await saveJobs(array)

        } catch (error) {
            rejectWithValue(error)
        }
    })

export const fetchProcesses = createAsyncThunk('processes/fetchProcesses',
    async (param, {dispatch, rejectWithValue, getState}) => {
        try {
            let processes = await restoreProcesses()
            return {processes}
        } catch (error) {
            rejectWithValue(error)
        }
    })

export const saveProcess = createAsyncThunk('processes/saveProcess',
    async (param, {dispatch, rejectWithValue, getState}) => {
        try {
            let state = getState()
            // @ts-ignore
            let allProcesses = state.processes
            await saveProcesses(allProcesses)
        } catch (error) {
            rejectWithValue(error)
        }
    })