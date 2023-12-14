/*
  Warnings:

  - You are about to drop the column `status` on the `Stadium` table. All the data in the column will be lost.
  - Added the required column `closeTime` to the `Stadium` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openTime` to the `Stadium` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stadium" DROP COLUMN "status",
ADD COLUMN     "closeTime" TEXT NOT NULL,
ADD COLUMN     "openTime" TEXT NOT NULL;
