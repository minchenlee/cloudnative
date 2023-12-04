/*
  Warnings:

  - The values [FOOTBALL] on the enum `Sports` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `hour` on the `BookingRecord` table. All the data in the column will be lost.
  - Added the required column `endHour` to the `BookingRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startHour` to the `BookingRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isIndoor` to the `Stadium` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Stadium` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Sports_new" AS ENUM ('BADMINTON', 'BASKETBALL', 'VOLLEYBALL', 'TENNIS', 'TABLETENNIS');
ALTER TABLE "Stadium" ALTER COLUMN "sport" TYPE "Sports_new" USING ("sport"::text::"Sports_new");
ALTER TABLE "BookingRecord" ALTER COLUMN "sport" TYPE "Sports_new" USING ("sport"::text::"Sports_new");
ALTER TABLE "Activity" ALTER COLUMN "sport" TYPE "Sports_new" USING ("sport"::text::"Sports_new");
ALTER TYPE "Sports" RENAME TO "Sports_old";
ALTER TYPE "Sports_new" RENAME TO "Sports";
DROP TYPE "Sports_old";
COMMIT;

-- AlterTable
ALTER TABLE "BookingRecord" DROP COLUMN "hour",
ADD COLUMN     "endHour" INTEGER NOT NULL,
ADD COLUMN     "startHour" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Stadium" ADD COLUMN     "isIndoor" BOOLEAN NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "status" DROP DEFAULT;
