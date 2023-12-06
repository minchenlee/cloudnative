/*
  Warnings:

  - You are about to drop the column `bookingId` on the `ActivityRecord` table. All the data in the column will be lost.
  - You are about to drop the column `memberId` on the `ActivityRecord` table. All the data in the column will be lost.
  - You are about to drop the column `sport` on the `ActivityRecord` table. All the data in the column will be lost.
  - Added the required column `date` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endHour` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sport` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starthour` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ActivityRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ActivityRecord" DROP CONSTRAINT "ActivityRecord_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "ActivityRecord" DROP CONSTRAINT "ActivityRecord_memberId_fkey";

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "endHour" INTEGER NOT NULL,
ADD COLUMN     "sport" "Sports" NOT NULL,
ADD COLUMN     "starthour" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ActivityRecord" DROP COLUMN "bookingId",
DROP COLUMN "memberId",
DROP COLUMN "sport",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ActivityRecord" ADD CONSTRAINT "ActivityRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
