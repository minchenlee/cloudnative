/*
  Warnings:

  - The `status` column on the `Court` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Stadium` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'CLOSED', 'MAINTENANCE');

-- AlterTable
ALTER TABLE "Court" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'MAINTENANCE';

-- AlterTable
ALTER TABLE "Stadium" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'MAINTENANCE';

-- CreateTable
CREATE TABLE "BookingRecord" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "stadiumId" INTEGER NOT NULL,
    "courtId" INTEGER NOT NULL,
    "sport" "Sports" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hour" INTEGER NOT NULL,

    CONSTRAINT "BookingRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "hostId" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityRecord" (
    "id" SERIAL NOT NULL,
    "activutyId" INTEGER NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "sport" "Sports" NOT NULL,
    "memberId" INTEGER NOT NULL,
    "isAttend" BOOLEAN NOT NULL,

    CONSTRAINT "ActivityRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookingRecord" ADD CONSTRAINT "BookingRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingRecord" ADD CONSTRAINT "BookingRecord_courtId_fkey" FOREIGN KEY ("courtId") REFERENCES "Court"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityRecord" ADD CONSTRAINT "ActivityRecord_activutyId_fkey" FOREIGN KEY ("activutyId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityRecord" ADD CONSTRAINT "ActivityRecord_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "BookingRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityRecord" ADD CONSTRAINT "ActivityRecord_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
