-- CreateTable
CREATE TABLE "Wine" (
    "id" TEXT NOT NULL,
    "winery" TEXT NOT NULL,
    "wine" TEXT NOT NULL,
    "winemaker" TEXT NOT NULL DEFAULT '',
    "region" TEXT NOT NULL,
    "vintage" TEXT NOT NULL,
    "grapes" TEXT NOT NULL,
    "style" TEXT NOT NULL DEFAULT '',
    "notes" TEXT NOT NULL DEFAULT '',
    "price" TEXT NOT NULL DEFAULT '',
    "image" TEXT DEFAULT '/wine-placeholder.jpg',

    CONSTRAINT "Wine_pkey" PRIMARY KEY ("id")
);
