/*
  Warnings:

  - Added the required column `description` to the `MerchantTemplate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `MerchantTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MerchantTemplate" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "activatedAt" SET DEFAULT CURRENT_TIMESTAMP;
