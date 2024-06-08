import { NextFunction, Request, Response } from "express"
import ApiError from "../errors/ApiError"
import httpStatus from "http-status"
import jwt, { JwtPayload, Secret } from "jsonwebtoken"
import config from "../../config"
import { jwtHelpers } from "../../utils/jwtHelpers"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


const auth = (roles:string[])=>{
    return async (req:Request & {userId?:any,userRole?:string},res:Response,next:NextFunction)=>{
        try {
           const token = req.headers.authorization
           
           
           if(!token){
            throw new ApiError(httpStatus.UNAUTHORIZED,"You are not authorized!")
           }
           const verifiedUser = jwtHelpers.verifyToken(token,config.jwt.jwt_secret as Secret)
           

           req.userId = verifiedUser
           
           
           const user = await prisma.user.findUnique({
            where:{
                id:req.userId.userId
            }
           })
           
           
           
           
           if(!user){
                throw new ApiError(httpStatus.UNAUTHORIZED,'user not found')
           }
           if(!roles.includes(user.role)){
            throw new ApiError(httpStatus.FORBIDDEN,`Only ${roles} are allowed to access this route`)
           }
           next()
        } catch (error) {
            next(error)
        }
    }
    
}


export default auth