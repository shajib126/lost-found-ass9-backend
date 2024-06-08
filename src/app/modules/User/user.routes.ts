import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { UserValidation } from './user.validation'
import auth from '../../middleware/auth'

const router = express.Router()

router.post('/register',validateRequest(UserValidation.registerValidation),UserController.register)
router.post('/login',validateRequest(UserValidation.loginValidation),UserController.login)
router.get('/profile',auth(['user','admin']),UserController.myProfile)
router.put('/update',auth(['user','admin']),UserController.updateProfile)
router.put('/change-password',auth(['user','admin']),UserController.changePassword)
router.get('/users',auth(['admin','user']),UserController.users)
router.get('/user/:userId',auth(['admin','user']),UserController.user)
router.put('/user/deactive/:userId',auth(['admin']),UserController.deactiveUser)
export const UserRoutes = router