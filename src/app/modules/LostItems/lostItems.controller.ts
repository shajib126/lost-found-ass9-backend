import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { LostItemsServices } from "./lostItems.services";

const createLostItem = catchAsync(async(req:any,res)=>{
    const userId = req.userId
   
    
    const result = await LostItemsServices.createLostItemIntoDB(userId,req.body)
    sendResponse(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:'Lost item submitted',
        data:result
    })
})

const getLostItems = catchAsync(async(req,res)=>{
    const result = await LostItemsServices.getLostItemFromDB(req.query)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Lost items retrieved',
        data:result
    })
})

const getMyLostItems = catchAsync(async(req:any,res)=>{
    const userId = req.userId
    const result = await LostItemsServices.getMyLostItemsFromDB(userId)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:'Lost items retrieved',
        data:result
    })
})


export const LostItemsController = {
    createLostItem,
    getLostItems,
    getMyLostItems
}