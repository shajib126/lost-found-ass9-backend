"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
//category routes
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const category_controller_1 = require("./category.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
router.post('/found-item-categories', (0, auth_1.default)(['user', 'admin']), (0, validateRequest_1.default)(category_validation_1.CategoryValidaion.createCategoryValidation), category_controller_1.CategoryCotroller.createCategory);
router.get('/found-item-categories', (0, auth_1.default)(['user', 'admin']), category_controller_1.CategoryCotroller.categories);
exports.CategoryRoutes = router;
