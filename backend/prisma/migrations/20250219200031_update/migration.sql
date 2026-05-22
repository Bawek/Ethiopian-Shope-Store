-- CreateTable
CREATE TABLE "MyShop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "prviewImage" TEXT NOT NULL,
    "merchant" TEXT,

    CONSTRAINT "MyShop_pkey" PRIMARY KEY ("id")
);
