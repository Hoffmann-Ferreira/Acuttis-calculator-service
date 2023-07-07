-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ServiceHours" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "collaborator" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "daytimeHours" INTEGER NOT NULL,
    "nightHours" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "ServiceHours_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceHours_id_key" ON "ServiceHours"("id");
