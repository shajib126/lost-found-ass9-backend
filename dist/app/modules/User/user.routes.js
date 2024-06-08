"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.default)(user_validation_1.UserValidation.registerValidation), user_controller_1.UserController.register);
router.post('/login', (0, validateRequest_1.default)(user_validation_1.UserValidation.loginValidation), user_controller_1.UserController.login);
router.get('/profile', (0, auth_1.default)(), user_controller_1.UserController.myProfile);
router.put('/update', (0, auth_1.default)(), user_controller_1.UserController.updateProfile);
router.put('/change-password', (0, auth_1.default)(), user_controller_1.UserController.changePassword);
exports.UserRoutes = router;
