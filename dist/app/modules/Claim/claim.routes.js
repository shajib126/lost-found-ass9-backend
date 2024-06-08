"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const claim_controller_1 = require("./claim.controller");
const router = express_1.default.Router();
router.post('/claims', (0, auth_1.default)(), claim_controller_1.ClaimController.createClaim);
router.get('/claims', (0, auth_1.default)(), claim_controller_1.ClaimController.allClaims);
exports.ClaimRoutes = router;
