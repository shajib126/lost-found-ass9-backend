"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/User/user.routes");
const category_routes_1 = require("../modules/Category/category.routes");
const foundItems_routes_1 = require("../modules/foundItems/foundItems.routes");
const claim_routes_1 = require("../modules/Claim/claim.routes");
const lostItems_routes_1 = require("../modules/LostItems/lostItems.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/api',
        route: user_routes_1.UserRoutes
    },
    {
        path: '/api',
        route: category_routes_1.CategoryRoutes
    },
    {
        path: '/api',
        route: foundItems_routes_1.FoundItemsRoutes
    },
    {
        path: '/api',
        route: claim_routes_1.ClaimRoutes
    },
    {
        path: '/api',
        route: lostItems_routes_1.LostItemsRoutes
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
