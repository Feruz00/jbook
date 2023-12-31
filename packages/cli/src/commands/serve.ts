import path from "path";
import { Command } from "commander";
import {serve} from '@feruzbook/local-api'
const isProduction = process.env.NODE_ENV === 'production'
export const serveCommand = new Command()
    .command('serve [filename]')
    .description('Open a file for editing')
    .option('-p, --port <number>', 'port to run server on', '4005')
    .action( async (filename='notebook.js', options )=>{
        try {
            const dir = path.join( process.cwd(), path.dirname(filename) )
            await serve(options.port * 1, path.basename(filename), dir, !isProduction)
            console.log(
                `Opened ${filename}. Navigate to http://localhost:${options.port} to edit the file.`
            )
        } catch (err:any) {
            if(err.code === 'EADDRINUSE'){
                console.error('Port is in use. Try running another on a different port')
            }
            else{
                console.log('Error here:', err.message)
            }
            process.exit(1)
        }
    } )