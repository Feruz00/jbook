import React, { useEffect } from 'react'
import { useAppSelector } from '../hooks/use-typed-selector'
import CellListItem from './cell-list-item'
import AddCell from './add-cell'
import './cell-list.css'
import { useActions } from '../hooks/use-actions'
// import { saveCells } from '../state/store'

const CellList: React.FC = ()=>{
    const cells = useAppSelector(({cells: {order, data}})=>order.map(id=>data[id]))
    
    const {fetchCells, saveCells} = useActions()

    // console.log(updateCell.type);
    

    useEffect( ()=>{
        fetchCells()
    } ,[fetchCells])

    useEffect( ()=>{
        saveCells()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[JSON.stringify(cells)] )

    const renderedCells = cells.map(cell=> <React.Fragment key={cell.id}>
        <CellListItem cell={cell} key={cell.id}/>
        <AddCell previousCellId={cell.id} />
    </React.Fragment> )
    
    return (
        <div className='cell-list'>

            <AddCell forceVisible={cells.length === 0} previousCellId={null} />
            
            {renderedCells}
        </div>
    )
}

export default CellList