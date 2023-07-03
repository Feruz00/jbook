
import bundler from '../../bundler/index'
import { Dispatch } from '@reduxjs/toolkit';
// import { useAppDispatch } from '../../hooks/use-typed-selector';
// import { bundleComplete, bundleStart } from '../slices/bundleSlice';
// import { AppDispatch } from '../store';

interface bundleCompleteAction{
    type: "bundle/bundleComplete",
    payload:{
        cellId: string;
        bundle:{
            code:string;
            err: string;
        }
    }
}
interface bundleStartAction{
    type: "bundle/bundleStart",
    payload:{
        cellId: string,
        input: string

    }
}

type Action = bundleCompleteAction | bundleStartAction

export const createBundle = (cellId: string, input: string) => {
    return async (dispatch: Dispatch<Action>)=>{
        dispatch({
            type:  "bundle/bundleStart",
            payload: {
                cellId,
                input
            }
        })
        const result = await bundler(input)

        dispatch({
            type: "bundle/bundleComplete",
            payload:{
                cellId,
                bundle:{
                    code: result.code,
                    err: result.err
                }
            }
        })
    }
}
