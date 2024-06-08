"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LostItemsRoutes = void 0;
//routes
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const lostItems_validation_1 = require("./lostItems.validation");
const lostItems_controller_1 = require("./lostItems.controller");
const router = express_1.default.Router();
router.post('/lost-item/create', (0, auth_1.default)(['user']), (0, validateRequest_1.default)(lostItems_validation_1.LostItemsValidation.createFoundItemValidation), lostItems_controller_1.LostItemsController.createLostItem);
router.get('/lost-items', (0, auth_1.default)(['user', 'admin']), lostItems_controller_1.LostItemsController.getLostItems);
router.get('/me/lost-items', (0, auth_1.default)(['user']), lostItems_controller_1.LostItemsController.getMyLostItems);
exports.LostItemsRoutes = router;
