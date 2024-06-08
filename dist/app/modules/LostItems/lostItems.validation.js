"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LostItemsValidation = void 0;
const zod_1 = require("zod");
//validation
const createLostItemSchema = zod_1.z.object({
    body: zod_1.z.object({
        categoryId: zod_1.z.string({ required_error: 'Category is required' }),
        lostItemName: zod_1.z.string({ required_error: 'found item name is required' }),
        brand: zod_1.z.string({ required_error: 'brand is required' }),
        primaryColor: zod_1.z.string({ required_error: 'primary color is required' }),
        secondayColor: zod_1.z.string({ required_error: 'secondary color is required' }),
        lostDate: zod_1.z.string().optional(),
        location: zod_1.z.string({ required_error: 'location is required' }),
        images: zod_1.z.string().array().optional(),
        phone: zod_1.z.string().optional(),
        email: zod_1.z.string().optional()
    })
});
exports.LostItemsValidation = {
    createFoundItemValidation: createLostItemSchema
};
