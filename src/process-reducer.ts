import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {restoreProcesses, saveProcesses} from './dal/localStorage';
import {ProcessesType, ProcessType} from './ProcessType';

const initialState = [] as ProcessesType

export const fetchProcesses = createAsyncThunk('processes/fetchProcesses',
    async (param, {dispatch, rejectWithValue, getState}) => {
        try {
            let processes = await restoreProcesses()
            return {processes}
        } catch (error) {

        }
    })

export const saveProcess = createAsyncThunk('processes/saveProcess',
    async (param, {dispatch, rejectWithValue, getState}) => {
        try {
            let state = getState()
            // @ts-ignore
            let allProcesses = state.processes
            await saveProcesses(allProcesses)
            return
        } catch (error) {

        }
    })

const slice = createSlice({
    name: 'processes',
    initialState: initialState,
    reducers: {
        addProcess(state, action: PayloadAction<{ process: ProcessType, status: string }>) {
            state.unshift({...action.payload.process, status: action.payload.status})
        },
        deleteProcess(state, action: PayloadAction<{ id: string }>) {
            return state.filter(i => i.id !== action.payload.id)
        },
        orderProcess(state, action: PayloadAction<{ process: ProcessesType }>) {
            return action.payload.process
        },

        setStatus(state, action: PayloadAction<{ id: string, status: string }>) {
            return state.map((p) => {
                    if (p.id === action.payload.id) {
                        return {...p, status: action.payload.status}
                    }
                    return p
                }
            )

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
export const {addProcess, deleteProcess, orderProcess, setStatus} = slice.actions;

