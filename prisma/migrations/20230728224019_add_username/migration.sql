/*
  Warnings:

  - Added the required column `username` to the `Stadistic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stadistic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "categoryId" INTEGER,
    CONSTRAINT "Stadistic_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Stadistic" ("categoryId", "createdAt", "id", "updatedAt", "value") SELECT "categoryId", "createdAt", "id", "updatedAt", "value" FROM "Stadistic";
DROP TABLE "Stadistic";
ALTER TABLE "new_Stadistic" RENAME TO "Stadistic";
CREATE UNIQUE INDEX "Stadistic_username_key" ON "Stadistic"("username");
CREATE TABLE "new_Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Category" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
CREATE UNIQUE INDEX "Category_username_key" ON "Category"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
