/*
  Warnings:

  - You are about to drop the column `category` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `customizedTemplateId` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the `MyShop` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_category_fkey";

-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_customizedTemplateId_fkey";

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "category",
DROP COLUMN "customizedTemplateId";

-- DropTable
DROP TABLE "MyShop";

-- CreateTable
CREATE TABLE "Myshop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "prviewImage" TEXT NOT NULL,
    "merchant" TEXT,

    CONSTRAINT "Myshop_pkey" PRIMARY KEY ("id")
);
