import {createSlice} from '@reduxjs/toolkit'
import { JobsArrayType } from '../utils/types/types';

import {fetchJobs} from './thunks';

const initialState = [] as JobsArrayType

const slice = createSlice({
    name: 'find',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchJobs.fulfilled, (state, action) => {
            return action.payload.jobs
        })
    }
})

export const appFind = slice.reducer;



