/*
  Warnings:

  - You are about to drop the column `slug` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `videoUrl` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `products` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "products_slug_key";

-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '30 days';

-- AlterTable
ALTER TABLE "products" DROP COLUMN "slug",
DROP COLUMN "tags",
DROP COLUMN "videoUrl",
DROP COLUMN "views";
