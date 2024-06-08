//user
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs'
import jwt, { Secret } from 'jsonwebtoken'
import config from "../../../config";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelpers } from "../../../utils/jwtHelpers";
import { TLogin } from "./user.interface";

const prisma = new PrismaClient()

const registerIntoDB = async(payload:any)=>{
    const {name,email,password,profile} = payload
    const hashedPassword = await bcrypt.hash(password,Number(config.salt_round))
    const user = await prisma.$transaction(async (prisma)=>{
        const newUser = await prisma.user.create({
            data:{name,email,password:hashedPassword}
        })
        const userProfile = await prisma.userProfile.create({
            data:{userId:newUser.id,...profile}
        });

        return {...newUser,profile:userProfile}
    });

    const {password:_,...userData} = user
    return userData
}

const loginIntoDB = async(payload:TLogin)=>{
    const {email,password} = payload
    const user = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(!user || !await bcrypt.compare(password,user.password)){
        throw new ApiError(401,'Invalid credentials')
    }

    const token = jwt.sign({user:user.id},config.jwt.jwt_secret as Secret,{expiresIn:config.jwt.expires_in})
    const accessToken = jwtHelpers.generateToken({
        userId:user.id
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
)

    return {
        data:{
            id:user.id,
            name:user.name,
            email:user.email,
            accessToken
        }
    }
}

const myProfileFromDB = async(userId:any)=>{
    const id = userId.userId
    const user = await prisma.user.findUnique({
        where:{
            id
        },
        include:{
            profile:true
        }
    })
    return user
}

const updateUserIntoDB = async(userId:any,payload:any)=>{
    const id = userId.userId
    const {name,email,bio,age,image} = payload
   
    
    const query:any = {}
    if(name){
        query.name = name
    }
    if(email){
        query.email =email
    }
   
    if (bio || age !== undefined || image) {
        query.profile = {
          update: {}
        };
        if (bio) {
          query.profile.update.bio = bio;
        }
        if (age !== undefined) {
          query.profile.update.age = age;
        }
        if (image) {
            query.profile.update.image = image;
        }
      }
    
    
    const user = await prisma.user.update({
        where:{id},
        data:query,
        include:{
            profile:true
        }
    })
    return user
}

const changePasswordIntoDB = async(userId:any,payload:{oldPassword:string,newPassword:string})=>{
    const {oldPassword,newPassword} = payload
    const id =userId.userId
    const user = await prisma.user.findUnique({
        where:{
            id
        }
    })
    const isMatch =await bcrypt.compare(oldPassword, user?.password as string)

    if(!isMatch){
        throw new ApiError(httpStatus.NOT_FOUND,'You have entered wrong old password!')
    }
    if(newPassword.length < 8){
        throw new ApiError(400,'Password should be more than 8 charecter!')
    }

    const hashedPassword = await bcrypt.hash(newPassword,Number(config.salt_round))
    const chagedpassword = await prisma.user.update({
        where:{
            id
        },
        data:{
            password:hashedPassword
        }
    })
    return chagedpassword
}

//admin 
export const usersFromDB = async()=>{
    const [users,total] = await prisma.$transaction([
     prisma.user.findMany({
         include:{profile:true}
     }),
     prisma.user.count()
    ])
    return {users,total}
 }
 
 //admin

 export const userFromDB = async(id:string)=>{
  
    
    const user = await prisma.user.findUnique({
        where:{
            id
        },
        include:{
            profile:true
        }
    })
    return user
 }

 export const deactiveUser = async(id:string,payload:any)=>{
    
    const query = {deactivated:payload.deactivated}
    const user = await prisma.user.update({
        where:{id},
        data:query,
        include:{profile:true}
    })
    return user
 }

export const UserServices = {
    registerIntoDB,
    loginIntoDB,
    myProfileFromDB,
    updateUserIntoDB,
    changePasswordIntoDB,
    usersFromDB,
    userFromDB,
    deactiveUser
}