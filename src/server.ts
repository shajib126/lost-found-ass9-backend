import { Server } from "http";
import app from "./app";
import config from "./config";

//server
async function main(){
    const server:Server = app.listen(config.port,()=>{
        console.log(`Server is running on port ${config.port}`);
        
    })
    const exitHandler = ()=>{
        if(server){
            server.close(()=>{
                console.log('server closed!');
                
            })
        }
        process.exit(1)
    }
    process.on('uncaughtException',(error)=>{
        console.log(error);
        exitHandler()
        
    })
    process.on('unhandledRejection', (error) => {
        console.log(error);
        exitHandler();
    })
}

main()