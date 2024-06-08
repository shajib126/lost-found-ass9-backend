import {z} from 'zod'
//validation
const createLostItemSchema =z.object({
    body:z.object({
        categoryId:z.string({required_error:'Category is required'}),
        lostItemName:z.string({required_error:'found item name is required'}),
        brand:z.string({required_error:'brand is required'}),
        primaryColor:z.string({required_error:'primary color is required'}),
        secondayColor:z.string({required_error:'secondary color is required'}),
        lostDate:z.string().optional(),
        location:z.string({required_error:'location is required'}),
        images:z.string().array().optional(),
        phone:z.string().optional(),
        email:z.string().optional()
    })
})


export const LostItemsValidation = {
    createFoundItemValidation:createLostItemSchema
}