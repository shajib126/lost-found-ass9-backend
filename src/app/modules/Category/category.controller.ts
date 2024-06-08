import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { CategoryServices } from "./category.service";

const createCategory = catchAsync(async(req,res)=>{
    const result = await CategoryServices.createCategoryIntoDB(req.body)
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:'Category created successfully',
        data:result
    })
})

const categories = catchAsync(async(req,res)=>{
    const result = await CategoryServices.categoriesFromDB()
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:'Categories retrieved successfully',
        data:result
    })
})


export const CategoryCotroller = {
    createCategory,
    categories
}