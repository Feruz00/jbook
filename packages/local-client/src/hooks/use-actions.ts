import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo} from 'react'
import { useAppDispatch } from "./use-typed-selector";
import { updateCell, moveCell, insertCellBefore, deleteCell , insertCellAfter, bundleComplete, bundleStart,
saveCells, fetchCells
} from "../state/store";
import {createBundle} from '../state/action-creators/create-bundle'
const useActions = ()=>{
    const dispatch = useAppDispatch()
    return useMemo(()=>{
        return bindActionCreators({updateCell, moveCell, insertCellBefore, deleteCell , insertCellAfter,
            bundleComplete, bundleStart, createBundle, saveCells, fetchCells
        }, dispatch)
    },[dispatch])
    
}


// export default function useThunk(thunk){
//     const [isLoading, setIsLoading] = useState(false)
//     const [error, setError] = useState(null)
//     const dispatch = useAppDispatch()
//     const runThunk = useCallback( (arg)=>{
//       setIsLoading(true)
//       dispatch(thunk(arg))
//         .unwrap()
//         .catch(err=>setError(err))
//         .finally(()=>setIsLoading(false))
//     }, [dispatch, thunk])
  
//     return [runThunk, isLoading, error]
//   }

export {useActions}