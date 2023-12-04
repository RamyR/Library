/*
  Warnings:

  - You are about to drop the column `ISBN` on the `Book` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[isbn]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isbn` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Book_ISBN_key";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "ISBN",
ADD COLUMN     "isbn" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Book_isbn_key" ON "Book"("isbn");

-- CreateIndex
CREATE INDEX "Book_isbn_title_idx" ON "Book"("isbn", "title");

-- CreateIndex
CREATE INDEX "User_name_username_idx" ON "User"("name", "username");
