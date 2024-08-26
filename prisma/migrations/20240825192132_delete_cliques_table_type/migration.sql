/*
  Warnings:

  - You are about to drop the column `type` on the `Cliques` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cliques" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cliques" INTEGER NOT NULL,
    "analise_mercado_id" INTEGER NOT NULL,
    CONSTRAINT "Cliques_analise_mercado_id_fkey" FOREIGN KEY ("analise_mercado_id") REFERENCES "Analise_mercado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cliques" ("analise_mercado_id", "cliques", "id") SELECT "analise_mercado_id", "cliques", "id" FROM "Cliques";
DROP TABLE "Cliques";
ALTER TABLE "new_Cliques" RENAME TO "Cliques";
CREATE UNIQUE INDEX "Cliques_analise_mercado_id_key" ON "Cliques"("analise_mercado_id");
PRAGMA foreign_key_check("Cliques");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
