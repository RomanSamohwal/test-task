import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {v1} from 'uuid';

const processId1 = v1()
const processId2 = v1()

const initialState = [
    {id: processId1, name: 'Process1', jobsCount: 2, startTime: 12},
    {id: processId2, name: 'Process2', jobsCount: 3, startTime: 13}
]

const slice = createSlice({
    name: 'processes',
    initialState: initialState as ProcessesType,
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
