import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {processId1, processId2} from "./ProcessesId";
import {restoreProcesses} from './dal/localStorage';
import {isValidElement} from 'react';

/*const initialState = [
    {id: processId1, name: 'Process1', jobsCount: 2, startTime: 12},
    {id: processId2, name: 'Process2', jobsCount: 3, startTime: 13}
]*/

const initialState = [] as ProcessesType

export const fetchProcesses = createAsyncThunk('processes/fetchProcesses',
     async (param, {dispatch, rejectWithValue}) => {
        try {
            let processes = await restoreProcesses()
            debugger
            return {processes}
        } catch (error) {

        }
    })

const slice = createSlice({
    name: 'processes',
    initialState: initialState,
    reducers: {
        addProcess(state, action: PayloadAction<{ process: ProcessType }>) {
            state.unshift({...action.payload.process})
        },
        deleteProcess(state, action: PayloadAction<{ id: string }>) {
            return state.filter(i => i.id !== action.payload.id)
        },
        orderProcess(state, action: PayloadAction<{ process: ProcessesType }>) {
            return action.payload.process
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProcesses.fulfilled, (state, action) => {
            // @ts-ignore
          return action.payload.processes
        })
    }
})

export const appProcesses = slice.reducer;
export const {addProcess,deleteProcess,orderProcess} = slice.actions;

//types
export type ProcessesType = Array<ProcessType>;
export type ProcessType = {
    id: string
    name: string
    startTime: number
    jobsCount: number
}
