import {configureStore} from '@reduxjs/toolkit'
import { cellReducer, updateCell, deleteCell, moveCell, insertCellBefore, insertCellAfter } from './slices/cellSlice'
import {bundleComplete, bundleReducer, bundleStart} from './slices/bundleSlice'
import {saveCells, fetchCells} from './thunk/fetchCells'
import { persistMiddlware } from './middleware/persists-middleware'
const store = configureStore({
    reducer:{
        cells: cellReducer,
        bundle: bundleReducer
    },
    middleware: (getDefaultMiddleware)=>{
        return getDefaultMiddleware()
        .concat(persistMiddlware)
    }
})

// export type RootState = ReturnType<typeof store>
export {store}
export {updateCell, deleteCell, moveCell, insertCellBefore, insertCellAfter, bundleComplete, bundleStart, saveCells, fetchCells}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
