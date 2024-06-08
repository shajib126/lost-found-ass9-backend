import { z } from 'zod';

const profileSchema = z.object({
    bio: z.string().nonempty('Bio is required'),
    age: z.number().nonnegative('Age must be a non-negative number'),
    

});

const registerSchema = z.object({
    body:z.object({
        name: z.string({required_error:'Name is required'}),
        email: z.string({required_error:'Email is required'}),
        password: z.string(),
        profile: profileSchema
    })
    
});

const loginSchema = z.object({
    body:z.object({
        email: z.string().email('Invalid email format').nonempty('Email is required'),
        password: z.string().min(8, 'Password must be at least 8 characters long')
    })
    
});

export const UserValidation = {
    registerValidation: registerSchema,
    loginValidation: loginSchema,
};