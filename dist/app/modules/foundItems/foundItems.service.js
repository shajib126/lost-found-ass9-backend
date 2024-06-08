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
exports.FoundItemServices = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createFoundItemsIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, email, categoryId, foundItemName, brand, primaryColor, secondayColor, foundDate, location, images } = payload;
    const userIdValue = userId.userId;
    const foundDateValue = new Date(foundDate).toISOString();
    const foundItem = yield prisma.foundItem.create({
        data: { userId: userIdValue, categoryId, foundItemName, brand, primaryColor, secondayColor, foundDate: foundDateValue, location, images, phone, email },
        include: { user: true, category: true }
    });
    return foundItem;
});
const getFoundItemsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, searchTerm, foundItemName, orderBy } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const where = {};
    if (searchTerm) {
        where.OR = [
            { foundItemName: { contains: String(searchTerm) } },
            { description: { contains: String(searchTerm) } },
            { location: { contains: String(searchTerm) } },
        ];
    }
    if (foundItemName)
        where.foundItemName = { contains: String(foundItemName) };
    // Validate and set orderBy
    const validOrder = orderBy === 'asc' || orderBy === 'desc' ? orderBy : 'desc';
    const [items, total] = yield prisma.$transaction([
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
});
exports.FoundItemServices = {
    createFoundItemsIntoDB,
    getFoundItemsFromDB
};
