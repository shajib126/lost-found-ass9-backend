//claim services
import { PrismaClient } from "@prisma/client";
import { TClaim } from "./claim.interface";
const prisma = new PrismaClient()

const createClaimIntoDB = async(userId:{userId:string},payload:TClaim)=>{
    const {foundItemId, distinguishingFeatures, lostDate } = payload;
    
    
    const claim = await prisma.claim.create({
        data:{
            userId:userId.userId,
            foundItemId,
            distinguishingFeatures,
            lostDate:new Date(lostDate).toISOString()
        },
        include:{
            user:true,foundItem:true
        }
    })
return claim

}

const allClaimItemsFromDB = async()=>{

    const [claims,total] = await prisma.$transaction([
        prisma.claim.findMany({
            include:{user:true,foundItem:true}
        }),
        prisma.claim.count()
    ])
    
    return {claims,total}
}

const myClaimItemsFromDB = async(id:any)=>{
    const userId = id.userId
    const claims = await prisma.claim.findMany({
        where:{
            userId
        },
        include:{user:true,foundItem:true}
    })
    return claims
}

export const ClaimServices = {
    createClaimIntoDB,
    allClaimItemsFromDB,
    myClaimItemsFromDB
}