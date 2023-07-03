// import { Dispatch } from 'redux';
// import { Cell, CellTypes } from '../cell';

import { saveCells } from "../store";

// type Direction = 'up' | 'down'

// interface MoveCell {
//     type: 'cell/moveCell',
//     payload: {
//         id: string,
//         direction: Direction
//     }
// }
// interface UpdateCell {
//     type: 'cell/updateCell',
//     payload: Cell
// }

// interface InsertCell{
//     type: 'cell/insertCellAfter'
//     payload:{
//         id: string | null,
//         type: CellTypes
//     }
// }
// interface DeleteCell{
//     type: 'cell/deleteCell',
//     payload: string
// }
// // type rt = string
// type Action = UpdateCell | MoveCell | InsertCell | DeleteCell



export const persistMiddlware = (storeApi:any) => {
    // Middle function: gets the "next" middleware in the pipeline
    let timer: any;

    return (next:any) => {
      // Inner function: gets the current action
      return (action:any) => {
        next(action);
        if([
            'cell/deleteCell', 'cell/insertCellAfter', 'cell/moveCell', 'cell/updateCell'
        ].includes(action.type)){
            if (timer) {
                clearTimeout(timer);
              }
              timer = setTimeout(() => {
                saveCells()
              }, 250);
        }
      }
    }
}