"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoundItemsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const foundItems_controller_1 = require("./foundItems.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const foundItems_validation_1 = require("./foundItems.validation");
const router = express_1.default.Router();
router.post('/found-items', (0, auth_1.default)(), (0, validateRequest_1.default)(foundItems_validation_1.FoundItemsValidation.createFoundItemValidation), foundItems_controller_1.FoundItemsController.createFoundItem);
router.get('/found-items', (0, auth_1.default)(), foundItems_controller_1.FoundItemsController.getFoundItems);
exports.FoundItemsRoutes = router;
