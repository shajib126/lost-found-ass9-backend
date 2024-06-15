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
exports.ClaimServices = void 0;
//claim services
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createClaimIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { foundItemId, distinguishingFeatures, lostDate } = payload;
    const claim = yield prisma.claim.create({
        data: {
            userId: userId.userId,
            foundItemId,
            distinguishingFeatures,
            lostDate: new Date(lostDate).toISOString()
        },
        include: {
            user: true, foundItem: true
        }
    });
    return claim;
});
const allClaimItemsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const [claims, total] = yield prisma.$transaction([
        prisma.claim.findMany({
            include: { user: true, foundItem: true }
        }),
        prisma.claim.count()
    ]);
    return { claims, total };
});
const myClaimItemsFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = id.userId;
    const claims = yield prisma.claim.findMany({
        where: {
            userId
        },
        include: { user: true, foundItem: true }
    });
    return claims;
});
exports.ClaimServices = {
    createClaimIntoDB,
    allClaimItemsFromDB,
    myClaimItemsFromDB
};
