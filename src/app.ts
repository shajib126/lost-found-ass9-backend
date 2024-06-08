import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './app/routes'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import httpStatus from 'http-status'

const app:Application = express()


app.use(express.json())
app.use(express.urlencoded())
app.use(cors({origin:['http://localhost:3000','https://lost-found-ass-9.vercel.app'],credentials:true}))
app.use(cookieParser())


app.get('/',(req:Request,res:Response)=>{
    res.send('Lost and found API')
})

app.use('/',router)
app.use(globalErrorHandler)

app.use((req:Request,res:Response,next:NextFunction)=>{
    res.status(httpStatus.NOT_FOUND).json({
        success:false,
        message:'API NOT FOUND',
        error:{
            path:req.originalUrl,
            message:"Your requested path is not found!"
        }
    })
})

export default app

