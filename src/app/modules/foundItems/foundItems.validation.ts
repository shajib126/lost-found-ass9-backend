import {z} from 'zod'
//found items validation
const createFoundItemSchema =z.object({
    body:z.object({
        categoryId:z.string({required_error:'Category is required'}),
        foundItemName:z.string({required_error:'found item name is required'}),
        brand:z.string({required_error:'brand is required'}),
        primaryColor:z.string({required_error:'primary color is required'}),
        secondayColor:z.string({required_error:'secondary color is required'}),
        foundDate:z.string({required_error:'found date is required'}),
        location:z.string({required_error:'location is required'}),
        images:z.string().array().optional(),
        phone:z.string().optional(),
        email:z.string().optional()
    })
})


export const FoundItemsValidation = {
    createFoundItemValidation:createFoundItemSchema
}