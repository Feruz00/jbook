/* eslint-disable react-hooks/exhaustive-deps */
import './code-cell.css'
import React, {  useEffect } from 'react'
import CodeEditor from './code-editor'
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state/cell';
import { useActions } from '../hooks/use-actions';
import { useAppSelector } from '../hooks/use-typed-selector';
import { useCumulativeCode } from '../hooks/use-cumulative';

interface CodeCellProps{
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
  
  
  const {updateCell, createBundle} = useActions()
  const bundle = useAppSelector((state) => state.bundle[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id)
  
  
  useEffect(() => {
    
    if(!bundle){
      createBundle(cell.id, cumulativeCode)
      return
    }
    
    const timer = setTimeout(async ()=>{
      createBundle(cell.id, cumulativeCode)
    }, 750)
    return ()=>{
      clearTimeout(timer)
    }
  }, [cumulativeCode, cell.id, createBundle])
  
  return (
    <Resizable direction='vertical'>
        <div style={{height: 'calc( 100% - 10px)', display:'flex', flexDirection: 'row'}}>
          <Resizable direction='horizontal'>
            <CodeEditor 
              initialValue={cell.content}
              onChange = {val=>updateCell({id: cell.id, content: val, type: 'code'})}
            />
          </Resizable>
          <div className='progress-wrapper'>
            {
              !bundle || bundle?.loading 
              ? <div className='progress-cover'>
                    <progress className='progress is-small is-primary' max={100}>
                      Loading
                    </progress>
                </div>
              
              : <Preview code={bundle.code} err={bundle.err} />
            }

          </div>
        </div>
        
    </Resizable>
  )
}


export default CodeCell