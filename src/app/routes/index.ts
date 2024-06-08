import express from 'express'
import { UserRoutes } from '../modules/User/user.routes'
import { CategoryRoutes } from '../modules/Category/category.routes'
import { FoundItemsRoutes } from '../modules/foundItems/foundItems.routes'
import { ClaimRoutes } from '../modules/Claim/claim.routes'
import { LostItemsRoutes } from '../modules/LostItems/lostItems.routes'

const router = express.Router()

const moduleRoutes = [
    {
        path:'/api',
        route:UserRoutes
    },
    {
        path:'/api',
        route:CategoryRoutes
    },
    {
        path:'/api',
        route:FoundItemsRoutes
    },
    {
        path:'/api',
        route:ClaimRoutes
    },
    {
        path:'/api',
        route:LostItemsRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path,route.route))
export default router