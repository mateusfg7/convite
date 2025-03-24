-- CreateTable
CREATE TABLE `Convite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(191) NOT NULL,
    `nome_convidado` VARCHAR(191) NOT NULL,
    `empresa_convidado` VARCHAR(191) NOT NULL,
    `telefone_convidado` VARCHAR(191) NULL,
    `possui_acompanhante` BOOLEAN NOT NULL DEFAULT false,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizado_em` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Convite_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
