/*
  Warnings:

  - You are about to drop the column `type` on the `Stadium` table. All the data in the column will be lost.
  - Added the required column `sport` to the `Stadium` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stadium" DROP COLUMN "type",
ADD COLUMN     "sport" "Sports" NOT NULL;
