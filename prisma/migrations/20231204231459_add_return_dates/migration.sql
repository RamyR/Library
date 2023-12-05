/*
  Warnings:

  - Made the column `dueDate` on table `BorrowingProcess` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BorrowingProcess" ADD COLUMN     "isReturned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "returnDate" TIMESTAMP(3),
ALTER COLUMN "dueDate" SET NOT NULL;
