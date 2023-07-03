import { useAppSelector } from "./use-typed-selector"

export const useCumulativeCode = (cellId:string)=>{
    return useAppSelector( st=>{
        const {order, data} = st.cells
    
        const orderedCell = order.map(id=>data[id])
    
        const showFunc = `
        import _React from 'react'
        import {createRoot as _createRoot} from 'react-dom/client'
    
        const root = document.querySelector("#root")
    
        var show = val=>{
          if( typeof val === 'object' )
            if(val.$$typeof && val.props){
              const el = _createRoot(root)
              el.render(val)
            }
            else
              root.innerHTML = JSON.stringify(val)
          else 
          root.innerHTML = val
        }
      `
      const showFuncNoop = 'var show = ()=>{}'
    
        const cumulativeCod = []
        for(let c of orderedCell){
          if(c.type==='code'){
            if(c.id === cellId)
              cumulativeCod.push(showFunc)
            else
              cumulativeCod.push(showFuncNoop)
            cumulativeCod.push(c.content)
          }
          if(c.id === cellId) break;
        }
    
        return cumulativeCod
    
      } ).join('\n')
}