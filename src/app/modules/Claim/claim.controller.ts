import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { ClaimServices } from "./claim.service";
//claim
const createClaim = catchAsync(async(req:any,res)=>{
    const result = await ClaimServices.createClaimIntoDB(req.userId,req.body)
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:'Claim submitted successfully',
        data:result
    })
})

const allClaims = catchAsync(async(req:any,res)=>{
    const result = await ClaimServices.allClaimItemsFromDB()
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:'Claims retrieve successfully',
        data:result
    })
})

const myClaims = catchAsync(async(req:any,res)=>{
    const result = await ClaimServices.myClaimItemsFromDB(req.userId)
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:'Claims retrieve successfully',
        data:result
    })
})


export const ClaimController = {
    createClaim,
    allClaims,
    myClaims
}