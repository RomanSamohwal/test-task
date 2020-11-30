import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {saveJobs} from './dal/localStorage';
import {JobsArrayType, JobsType, JobType} from "./JobsType";
import {fetchJobs} from './Thunks';

const initialState = {} as JobsType

/*export const fetchJobs = createAsyncThunk('jobs/fetchJobs',
    async (param, {dispatch, rejectWithValue}) => {
        try {
            let jobs = await restoreJobs()
            debugger
            return {jobs}
        } catch (error) {
            return rejectWithValue('some error')
        }
    })*/

export const saveJob = createAsyncThunk('jobs/saveJobs',
    async (param, {dispatch, rejectWithValue,getState}) => {
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

        }
    })

const slice = createSlice({
    name: 'jobs',
    initialState: initialState,
    reducers: {
        addJobs(state, action: PayloadAction<{ id: string, jobs: JobsArrayType }>) {
            state[action.payload.id] = action.payload.jobs
        },
        deleteJobs(state, action: PayloadAction<{ id: string }>) {
            delete state[action.payload.id]
        },
        /*findJob(state, action: PayloadAction<{ name: string }>) {
            for (const jobIdKey in state) {
                state[jobIdKey].filter(j => j.name)
            }
        },*/
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
export const {addJobs,deleteJobs} = slice.actions;


