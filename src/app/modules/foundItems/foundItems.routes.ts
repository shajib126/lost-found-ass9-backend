//found items routes
import express from 'express'
import auth from '../../middleware/auth'
import { FoundItemsController } from './foundItems.controller'
import validateRequest from '../../middleware/validateRequest'
import { FoundItemsValidation } from './foundItems.validation'
const router = express.Router()
router.post('/found-items',auth(['user']),validateRequest(FoundItemsValidation.createFoundItemValidation),FoundItemsController.createFoundItem)
router.get('/found-items',auth(['user','admin']),FoundItemsController.getFoundItems)
router.get('/me/found-items',auth(['user']),FoundItemsController.getMyFoundItems)

export const FoundItemsRoutes = router