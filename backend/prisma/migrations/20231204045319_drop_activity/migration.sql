/*
  Warnings:

  - You are about to drop the column `activityId` on the `ActivityRecord` table. All the data in the column will be lost.
  - You are about to drop the `Activity` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bookingId` to the `ActivityRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacity` to the `BookingRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActivity` to the `BookingRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `BookingRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_hostId_fkey";

-- DropForeignKey
ALTER TABLE "ActivityRecord" DROP CONSTRAINT "ActivityRecord_activityId_fkey";

-- AlterTable
ALTER TABLE "ActivityRecord" DROP COLUMN "activityId",
ADD COLUMN     "bookingId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "BookingRecord" ADD COLUMN     "capacity" INTEGER NOT NULL,
ADD COLUMN     "isActivity" BOOLEAN NOT NULL,
ADD COLUMN     "note" TEXT NOT NULL;

-- DropTable
DROP TABLE "Activity";

-- AddForeignKey
ALTER TABLE "ActivityRecord" ADD CONSTRAINT "ActivityRecord_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "BookingRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
