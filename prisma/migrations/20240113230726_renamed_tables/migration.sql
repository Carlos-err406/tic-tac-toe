/*
  Warnings:

  - You are about to drop the `Board` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Challenger` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Opponent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Score` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_boardId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_challengerId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_opponentId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_scoreId_fkey";

-- DropTable
DROP TABLE "Board";

-- DropTable
DROP TABLE "Challenger";

-- DropTable
DROP TABLE "Game";

-- DropTable
DROP TABLE "Opponent";

-- DropTable
DROP TABLE "Score";

-- CreateTable
CREATE TABLE "Games" (
    "roomID" TEXT NOT NULL,
    "inviteLink" TEXT NOT NULL,
    "gameLink" TEXT NOT NULL,
    "state" "GameState" NOT NULL DEFAULT 'CREATED',
    "boardId" INTEGER NOT NULL,
    "challengerId" INTEGER NOT NULL,
    "opponentId" INTEGER NOT NULL,
    "scoreId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("roomID")
);

-- CreateTable
CREATE TABLE "Scores" (
    "id" SERIAL NOT NULL,
    "X" INTEGER NOT NULL DEFAULT 0,
    "O" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Boards" (
    "id" SERIAL NOT NULL,
    "cells" TEXT[] DEFAULT ARRAY['', '', '', '', '', '', '', '', '']::TEXT[],

    CONSTRAINT "Boards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Challengers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Challengers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opponents" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Opponents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Games_roomID_key" ON "Games"("roomID");

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_challengerId_fkey" FOREIGN KEY ("challengerId") REFERENCES "Challengers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_opponentId_fkey" FOREIGN KEY ("opponentId") REFERENCES "Opponents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Games" ADD CONSTRAINT "Games_scoreId_fkey" FOREIGN KEY ("scoreId") REFERENCES "Scores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
