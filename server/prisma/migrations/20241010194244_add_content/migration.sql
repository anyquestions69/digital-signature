/*
  Warnings:

  - A unique constraint covering the columns `[filename]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "content" BYTEA NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_filename_key" ON "Post"("filename");
