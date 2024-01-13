-- CreateEnum
CREATE TYPE "GameState" AS ENUM ('CREATED', 'OPONENT_JOINING', 'IN_PROGRESS', 'O_WON', 'X_WON', 'DRAW', 'X', 'O');

-- CreateTable
CREATE TABLE "Game" (
    "roomID" TEXT NOT NULL,
    "inviteLink" TEXT NOT NULL,
    "gameLink" TEXT NOT NULL,
    "state" "GameState" NOT NULL DEFAULT 'CREATED',
    "boardId" INTEGER NOT NULL,
    "challengerId" INTEGER NOT NULL,
    "opponentId" INTEGER NOT NULL,
    "scoreId" INTEGER NOT NULL,

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
    "name" TEXT NOT NULL,

    CONSTRAINT "Challenger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opponent" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

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
