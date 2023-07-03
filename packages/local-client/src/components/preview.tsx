import React, { useEffect, useRef } from 'react'
import './preview.css'
interface PreviewProps  {
    code: string,
    err:string
}
const html = `
<html>
<head>
  <style>
    html{
      background-color: white;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script>
    
    const handleErrors = (err)=>{
      const root = document.querySelector('#root');
      root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
    }
    window.addEventListener('error', event=>{
      event.preventDefault()
      handleErrors(event.error)
    })

    window.addEventListener('message', (event) => {
      
      try {
        eval(event.data);
      } catch (err) {
        handleErrors(err)
      }
    }, false);
  </script>
</body>
</html>
`
const Preview:React.FC<PreviewProps> = ({code, err}) => {
    const iframe = useRef<any>()
  
    useEffect(()=>{
      iframe.current.srcdoc = html
    
      setTimeout( ()=>{
      
        iframe.current.contentWindow.postMessage(code, '*')
      
      }, 50 )

   },[code])
  return (
    <div className='preview-wrapper'>
      
      <iframe srcDoc={html} sandbox='allow-scripts' ref={iframe} title="preview"  />
      {err && <div className='preview-error'>{err}</div> }
    </div>
  )
}

export default Preview