-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '30 days';
