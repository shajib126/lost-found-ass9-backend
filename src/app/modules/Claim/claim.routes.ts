import express from 'express'
import auth from '../../middleware/auth'
import { ClaimController } from './claim.controller'
import validateRequest from '../../middleware/validateRequest'
import { claimValidation } from './claim.validation'

const router = express.Router()

router.post('/claims',auth(['user']),ClaimController.createClaim)
router.get('/claims',auth(['user','admin']),ClaimController.allClaims)
router.get('/me/claims',auth(['user']),ClaimController.myClaims)

export const ClaimRoutes = router