/*
  Warnings:

  - The values [FOOTBALL] on the enum `Sports` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `status` on the `Court` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `isIndoor` to the `Stadium` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Stadium` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Stadium` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'CLOSED', 'MAINTENANCE');

-- AlterEnum
BEGIN;
CREATE TYPE "Sports_new" AS ENUM ('BADMINTON', 'BASKETBALL', 'VOLLEYBALL', 'TENNIS', 'TABLETENNIS');
ALTER TABLE "Stadium" ALTER COLUMN "sport" TYPE "Sports_new" USING ("sport"::text::"Sports_new");
ALTER TYPE "Sports" RENAME TO "Sports_old";
ALTER TYPE "Sports_new" RENAME TO "Sports";
DROP TYPE "Sports_old";
COMMIT;

-- AlterTable
ALTER TABLE "Court" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL;

-- AlterTable
ALTER TABLE "Stadium" ADD COLUMN     "isIndoor" BOOLEAN NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL;
