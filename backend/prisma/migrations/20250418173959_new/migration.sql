/*
  Warnings:

  - You are about to drop the column `customTemplatesId` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `metaDescription` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `metaTitle` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `templateId` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the `CustomTemplates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Page` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Template` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[merchantTemplateId]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'PENDING', 'CANCELED', 'FAILED');

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_customTemplatesId_fkey";

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_shopId_fkey";

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_customTemplatesId_fkey";

-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_templateId_fkey";

-- AlterTable
ALTER TABLE "Shop" DROP COLUMN "customTemplatesId",
DROP COLUMN "metaDescription",
DROP COLUMN "metaTitle",
DROP COLUMN "templateId",
ADD COLUMN     "merchantTemplateId" TEXT;

-- DropTable
DROP TABLE "CustomTemplates";

-- DropTable
DROP TABLE "Page";

-- DropTable
DROP TABLE "Template";

-- CreateTable
CREATE TABLE "BaseTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "previewUrls" TEXT[],
    "status" "StatusIndicator" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BaseTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasePage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "css" TEXT NOT NULL,
    "js" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,

    CONSTRAINT "BasePage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MerchantTemplate" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "baseTemplateId" TEXT NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "activatedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "version" TEXT NOT NULL DEFAULT '1.0.0',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MerchantTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomPage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "css" TEXT NOT NULL,
    "js" TEXT NOT NULL,
    "merchantTemplateId" TEXT NOT NULL,

    CONSTRAINT "CustomPage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BaseTemplate_name_idx" ON "BaseTemplate"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BaseTemplate_name_key" ON "BaseTemplate"("name");

-- CreateIndex
CREATE INDEX "BasePage_templateId_idx" ON "BasePage"("templateId");

-- CreateIndex
CREATE INDEX "MerchantTemplate_merchantId_idx" ON "MerchantTemplate"("merchantId");

-- CreateIndex
CREATE UNIQUE INDEX "MerchantTemplate_merchantId_baseTemplateId_key" ON "MerchantTemplate"("merchantId", "baseTemplateId");

-- CreateIndex
CREATE INDEX "CustomPage_merchantTemplateId_idx" ON "CustomPage"("merchantTemplateId");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_merchantTemplateId_key" ON "Shop"("merchantTemplateId");

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_merchantTemplateId_fkey" FOREIGN KEY ("merchantTemplateId") REFERENCES "MerchantTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasePage" ADD CONSTRAINT "BasePage_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "BaseTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchantTemplate" ADD CONSTRAINT "MerchantTemplate_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchantTemplate" ADD CONSTRAINT "MerchantTemplate_baseTemplateId_fkey" FOREIGN KEY ("baseTemplateId") REFERENCES "BaseTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomPage" ADD CONSTRAINT "CustomPage_merchantTemplateId_fkey" FOREIGN KEY ("merchantTemplateId") REFERENCES "MerchantTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
