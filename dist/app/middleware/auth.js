"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const jwtHelpers_1 = require("../../utils/jwtHelpers");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//auth
const auth = (roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
            }
            const verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.jwt_secret);
            req.userId = verifiedUser;
            const user = yield prisma.user.findUnique({
                where: {
                    id: req.userId.userId
                }
            });
            if (!user) {
                throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'user not found');
            }
            if (!roles.includes(user.role)) {
                throw new ApiError_1.default(http_status_1.default.FORBIDDEN, `Only ${roles} are allowed to access this route`);
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = auth;
