/*
  Warnings:

  - You are about to drop the column `key` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `File` table. All the data in the column will be lost.
  - Added the required column `bytes` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `format` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_filename` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public_id` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secure_url` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail_url` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "key",
DROP COLUMN "mimeType",
DROP COLUMN "name",
DROP COLUMN "size",
DROP COLUMN "url",
ADD COLUMN     "bytes" INTEGER NOT NULL,
ADD COLUMN     "format" TEXT NOT NULL,
ADD COLUMN     "original_filename" TEXT NOT NULL,
ADD COLUMN     "public_id" TEXT NOT NULL,
ADD COLUMN     "secure_url" TEXT NOT NULL,
ADD COLUMN     "thumbnail_url" TEXT NOT NULL;
