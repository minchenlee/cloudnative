/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Stadium" DROP CONSTRAINT "Stadium_createdById_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updatedAt",
ADD COLUMN     "password" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Stadium" ADD CONSTRAINT "Stadium_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
