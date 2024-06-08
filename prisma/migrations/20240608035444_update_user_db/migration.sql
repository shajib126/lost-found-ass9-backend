/*
  Warnings:

  - You are about to drop the column `block` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "block",
ADD COLUMN     "deactive" BOOLEAN NOT NULL DEFAULT false;
