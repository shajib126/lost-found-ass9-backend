import { Prisma, PrismaClient } from "@prisma/client"
const prisma =new PrismaClient()

export const checkBlock = async(userId:string)=>{
    const isBlock = await prisma.user.findUnique({
        where:{
            id:userId,
            block:true
        }
    })
    return isBlock
}