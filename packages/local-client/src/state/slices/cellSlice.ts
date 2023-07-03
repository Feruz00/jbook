import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Cell , CellTypes} from "../cell";
import { fetchCells, saveCells } from "../thunk/fetchCells";

type Direction = 'up' | 'down'

interface MoveCell {
    id: string,
    direction: Direction
}
interface InsertCell{
    id: string | null,
    type: CellTypes
}
interface CellsState{
    loading: Boolean,
    error: string | null,
    order: string[],
    data:{
        [key:string]:Cell
    }
}

const initialState: CellsState ={
    loading: false,
    error:null,
    order: [],
    data:{}
}


const cellSlice = createSlice({
    initialState,
    name: 'cell',
    reducers:{
        updateCell(state, action:PayloadAction<Cell>){
            const {id, content} = action.payload
            state.data[id].content = content
            return state
        },
        
        deleteCell(state, action:PayloadAction<string>){
            delete state.data[action.payload]
            state.order = state.order.filter(id=>id!==action.payload)
            return state
        },
        
        moveCell(state, action:PayloadAction<MoveCell>){
            const {direction, id} = action.payload
            const index = state.order.findIndex((i)=>i === id)

            const targetIndex = direction === 'up' ? index -1 : index+1

            if(targetIndex < 0 || targetIndex > state.order.length -1)
                return
            
            state.order[index] = state.order[targetIndex]
            state.order[targetIndex] = id

            return state
        },
        
        insertCellBefore(state, action:PayloadAction<InsertCell>){
            const cell:Cell = {
                content: '',
                type: action.payload.type,
                id: randomId()
            }

            state.data[cell.id] = cell
            const index = state.order.findIndex(id => id===action.payload.id)

            if(index<0){
                state.order.push(cell.id)
            }
            else{
                state.order.splice(index, 0, cell.id)
            }
            return state
        },
        insertCellAfter(state, action:PayloadAction<InsertCell>){
            const cell:Cell = {
                content: '',
                type: action.payload.type,
                id: randomId()
            }
            // console.log(cell, action.payload);
            
            state.data[cell.id] = cell
            const index = state.order.findIndex(id => id===action.payload.id)

            if(index<0){
                state.order.unshift(cell.id)
            }
            else{
                state.order.splice(index+1, 0, cell.id)
            }
            // console.log(state.data);
            
            return state
        }
    },
    extraReducers(builder) {
        builder.addCase( fetchCells.pending, (state)=>{
            state.loading = true
            return state
        } )

        builder.addCase(fetchCells.fulfilled, (state, action: PayloadAction<Cell[]>)=>{
            state.order = action.payload.map(cell=>cell.id)
            state.data = action.payload.reduce((acc, cell)=>{
                acc[cell.id] = cell;
                return acc
            },{} as CellsState['data'])
            return state
        })

        builder.addCase(fetchCells.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload || 'Something wrong went'
            return state
        })

        builder.addCase(saveCells.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload || 'Something wrong went'
            return state
        })
    },
})

const randomId = ()=>{
    return Math.random().toString(36).substr(2,5)
}


export const { updateCell, deleteCell, moveCell, insertCellBefore, insertCellAfter } = cellSlice.actions
export const cellReducer = cellSlice.reducer
