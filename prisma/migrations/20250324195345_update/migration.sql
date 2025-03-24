/*
  Warnings:

  - You are about to drop the column `empresa_convidado` on the `Convite` table. All the data in the column will be lost.
  - You are about to drop the column `nome_convidado` on the `Convite` table. All the data in the column will be lost.
  - You are about to drop the column `telefone_convidado` on the `Convite` table. All the data in the column will be lost.
  - Added the required column `convidado` to the `Convite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Convite` DROP COLUMN `empresa_convidado`,
    DROP COLUMN `nome_convidado`,
    DROP COLUMN `telefone_convidado`,
    ADD COLUMN `contato` VARCHAR(191) NULL,
    ADD COLUMN `convidado` VARCHAR(191) NOT NULL;
