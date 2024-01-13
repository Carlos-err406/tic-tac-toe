/*
  Warnings:

  - You are about to alter the column `name` on the `Challengers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(8)`.
  - You are about to alter the column `name` on the `Opponents` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(8)`.

*/
-- AlterTable
ALTER TABLE "Challengers" ALTER COLUMN "name" SET DATA TYPE VARCHAR(8);

-- AlterTable
ALTER TABLE "Opponents" ALTER COLUMN "name" SET DATA TYPE VARCHAR(8);
