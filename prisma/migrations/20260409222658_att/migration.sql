/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Matricula" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "cursoId" INTEGER NOT NULL,
    CONSTRAINT "Matricula_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Matricula_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Matricula" ("cursoId", "id", "userId") SELECT "cursoId", "id", "userId" FROM "Matricula";
DROP TABLE "Matricula";
ALTER TABLE "new_Matricula" RENAME TO "Matricula";
CREATE UNIQUE INDEX "Matricula_userId_cursoId_key" ON "Matricula"("userId", "cursoId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tipoAcesso" TEXT NOT NULL DEFAULT 'ALUNO'
);
INSERT INTO "new_User" ("email", "id", "name", "tipoAcesso") SELECT "email", "id", "name", "tipoAcesso" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
