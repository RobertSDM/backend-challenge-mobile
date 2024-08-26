-- CreateTable
CREATE TABLE "Empresa" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuario_id" TEXT NOT NULL,
    CONSTRAINT "Empresa_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Analise_mercado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "empresa_id" TEXT NOT NULL,
    "media_navegacao" INTEGER NOT NULL,
    "taxa_redirecionamento" INTEGER NOT NULL,
    CONSTRAINT "Analise_mercado_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "Empresa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cliques" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cliques" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "analise_mercado_id" INTEGER NOT NULL,
    CONSTRAINT "Cliques_analise_mercado_id_fkey" FOREIGN KEY ("analise_mercado_id") REFERENCES "Analise_mercado" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_usuario_id_key" ON "Empresa"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "Analise_mercado_empresa_id_key" ON "Analise_mercado"("empresa_id");

-- CreateIndex
CREATE UNIQUE INDEX "Cliques_analise_mercado_id_key" ON "Cliques"("analise_mercado_id");
