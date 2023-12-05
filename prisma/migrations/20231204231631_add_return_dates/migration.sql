/*
  Warnings:

  - A unique constraint covering the columns `[borrowerId,bookId]` on the table `BorrowingProcess` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BorrowingProcess_borrowerId_bookId_key" ON "BorrowingProcess"("borrowerId", "bookId");
