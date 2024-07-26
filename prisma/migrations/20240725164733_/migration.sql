/*
  Warnings:

  - You are about to drop the `surveys` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `surveys`;

-- CreateTable
CREATE TABLE `Surveys` (
    `id` VARCHAR(191) NOT NULL,
    `userid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `gender` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `municipality` VARCHAR(191) NOT NULL,
    `meals_vegan` INTEGER NOT NULL,
    `meals_redmeat` INTEGER NOT NULL,
    `meals_whitemeat` INTEGER NOT NULL,
    `bags_unsorted` INTEGER NOT NULL,
    `bags_paper` INTEGER NOT NULL,
    `bags_plastic` INTEGER NOT NULL,
    `bags_glass` INTEGER NOT NULL,
    `bags_organic` INTEGER NOT NULL,
    `home_residents` INTEGER NOT NULL,
    `home_eletricity` INTEGER NOT NULL,
    `gas_type` VARCHAR(191) NULL,
    `gas_spend` INTEGER NULL,
    `transport_dieselCar` INTEGER NULL,
    `transport_gasCar` INTEGER NULL,
    `transport_hybridCar` INTEGER NULL,
    `transport_gplCar` INTEGER NULL,
    `transport_eletricCar` INTEGER NULL,
    `transport_motorcycle` INTEGER NULL,
    `transport_taxi` INTEGER NULL,
    `transport_train` INTEGER NULL,
    `transport_bus` INTEGER NULL,
    `transport_subway` INTEGER NULL,
    `transport_tram` INTEGER NULL,
    `transport_ferryFoot` INTEGER NULL,
    `transport_ferryCar` INTEGER NULL,
    `profile` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
