"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const profileSchema = zod_1.z.object({
    bio: zod_1.z.string().nonempty('Bio is required'),
    age: zod_1.z.number().nonnegative('Age must be a non-negative number'),
});
const registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        email: zod_1.z.string({ required_error: 'Email is required' }),
        password: zod_1.z.string(),
        profile: profileSchema
    })
});
const loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email format').nonempty('Email is required'),
        password: zod_1.z.string().min(8, 'Password must be at least 8 characters long')
    })
});
exports.UserValidation = {
    registerValidation: registerSchema,
    loginValidation: loginSchema,
};
