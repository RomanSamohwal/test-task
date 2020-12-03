import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { ProcessesType, ProcessType } from '../utils/types/types';

import {fetchProcesses} from './thunks';

const initialState = [] as ProcessesType

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

