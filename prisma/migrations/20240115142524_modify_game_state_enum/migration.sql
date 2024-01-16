/*
  Warnings:

  - The values [X,O] on the enum `GameState` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GameState_new" AS ENUM ('CREATED', 'OPPONENT_JOINING', 'OPPONENT_JOINED', 'IN_PROGRESS', 'O_WON', 'X_WON', 'DRAW');
ALTER TABLE "Game" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "Game" ALTER COLUMN "state" TYPE "GameState_new" USING ("state"::text::"GameState_new");
ALTER TYPE "GameState" RENAME TO "GameState_old";
ALTER TYPE "GameState_new" RENAME TO "GameState";
DROP TYPE "GameState_old";
ALTER TABLE "Game" ALTER COLUMN "state" SET DEFAULT 'CREATED';
COMMIT;
