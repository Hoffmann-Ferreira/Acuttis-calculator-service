/*
  Warnings:

  - You are about to drop the column `date` on the `ServiceHours` table. All the data in the column will be lost.
  - Added the required column `daytimePrice` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finalDate` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initialDate` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nightPrice` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ServiceHours" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collaborator" TEXT NOT NULL,
    "initialDate" DATETIME NOT NULL,
    "finalDate" DATETIME NOT NULL,
    "daytimeHours" INTEGER NOT NULL,
    "nightHours" INTEGER NOT NULL,
    "daytimePrice" REAL NOT NULL,
    "nightPrice" REAL NOT NULL,
    "amount" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ServiceHours_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ServiceHours" ("amount", "collaborator", "daytimeHours", "id", "nightHours", "userId") SELECT "amount", "collaborator", "daytimeHours", "id", "nightHours", "userId" FROM "ServiceHours";
DROP TABLE "ServiceHours";
ALTER TABLE "new_ServiceHours" RENAME TO "ServiceHours";
CREATE UNIQUE INDEX "ServiceHours_id_key" ON "ServiceHours"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
