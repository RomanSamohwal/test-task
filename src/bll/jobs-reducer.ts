import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {fetchJobs} from './thunks';
import {JobsArrayType, JobsType, JobType} from '../utils/types/types';
const initialState = {} as JobsType

const slice = createSlice({
    name: 'jobs',
    initialState: initialState,
    reducers: {
        addJobs(state, action: PayloadAction<{ id: string, jobs: JobsArrayType }>) {
            state[action.payload.id] = action.payload.jobs
        },
        deleteJobs(state, action: PayloadAction<{ id: string }>) {
            delete state[action.payload.id]
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchJobs.fulfilled, (state, action) => {
            action.payload?.jobs.forEach((j: JobType) => {
                state[j.processId] = []
            })
            action.payload?.jobs.forEach((j: JobType) => {
                state[j.processId].unshift(j)
            })

        })
    }
})

export const appJobs = slice.reducer;
export const {addJobs, deleteJobs} = slice.actions;


