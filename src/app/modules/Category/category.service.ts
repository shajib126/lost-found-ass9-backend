//category service
import { PrismaClient } from "@prisma/client";
import { TCategory } from "./category.interface";
const prisma = new PrismaClient()


const createCategoryIntoDB = async(payload:TCategory)=>{
    const {name} = payload
     const category = await prisma.foundItemCategory.create({
        data:{name}
     })
     return category
}

const categoriesFromDB = async()=>{
    const categories = await prisma.foundItemCategory.findMany()
    return categories
}

export const CategoryServices = {
    createCategoryIntoDB,
    categoriesFromDB
}