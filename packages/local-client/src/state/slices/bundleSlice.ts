import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { createBundle } from "../action-creators/create-bundle";

interface bundleStartAction{
    cellId: string
}

interface bundleCompleteAction{
    cellId: string;
    bundle:{
        code:string;
        err: string;
    }
}

interface BundlesState{
    [key:string]:{
        loading: Boolean;
        code: string;
        err: string;
    } | undefined
}

const initialState:BundlesState = {}

const bundleSlice = createSlice({
    name: 'bundle',
    initialState,
    reducers:{
        bundleStart(state, action:PayloadAction<bundleStartAction>){
            state[action.payload.cellId]  = {
                loading: true,
                code: '',
                err: ''
            }
            return state
        },
        bundleComplete(state, action:PayloadAction<bundleCompleteAction>){
            state[action.payload.cellId] = {
                loading: false,
                code: action.payload.bundle.code,
                err: action.payload.bundle.err
            }
            return state
        }
    }
})

export const bundleReducer = bundleSlice.reducer
export const {bundleStart, bundleComplete} = bundleSlice.actions
