/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clerkId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `date_joined` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `is_admin` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `is_staff` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `is_superuser` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `last_login` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `merchantUniqueId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `merchant_id` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `uniqueId` on the `Account` table. All the data in the column will be lost.
  - The `role` column on the `Account` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `createdAt` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Admin` table. All the data in the column will be lost.
  - The primary key for the `Customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address1` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `address2` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `unique_id` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `zip_code` on the `Customer` table. All the data in the column will be lost.
  - The primary key for the `Merchant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bank_account_number` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `has_physical_store` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `physical_shop_address` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `physical_shop_city` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `physical_shop_name` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `physical_shop_phone_number` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `unique_id` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Merchant` table. All the data in the column will be lost.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `barcode_image` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `merchantId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `order_date` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `order_status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `payment_status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingOptionId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `total_amount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `unique_id` on the `Order` table. All the data in the column will be lost.
  - The primary key for the `Page` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `Shop` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `last_payment_date` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `licence_image` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `next_payment_due_date` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `preview_image` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `suspense` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `unique_id` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `updated_date` on the `Shop` table. All the data in the column will be lost.
  - The `status` column on the `Shop` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Template` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `preview_image` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `template_type` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CartItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomizedPage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomizedTemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MyMerchant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MyPage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Myshop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mytemplate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Picture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Screenshot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShippingOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShopCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShopRating` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountId]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[businessPhone]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bussinessEmail]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cbeAccountNo]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tradeLicense]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tinCertificate]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Shop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firestName` to the `Account` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Account` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `lastName` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Customer` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `accountId` to the `Merchant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessName` to the `Merchant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessPhone` to the `Merchant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessType` to the `Merchant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bussinessEmail` to the `Merchant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cbeAccountNo` to the `Merchant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cleAccountNo` to the `Merchant` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Merchant` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `locationId` to the `Merchant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerName` to the `Merchant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tinCertificate` to the `Merchant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tradeLicense` to the `Merchant` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Order` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `locationId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `templateId` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - The required column `id` was added to the `Shop` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `locationId` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `merchantId` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `templateId` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'MERCHANT', 'ADMIN');

-- CreateEnum
CREATE TYPE "StatusIndicator" AS ENUM ('ACTIVE', 'SUSPENDED', 'PENDING');

-- CreateEnum
CREATE TYPE "ShopStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'UNDER_REVIEW', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_merchantUniqueId_fkey";

-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_userId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_cartId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_userId_fkey";

-- DropForeignKey
ALTER TABLE "CustomizedPage" DROP CONSTRAINT "CustomizedPage_customizedTemplateId_fkey";

-- DropForeignKey
ALTER TABLE "CustomizedTemplate" DROP CONSTRAINT "CustomizedTemplate_modifiedById_fkey";

-- DropForeignKey
ALTER TABLE "CustomizedTemplate" DROP CONSTRAINT "CustomizedTemplate_originalTemplateId_fkey";

-- DropForeignKey
ALTER TABLE "MyPage" DROP CONSTRAINT "MyPage_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_merchantId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_shippingOptionId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "ShopRating" DROP CONSTRAINT "ShopRating_shop_id_fkey";

-- DropForeignKey
ALTER TABLE "ShopRating" DROP CONSTRAINT "ShopRating_user_id_fkey";

-- DropIndex
DROP INDEX "Account_clerkId_key";

-- DropIndex
DROP INDEX "Admin_userId_key";

-- DropIndex
DROP INDEX "Customer_userId_key";

-- DropIndex
DROP INDEX "Merchant_bank_account_number_key";

-- DropIndex
DROP INDEX "Merchant_physical_shop_name_key";

-- DropIndex
DROP INDEX "Merchant_userId_key";

-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey",
DROP COLUMN "clerkId",
DROP COLUMN "customer_id",
DROP COLUMN "date_joined",
DROP COLUMN "is_active",
DROP COLUMN "is_admin",
DROP COLUMN "is_staff",
DROP COLUMN "is_superuser",
DROP COLUMN "last_login",
DROP COLUMN "merchantUniqueId",
DROP COLUMN "merchant_id",
DROP COLUMN "uniqueId",
ADD COLUMN     "firestName" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "profileUrl" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "createdAt",
DROP COLUMN "userId",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_pkey",
DROP COLUMN "address1",
DROP COLUMN "address2",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "first_name",
DROP COLUMN "last_name",
DROP COLUMN "phone_number",
DROP COLUMN "state",
DROP COLUMN "unique_id",
DROP COLUMN "userId",
DROP COLUMN "zip_code",
ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Customer_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Merchant" DROP CONSTRAINT "Merchant_pkey",
DROP COLUMN "bank_account_number",
DROP COLUMN "has_physical_store",
DROP COLUMN "physical_shop_address",
DROP COLUMN "physical_shop_city",
DROP COLUMN "physical_shop_name",
DROP COLUMN "physical_shop_phone_number",
DROP COLUMN "unique_id",
DROP COLUMN "userId",
ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "businessName" TEXT NOT NULL,
ADD COLUMN     "businessPhone" TEXT NOT NULL,
ADD COLUMN     "businessType" TEXT NOT NULL,
ADD COLUMN     "bussinessEmail" TEXT NOT NULL,
ADD COLUMN     "cbeAccountNo" TEXT NOT NULL,
ADD COLUMN     "cleAccountNo" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "locationId" TEXT NOT NULL,
ADD COLUMN     "ownerName" TEXT NOT NULL,
ADD COLUMN     "physicalShop" BOOLEAN DEFAULT false,
ADD COLUMN     "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "StatusIndicator" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "tinCertificate" TEXT NOT NULL,
ADD COLUMN     "tradeLicense" TEXT NOT NULL,
ADD CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
DROP COLUMN "barcode_image",
DROP COLUMN "merchantId",
DROP COLUMN "order_date",
DROP COLUMN "order_status",
DROP COLUMN "payment_method",
DROP COLUMN "payment_status",
DROP COLUMN "shippingOptionId",
DROP COLUMN "total_amount",
DROP COLUMN "unique_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "locationId" TEXT NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL,
ADD COLUMN     "shopId" TEXT NOT NULL,
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Page" DROP CONSTRAINT "Page_pkey",
ADD COLUMN     "shopId" TEXT,
ADD COLUMN     "templateId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ADD CONSTRAINT "Page_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Page_id_seq";

-- AlterTable
ALTER TABLE "Product" DROP CONSTRAINT "Product_pkey",
DROP COLUMN "categoryId",
DROP COLUMN "stock",
ADD COLUMN     "brand" TEXT,
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "discountPrice" DOUBLE PRECISION,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "ratings" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "shopId" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "status" "StatusIndicator" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "videoUrl" TEXT,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "description" SET NOT NULL,
ADD CONSTRAINT "Product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Product_id_seq";

-- AlterTable
ALTER TABLE "Shop" DROP CONSTRAINT "Shop_pkey",
DROP COLUMN "last_payment_date",
DROP COLUMN "licence_image",
DROP COLUMN "logo",
DROP COLUMN "next_payment_due_date",
DROP COLUMN "ownerId",
DROP COLUMN "preview_image",
DROP COLUMN "suspense",
DROP COLUMN "unique_id",
DROP COLUMN "updated_date",
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "bannerImageUrl" TEXT,
ADD COLUMN     "businessHours" JSONB,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "locationId" TEXT NOT NULL,
ADD COLUMN     "logoImageUrl" TEXT,
ADD COLUMN     "merchantId" TEXT NOT NULL,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "socialMedia" JSONB,
ADD COLUMN     "templateId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "verificationId" TEXT,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "status",
ADD COLUMN     "status" "ShopStatus" NOT NULL DEFAULT 'ACTIVE',
ADD CONSTRAINT "Shop_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Template" DROP CONSTRAINT "Template_pkey",
DROP COLUMN "category",
DROP COLUMN "preview_image",
DROP COLUMN "template_type",
ADD COLUMN     "previewImage" TEXT[],
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "StatusIndicator" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET DATA TYPE TEXT,
ADD CONSTRAINT "Template_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Template_id_seq";

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "CartItem";

-- DropTable
DROP TABLE "CustomizedPage";

-- DropTable
DROP TABLE "CustomizedTemplate";

-- DropTable
DROP TABLE "MyMerchant";

-- DropTable
DROP TABLE "MyPage";

-- DropTable
DROP TABLE "Myshop";

-- DropTable
DROP TABLE "Mytemplate";

-- DropTable
DROP TABLE "OrderItem";

-- DropTable
DROP TABLE "Picture";

-- DropTable
DROP TABLE "ProductCategory";

-- DropTable
DROP TABLE "Screenshot";

-- DropTable
DROP TABLE "ShippingOption";

-- DropTable
DROP TABLE "ShopCategory";

-- DropTable
DROP TABLE "ShopRating";

-- DropEnum
DROP TYPE "TemplateStatus";

-- DropEnum
DROP TYPE "UserRole";

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "town" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "kebele" TEXT NOT NULL,
    "woreda" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_accountId_key" ON "Admin"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_accountId_key" ON "Customer"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_accountId_key" ON "Merchant"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_businessPhone_key" ON "Merchant"("businessPhone");

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_bussinessEmail_key" ON "Merchant"("bussinessEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_cbeAccountNo_key" ON "Merchant"("cbeAccountNo");

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_tradeLicense_key" ON "Merchant"("tradeLicense");

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_tinCertificate_key" ON "Merchant"("tinCertificate");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_slug_key" ON "Shop"("slug");

-- CreateIndex
CREATE INDEX "Shop_name_idx" ON "Shop"("name");

-- CreateIndex
CREATE INDEX "Shop_slug_idx" ON "Shop"("slug");

-- CreateIndex
CREATE INDEX "Shop_createdAt_idx" ON "Shop"("createdAt");

-- AddForeignKey
ALTER TABLE "Merchant" ADD CONSTRAINT "Merchant_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merchant" ADD CONSTRAINT "Merchant_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
