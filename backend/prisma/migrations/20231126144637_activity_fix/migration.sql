/*
  Warnings:

  - You are about to drop the column `starthour` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `startHour` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "starthour",
ADD COLUMN     "startHour" INTEGER NOT NULL,
ALTER COLUMN "note" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ActivityRecord" ALTER COLUMN "isAttend" DROP NOT NULL;
