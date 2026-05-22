/*
  Warnings:

  - You are about to drop the column `online_shop_type` on the `Merchant` table. All the data in the column will be lost.
  - Added the required column `licence_image` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "online_shop_type";

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "licence_image" TEXT NOT NULL,
ADD COLUMN     "logo" TEXT NOT NULL;
