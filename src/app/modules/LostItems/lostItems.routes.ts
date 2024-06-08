//routes
import express from 'express'
import auth from '../../middleware/auth'
import validateRequest from '../../middleware/validateRequest'
import { LostItemsValidation } from './lostItems.validation'
import { LostItemsController } from './lostItems.controller'
const router = express.Router()

router.post('/lost-item/create',auth(['user']),validateRequest(LostItemsValidation.createFoundItemValidation),LostItemsController.createLostItem)

router.get('/lost-items',auth(['user','admin']),LostItemsController.getLostItems)
router.get('/me/lost-items',auth(['user']),LostItemsController.getMyLostItems)

export const LostItemsRoutes = router