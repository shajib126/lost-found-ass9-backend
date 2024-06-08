import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { UserServices } from "./user.service";

const register = catchAsync(async(req,res)=>{
    const result = await UserServices.registerIntoDB(req.body)
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.CREATED,
        message:'User registered successfully',
        data:result
    })
})


const login = catchAsync(async(req,res)=>{
    const result = await UserServices.loginIntoDB(req.body)
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:'User logged in successfully',
        data:result
    })
})

const myProfile = catchAsync(async(req:any,res)=>{
    const userId =req.userId
    
    
    const result = await UserServices.myProfileFromDB(userId)
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:'My profile retrieve successfully',
        data:result
    })
})


const updateProfile = catchAsync(async(req:any,res)=>{
    const userId = req.userId
    const result = await UserServices.updateUserIntoDB(userId,req.body)
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:'My profile Updated successfully',
        data:result
    })
})


const changePassword = catchAsync(async(req:any,res)=>{
    const userId = req.userId
    const result = await UserServices.changePasswordIntoDB(userId,req.body)
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:'Changed password successfully',
        data:result
    })
})

const users = catchAsync(async(req:any,res)=>{
  
    const result = await UserServices.usersFromDB()
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:'all users retrieve successfully',
        data:result
    })
})

const user = catchAsync(async(req:any,res)=>{
  const {userId} = req.params
 
  
    const result = await UserServices.userFromDB(userId)
    sendResponse(res,{
        success:true,
        statusCode:httpStatus.OK,
        message:'user retrieve successfully',
        data:result
    })
})

const deactiveUser = catchAsync(async(req:any,res)=>{
    const {userId} = req.params

      const result = await UserServices.deactiveUser(userId,req.body)
      sendResponse(res,{
          success:true,
          statusCode:httpStatus.OK,
          message:`user  ${req.body.deactivated ? 'deactivate' : 'Active'}  successfully`,
          data:result
      })
  })
  


export const UserController = {
    register,
    login,
    myProfile,
    updateProfile,
    changePassword,
    users,
    user,
    deactiveUser
}