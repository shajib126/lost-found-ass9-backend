/*
  Warnings:

  - You are about to drop the column `deactive` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "deactive",
ADD COLUMN     "deactivated" BOOLEAN NOT NULL DEFAULT false;
