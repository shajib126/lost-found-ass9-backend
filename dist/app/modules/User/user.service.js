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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = exports.deactiveUser = exports.userFromDB = exports.usersFromDB = void 0;
//user
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelpers_1 = require("../../../utils/jwtHelpers");
const prisma = new client_1.PrismaClient();
const registerIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, profile } = payload;
    const hashedPassword = yield bcryptjs_1.default.hash(password, Number(config_1.default.salt_round));
    const user = yield prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield prisma.user.create({
            data: { name, email, password: hashedPassword }
        });
        const userProfile = yield prisma.userProfile.create({
            data: Object.assign({ userId: newUser.id }, profile)
        });
        return Object.assign(Object.assign({}, newUser), { profile: userProfile });
    }));
    const { password: _ } = user, userData = __rest(user, ["password"]);
    return userData;
});
const loginIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield prisma.user.findUnique({
        where: {
            email
        }
    });
    if (user === null || user === void 0 ? void 0 : user.deactivated) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'This account is deactive!');
    }
    if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
        throw new ApiError_1.default(401, 'Invalid credentials');
    }
    const token = jsonwebtoken_1.default.sign({ user: user.id }, config_1.default.jwt.jwt_secret, { expiresIn: config_1.default.jwt.expires_in });
    const accessToken = jwtHelpers_1.jwtHelpers.generateToken({
        userId: user.id
    }, config_1.default.jwt.jwt_secret, config_1.default.jwt.expires_in);
    return {
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken
        }
    };
});
const myProfileFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = userId.userId;
    const user = yield prisma.user.findUnique({
        where: {
            id
        },
        include: {
            profile: true
        }
    });
    return user;
});
const updateUserIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const id = userId.userId;
    const { name, email, bio, age, image } = payload;
    const query = {};
    if (name) {
        query.name = name;
    }
    if (email) {
        query.email = email;
    }
    if (bio || age !== undefined || image) {
        query.profile = {
            update: {}
        };
        if (bio) {
            query.profile.update.bio = bio;
        }
        if (age !== undefined) {
            query.profile.update.age = age;
        }
        if (image) {
            query.profile.update.image = image;
        }
    }
    const user = yield prisma.user.update({
        where: { id },
        data: query,
        include: {
            profile: true
        }
    });
    return user;
});
const changePasswordIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const id = userId.userId;
    const user = yield prisma.user.findUnique({
        where: {
            id
        }
    });
    const isMatch = yield bcryptjs_1.default.compare(oldPassword, user === null || user === void 0 ? void 0 : user.password);
    if (!isMatch) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'You have entered wrong old password!');
    }
    if (newPassword.length < 8) {
        throw new ApiError_1.default(400, 'Password should be more than 8 charecter!');
    }
    const hashedPassword = yield bcryptjs_1.default.hash(newPassword, Number(config_1.default.salt_round));
    const chagedpassword = yield prisma.user.update({
        where: {
            id
        },
        data: {
            password: hashedPassword
        }
    });
    return chagedpassword;
});
//admin 
const usersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const [users, total] = yield prisma.$transaction([
        prisma.user.findMany({
            include: { profile: true }
        }),
        prisma.user.count()
    ]);
    return { users, total };
});
exports.usersFromDB = usersFromDB;
//admin
const userFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            id
        },
        include: {
            profile: true
        }
    });
    return user;
});
exports.userFromDB = userFromDB;
const deactiveUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (payload.deactivated == 'true') {
        query.deactivated = true;
    }
    if (payload.deactivated == 'false') {
        query.deactivated = false;
    }
    const user = yield prisma.user.update({
        where: { id },
        data: query,
        include: { profile: true }
    });
    return user;
});
exports.deactiveUser = deactiveUser;
exports.UserServices = {
    registerIntoDB,
    loginIntoDB,
    myProfileFromDB,
    updateUserIntoDB,
    changePasswordIntoDB,
    usersFromDB: exports.usersFromDB,
    userFromDB: exports.userFromDB,
    deactiveUser: exports.deactiveUser
};
