-- CreateEnum
CREATE TYPE "TemplateStatus" AS ENUM ('Pending', 'publish');

-- CreateTable
CREATE TABLE "Mytemplate" (
    "id" SERIAL NOT NULL,
    "templateName" TEXT NOT NULL,
    "templatePrice" TEXT NOT NULL,
    "PreviewImage" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TemplateStatus" NOT NULL DEFAULT 'Pending',

    CONSTRAINT "Mytemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mypage" (
    "id" SERIAL NOT NULL,
    "js" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "css" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Mypage_pkey" PRIMARY KEY ("id")
);
