/*
  Warnings:

  - A unique constraint covering the columns `[bank_account_number]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[physical_shop_name]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Merchant_bank_account_number_key" ON "Merchant"("bank_account_number");

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_physical_shop_name_key" ON "Merchant"("physical_shop_name");
