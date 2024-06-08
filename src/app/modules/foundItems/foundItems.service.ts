import { Prisma, PrismaClient } from "@prisma/client"
import { TFoundItems } from "./foundItems.interface";
const prisma = new PrismaClient()

const createFoundItemsIntoDB = async(userId:any,payload:TFoundItems)=>{
    const {phone,email,categoryId,foundItemName,brand,primaryColor,secondayColor,foundDate,location,images} = payload
  const userIdValue = userId.userId
  const foundDateValue = new Date(foundDate).toISOString();

  
    const foundItem = await prisma.foundItem.create({
        data:{userId:userIdValue,categoryId,foundItemName,brand,primaryColor,secondayColor,foundDate:foundDateValue,location,images,phone,email},
        include:{user:true,category:true}
    })

    return foundItem
}


const getFoundItemsFromDB = async (query: any) => {
  const { page = 1, limit = 10, searchTerm, foundItemName, orderBy } = query;
  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {};

  if (searchTerm) {
    where.OR = [
      { foundItemName: { contains: String(searchTerm) } },
      { description: { contains: String(searchTerm) } },
      { location: { contains: String(searchTerm) } },
    ];
  }
  if (foundItemName) where.foundItemName = { contains: String(foundItemName) };

  // Validate and set orderBy
  const validOrder: Prisma.SortOrder = orderBy === 'asc' || orderBy === 'desc' ? orderBy : 'desc';

  const [items, total] = await prisma.$transaction([
    prisma.foundItem.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: validOrder },
      include: { user: true, category: true },
    }),
    prisma.foundItem.count({ where }),
  ]);

  return { items, total };
};


const getMyFoundItemsFromDB = async(id:any)=>{
  const userId = id.userId

  const [items,total] = await prisma.$transaction([
    prisma.foundItem.findMany({
      where:{userId},
      orderBy:{createdAt:'desc'}
    }),
    prisma.foundItem.count({where:{userId}})
  ])
  return {items,total}
}


export const FoundItemServices = {
    createFoundItemsIntoDB,
    getFoundItemsFromDB,
    getMyFoundItemsFromDB
}