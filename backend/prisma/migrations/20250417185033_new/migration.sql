/*
  Warnings:

  - Added the required column `customTemplatesId` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "customTemplatesId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "customTemplatesId" TEXT;

-- CreateTable
CREATE TABLE "CustomTemplates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "StatusIndicator" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "CustomTemplates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_customTemplatesId_fkey" FOREIGN KEY ("customTemplatesId") REFERENCES "CustomTemplates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_customTemplatesId_fkey" FOREIGN KEY ("customTemplatesId") REFERENCES "CustomTemplates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
