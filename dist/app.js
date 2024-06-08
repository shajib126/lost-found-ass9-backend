"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const http_status_1 = __importDefault(require("http-status"));
//app 
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use((0, cors_1.default)({ origin: ['http://localhost:3000', 'https://lost-found-ass-9.vercel.app'], credentials: true }));
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => {
    res.send('Lost and found API');
});
app.use('/', routes_1.default);
app.use(globalErrorHandler_1.default);
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'API NOT FOUND',
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!"
        }
    });
});
exports.default = app;
