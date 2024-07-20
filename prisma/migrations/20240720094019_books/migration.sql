-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('PENDING', 'DELIVERED', 'IN_WAREHOUSE');

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "BookStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
