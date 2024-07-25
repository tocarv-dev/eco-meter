-- CreateTable
CREATE TABLE `Surveys` (
    `id` VARCHAR(191) NOT NULL,
    `userid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `gender` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `municipality` VARCHAR(191) NOT NULL,
    `meals_vegan` INTEGER NOT NULL,
    `meals_meat` INTEGER NOT NULL,
    `bags_unsorted` INTEGER NOT NULL,
    `bags_paper` INTEGER NOT NULL,
    `bags_plastic` INTEGER NOT NULL,
    `bags_glass` INTEGER NOT NULL,
    `bags_organic` INTEGER NOT NULL,
    `home_residents` INTEGER NOT NULL,
    `home_eletricity` INTEGER NOT NULL,
    `gas_type` VARCHAR(191) NOT NULL,
    `gas_spend` INTEGER NOT NULL,
    `profile` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
