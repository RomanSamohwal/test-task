import {createAsyncThunk} from '@reduxjs/toolkit';
import {restoreJobs} from './dal/localStorage';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs',
    async (param, {dispatch, rejectWithValue}) => {
        try {
            let jobs = await restoreJobs()
            debugger
            return {jobs}
        } catch (error) {
            return rejectWithValue('some error')
        }
    })