"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimRoutes = void 0;
//claim routes
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const claim_controller_1 = require("./claim.controller");
const router = express_1.default.Router();
router.post('/claims', (0, auth_1.default)(['user']), claim_controller_1.ClaimController.createClaim);
router.get('/claims', (0, auth_1.default)(['user', 'admin']), claim_controller_1.ClaimController.allClaims);
router.get('/me/claims', (0, auth_1.default)(['user']), claim_controller_1.ClaimController.myClaims);
exports.ClaimRoutes = router;
