"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LostItemsServices = void 0;
//services
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createLostItemIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId, lostItemName, brand, primaryColor, secondayColor, images, lostDate, location } = payload;
    const id = userId.userId;
    const lostDateValue = new Date(lostDate).toISOString();
    const lostItem = yield prisma.lostItem.create({
        data: { userId: id, categoryId, lostItemName, brand, primaryColor, secondayColor, location, images, lostDate: lostDateValue },
        include: { user: true, category: true }
    });
    return lostItem;
});
const getLostItemFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, searchTerm, lostItemName, orderBy } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const where = {};
    if (searchTerm) {
        where.OR = [
            { lostItemName: { contains: String(searchTerm) } },
            { location: { contains: String(searchTerm) } },
        ];
    }
    if (lostItemName)
        where.foundItemName = { contains: String(lostItemName) };
    // Validate and set orderBy
    const validOrder = orderBy === 'asc' || orderBy === 'desc' ? orderBy : 'desc';
    const [items, total] = yield prisma.$transaction([
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
});
const getMyLostItemsFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = userId.userId;
    const lostItems = yield prisma.lostItem.findMany({
        where: {
            userId: id
        },
        orderBy: { createdAt: 'desc' },
        include: { user: true, category: true }
    });
    return lostItems;
});
exports.LostItemsServices = {
    createLostItemIntoDB,
    getLostItemFromDB,
    getMyLostItemsFromDB
};
