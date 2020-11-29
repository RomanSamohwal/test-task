import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {v1} from 'uuid';
import {addProcess, fetchProcesses} from "./process-reducer";
import {processId1, processId2} from './ProcessesId';
import {restoreJobs, restoreProcesses} from './dal/localStorage';

const jobId1 = v1()
const jobId2 = v1()
const jobId3 = v1()
const jobId4 = v1()
const jobId5 = v1()

export enum JobStatuses {
    running = 0,
    successed = 1,
    failed = 2,
}

/*
const initialState = {
    // @ts-ignore
    [processId1] : [{id: jobId1, name: 'JobProc1', processId: processId1, status: JobStatuses.running}, {id: jobId2, name: 'JobProc1', processId: processId1, status: JobStatuses.running}],
    // @ts-ignore
    [processId2] : [{id: jobId3, name: 'JobProc2', processId: processId2, status: JobStatuses.failed}, {id: jobId4, name: 'JobProc2', processId: processId2, status: JobStatuses.failed}, {id: jobId5, name: 'JobProc2', processId: processId2, status: JobStatuses.failed}]
}
*/

const initialState = {} as JobsType

export const fetchJobs = createAsyncThunk('jobs/fetchJobs',
    async (param, {dispatch, rejectWithValue}) => {
        try {
            let jobs = await restoreJobs()
            debugger
            return {jobs}
        } catch (error) {

        }
    })


const slice = createSlice({
    name: 'jobs',
    initialState: initialState,
    reducers: {
        addJobs(state, action: PayloadAction<{id: string, jobs: JobsArrayType}>){
             state[action.payload.id] = action.payload.jobs
        },
        deleteJobs(state, action: PayloadAction<{id: string}>){
           delete state[action.payload.id]
        },
        findJob(state, action: PayloadAction<{name: string}>){
            for (const jobIdKey in state) {
                state[jobIdKey].filter(j=>j.name)
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchJobs.fulfilled, (state, action) => {
            // @ts-ignore
            action.payload.jobs.forEach((j: JobType) => {
                state[j.processId] = []
            })
            // @ts-ignore
            action.payload.jobs.forEach((j: JobType) => {
                state[j.processId].unshift(j)
            })
        })
    }
})

export const appJobs = slice.reducer;
export const {addJobs,deleteJobs} = slice.actions;

//types
export type JobsType = {
    [key: string]: JobsArrayType
}
export type JobsArrayType = Array<JobType>
export type JobType = {
    id: string
    processId: string
    name: string
    status: JobStatuses
}
