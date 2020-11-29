import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {v1} from 'uuid';
import { addProcess } from "./process-reducer";
import {processId1, processId2} from './ProcessesId';



export enum JobStatuses {
    running = 0,
    successed = 1,
    failed = 2,
}

const initialState = {
    // @ts-ignore
    [processId1] : [{id: jobId1, name: 'JobProc1', processId: processId1, status: JobStatuses.running}, {id: jobId2, name: 'JobProc1', processId: processId1, status: JobStatuses.running}],
    // @ts-ignore
    [processId2] : [{id: jobId3, name: 'JobProc2', processId: processId2, status: JobStatuses.failed}, {id: jobId4, name: 'JobProc2', processId: processId2, status: JobStatuses.failed}, {id: jobId5, name: 'JobProc2', processId: processId2, status: JobStatuses.failed}]
}

const slice = createSlice({
    name: 'jobs',
    initialState: initialState as JobsType,
    reducers: {
        addJobs(state, action: PayloadAction<{id: string, jobs: JobsArrayType}>){
             state[action.payload.id] = action.payload.jobs
        },
        deleteJobs(state, action: PayloadAction<{id: string}>){
           delete state[action.payload.id]
        }
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
