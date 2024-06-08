import {z} from 'zod'
const createCategorySchema =z.object({
    body:z.object({
        name:z.string({required_error:'Name is required'})

    })
})


export const CategoryValidaion = {
    createCategoryValidation:createCategorySchema
}