/*
  Warnings:

  - You are about to drop the column `meals_meat` on the `surveys` table. All the data in the column will be lost.
  - Added the required column `meals_redmeat` to the `Surveys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meals_whitemeat` to the `Surveys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `surveys` DROP COLUMN `meals_meat`,
    ADD COLUMN `meals_redmeat` INTEGER NOT NULL,
    ADD COLUMN `meals_whitemeat` INTEGER NOT NULL,
    MODIFY `profile` VARCHAR(191) NOT NULL;
