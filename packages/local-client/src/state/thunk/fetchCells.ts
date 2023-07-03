import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Cell } from "../cell";
import { store } from "../store";


export const fetchCells = createAsyncThunk<Cell[], void, {rejectValue: string}>('cell/fetch', async (_, thunkApi)=>{
    try {
        const res = await axios.get('/cells')
        return res.data
    } catch (error:any) {
        if(error.message)
            return thunkApi.rejectWithValue(error.message)

        return thunkApi.rejectWithValue("Failed to fetch issues.");
    }
})

export const saveCells = createAsyncThunk<void,void, {rejectValue: string}>('cell/save', async (_, thunkApi)=>{
    const {
      cells: { data, order },
    } = store.getState();

    const cells = order.map((id) => data[id]);

    try {
        await axios.post('/cells', {cells})

    } catch (error:any) {
        if(error.message)
            return thunkApi.rejectWithValue(error.message)

        return thunkApi.rejectWithValue("Failed to fetch issues.");
    }
})
