/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `Matricula` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome]` on the table `Categoria` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Matricula" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "cursoId" INTEGER NOT NULL,
    CONSTRAINT "Matricula_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Matricula_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Matricula" ("cursoId", "id", "userId") SELECT "cursoId", "id", "userId" FROM "Matricula";
DROP TABLE "Matricula";
ALTER TABLE "new_Matricula" RENAME TO "Matricula";
CREATE UNIQUE INDEX "Matricula_userId_cursoId_key" ON "Matricula"("userId", "cursoId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");
