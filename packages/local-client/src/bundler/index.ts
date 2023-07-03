
import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'
import { fetchPlugin } from './plugins/fetch-plugin'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let service:any
// eslint-disable-next-line import/no-anonymous-default-export
export default async (rawCode:string)=>{
    
    if(!service){
        try {
            service = await esbuild.build({});
        } catch (error) {
            if (error instanceof Error && error.message.includes('initialize')) {
                service = await esbuild.initialize({
                    worker: false,
                    wasmURL: '/esbuild.wasm',

                });
            } else {
                throw error;
            }
        }    
    }

    try {
   
        const result = await esbuild.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [
                unpkgPathPlugin(),
                fetchPlugin(rawCode)
            ],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window',
            },
            jsxFactory: '_React.createElement',
            jsxFragment:'_React.Fragment'
        })
    
    
        return {
            code: result.outputFiles[0].text,
            err: ''
        }
               
    } catch (err:any) {
        return {
            
            err: err.message,
            code: ''
        }  
    }
   
}