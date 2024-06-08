import express from 'express'
import auth from '../../middleware/auth'
import { CategoryCotroller } from './category.controller'
import validateRequest from '../../middleware/validateRequest'
import { CategoryValidaion } from './category.validation'

const router = express.Router()

router.post('/found-item-categories',auth(['user','admin']),validateRequest(CategoryValidaion.createCategoryValidation),CategoryCotroller.createCategory)
router.get('/found-item-categories',auth(['user','admin']),CategoryCotroller.categories)

export const CategoryRoutes = router