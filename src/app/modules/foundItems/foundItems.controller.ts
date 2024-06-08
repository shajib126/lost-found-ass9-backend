import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { FoundItemServices } from "./foundItems.service";

const createFoundItem = catchAsync(async(req:any,res)=>{
  
  
   const userId =req.userId
    
    const result = await FoundItemServices.createFoundItemsIntoDB(userId,req.body)
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:'Found item created successfully',
        data:result
    })
})

const getFoundItems = catchAsync(async(req,res)=>{
    
    const result = await FoundItemServices.getFoundItemsFromDB(req.query)
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:'Found items retrieved successfully',
        data:result
    })
})

const getMyFoundItems = catchAsync(async(req:any,res)=>{
    
    
    const result = await FoundItemServices.getMyFoundItemsFromDB(req.userId)
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:'Found items retrieved successfully',
        data:result
    })
})



export const FoundItemsController ={
    createFoundItem,
    getFoundItems,
    getMyFoundItems
}
