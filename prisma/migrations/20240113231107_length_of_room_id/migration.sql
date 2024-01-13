/*
  Warnings:

  - The primary key for the `Games` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `roomID` on the `Games` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(6)`.

*/
-- AlterTable
ALTER TABLE "Games" DROP CONSTRAINT "Games_pkey",
ALTER COLUMN "roomID" SET DATA TYPE VARCHAR(6),
ADD CONSTRAINT "Games_pkey" PRIMARY KEY ("roomID");
