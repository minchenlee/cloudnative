-- CreateEnum
CREATE TYPE "Sports" AS ENUM ('FOOTBALL', 'BASKETBALL', 'VOLLEYBALL', 'TENNIS', 'TABLETENNIS');

-- CreateTable
CREATE TABLE "Stadium" (
    "id" SERIAL NOT NULL,
    "type" "Sports" NOT NULL,
    "status" TEXT NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "description" JSONB NOT NULL,
    "img_url" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" INTEGER NOT NULL,

    CONSTRAINT "Stadium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Court" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "stadiumId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Court_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stadium" ADD CONSTRAINT "Stadium_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Court" ADD CONSTRAINT "Court_stadiumId_fkey" FOREIGN KEY ("stadiumId") REFERENCES "Stadium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
