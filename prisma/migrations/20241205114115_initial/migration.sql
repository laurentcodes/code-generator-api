-- CreateEnum
CREATE TYPE "CodeStatus" AS ENUM ('PENDING', 'EXPIRED', 'USED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "account" INTEGER NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Code" (
    "id" SERIAL NOT NULL,
    "userAccount" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "status" "CodeStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Code_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_account_key" ON "User"("account");
