/*
  Warnings:

  - You are about to drop the `Boards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Challengers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Games` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Opponents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Scores` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Games" DROP CONSTRAINT "Games_boardId_fkey";

-- DropForeignKey
ALTER TABLE "Games" DROP CONSTRAINT "Games_challengerId_fkey";

-- DropForeignKey
ALTER TABLE "Games" DROP CONSTRAINT "Games_opponentId_fkey";

-- DropForeignKey
ALTER TABLE "Games" DROP CONSTRAINT "Games_scoreId_fkey";

-- DropTable
DROP TABLE "Boards";

-- DropTable
DROP TABLE "Challengers";

-- DropTable
DROP TABLE "Games";

-- DropTable
DROP TABLE "Opponents";

-- DropTable
DROP TABLE "Scores";

-- CreateTable
CREATE TABLE "Game" (
    "roomID" VARCHAR(6) NOT NULL,
    "inviteLink" TEXT NOT NULL,
    "gameLink" TEXT NOT NULL,
    "state" "GameState" NOT NULL DEFAULT 'CREATED',
    "boardId" INTEGER NOT NULL,
    "challengerId" INTEGER NOT NULL,
    "opponentId" INTEGER NOT NULL,
    "scoreId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("roomID")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "X" INTEGER NOT NULL DEFAULT 0,
    "O" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "cells" TEXT[] DEFAULT ARRAY['', '', '', '', '', '', '', '', '']::TEXT[],

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Challenger" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(8) NOT NULL,

    CONSTRAINT "Challenger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opponent" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(8) NOT NULL,

    CONSTRAINT "Opponent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_roomID_key" ON "Game"("roomID");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_challengerId_fkey" FOREIGN KEY ("challengerId") REFERENCES "Challenger"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_opponentId_fkey" FOREIGN KEY ("opponentId") REFERENCES "Opponent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_scoreId_fkey" FOREIGN KEY ("scoreId") REFERENCES "Score"("id") ON DELETE CASCADE ON UPDATE CASCADE;
