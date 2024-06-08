import { Prisma, PrismaClient } from "@prisma/client";
import { TLostItems } from "./lostItems.interface";
const prisma = new PrismaClient()

const createLostItemIntoDB = async(userId:any,payload:TLostItems)=>{
    const {categoryId,lostItemName,brand,primaryColor,secondayColor,images,lostDate,location} = payload
    const id = userId.userId
    const lostDateValue = new Date(lostDate!).toISOString()

    const lostItem = await prisma.lostItem.create({
        data:{userId:id,categoryId,lostItemName,brand,primaryColor,secondayColor,location,images,lostDate:lostDateValue},
        include:{user:true,category:true}
    })
    return lostItem
}

const getLostItemFromDB = async(query:any)=>{
    const { page = 1, limit = 10, searchTerm, lostItemName, orderBy } = query;
    const skip = (Number(page) - 1) * Number(limit);

  const where: any = {};

  if (searchTerm) {
    where.OR = [
      { lostItemName: { contains: String(searchTerm) } },
      { location: { contains: String(searchTerm) } },
    ];
  }
  if (lostItemName) where.foundItemName = { contains: String(lostItemName) };

  // Validate and set orderBy
  const validOrder: Prisma.SortOrder = orderBy === 'asc' || orderBy === 'desc' ? orderBy : 'desc';

  const [items, total] = await prisma.$transaction([
    prisma.lostItem.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: validOrder },
      include: { user: true, category: true },
    }),
    prisma.lostItem.count({ where }),
  ]);
  return { items, total };

}

const getMyLostItemsFromDB = async(userId:any)=>{
    const id = userId.userId
    const lostItems = await prisma.lostItem.findMany({
        where:{
            userId:id
        },
        orderBy:{createdAt:'desc'},
        include:{user:true,category:true}
    })

    return lostItems
}



export const LostItemsServices = {
    createLostItemIntoDB,
    getLostItemFromDB,
    getMyLostItemsFromDB
}