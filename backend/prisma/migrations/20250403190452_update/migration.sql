/*
  Warnings:

  - You are about to drop the column `cleAccountNo` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `physicalShop` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `tinCertificate` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `tradeLicense` on the `Merchant` table. All the data in the column will be lost.
  - Added the required column `identityCard` to the `Merchant` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Merchant_tinCertificate_key";

-- DropIndex
DROP INDEX "Merchant_tradeLicense_key";

-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "cleAccountNo",
DROP COLUMN "physicalShop",
DROP COLUMN "tinCertificate",
DROP COLUMN "tradeLicense",
ADD COLUMN     "identityCard" TEXT NOT NULL;
