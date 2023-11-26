/*
  Warnings:

  - You are about to drop the column `activutyId` on the `ActivityRecord` table. All the data in the column will be lost.
  - Added the required column `activityId` to the `ActivityRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ActivityRecord" DROP CONSTRAINT "ActivityRecord_activutyId_fkey";

-- AlterTable
ALTER TABLE "ActivityRecord" DROP COLUMN "activutyId",
ADD COLUMN     "activityId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ActivityRecord" ADD CONSTRAINT "ActivityRecord_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
