/*
  Warnings:

  - A unique constraint covering the columns `[userAccount]` on the table `Code` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Code_userAccount_key" ON "Code"("userAccount");
