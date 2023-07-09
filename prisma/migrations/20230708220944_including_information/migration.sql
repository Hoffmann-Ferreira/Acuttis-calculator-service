/*
  Warnings:

  - You are about to drop the column `daytimeHours` on the `ServiceHours` table. All the data in the column will be lost.
  - You are about to drop the column `nightHours` on the `ServiceHours` table. All the data in the column will be lost.
  - Added the required column `finalHours` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoursDay` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoursNigth` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initialHours` to the `ServiceHours` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ServiceHours" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collaborator" TEXT NOT NULL,
    "initialDate" TEXT NOT NULL,
    "finalDate" TEXT NOT NULL,
    "initialHours" TEXT NOT NULL,
    "finalHours" TEXT NOT NULL,
    "daytimePrice" REAL NOT NULL,
    "nightPrice" REAL NOT NULL,
    "hoursDay" REAL NOT NULL,
    "hoursNigth" REAL NOT NULL,
    "amount" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ServiceHours_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ServiceHours" ("amount", "collaborator", "daytimePrice", "finalDate", "id", "initialDate", "nightPrice", "userId") SELECT "amount", "collaborator", "daytimePrice", "finalDate", "id", "initialDate", "nightPrice", "userId" FROM "ServiceHours";
DROP TABLE "ServiceHours";
ALTER TABLE "new_ServiceHours" RENAME TO "ServiceHours";
CREATE UNIQUE INDEX "ServiceHours_id_key" ON "ServiceHours"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
