"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoundItemsValidation = void 0;
const zod_1 = require("zod");
const createFoundItemSchema = zod_1.z.object({
    body: zod_1.z.object({
        categoryId: zod_1.z.string({ required_error: 'Category is required' }),
        foundItemName: zod_1.z.string({ required_error: 'found item name is required' }),
        brand: zod_1.z.string({ required_error: 'brand is required' }),
        primaryColor: zod_1.z.string({ required_error: 'primary color is required' }),
        secondayColor: zod_1.z.string({ required_error: 'secondary color is required' }),
        foundDate: zod_1.z.string({ required_error: 'found date is required' }),
        location: zod_1.z.string({ required_error: 'location is required' }),
        images: zod_1.z.string().array().optional(),
        phone: zod_1.z.string().optional(),
        email: zod_1.z.string().optional()
    })
});
exports.FoundItemsValidation = {
    createFoundItemValidation: createFoundItemSchema
};
