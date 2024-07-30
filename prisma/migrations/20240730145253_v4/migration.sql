/*
  Warnings:

  - Made the column `bags_unsorted` on table `surveys` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `surveys` ADD COLUMN `flights_hour` INTEGER NULL,
    ADD COLUMN `flights_long` INTEGER NULL,
    ADD COLUMN `flights_medium` INTEGER NULL,
    ADD COLUMN `flights_short` INTEGER NULL,
    ADD COLUMN `useWood` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `bags_unsorted` INTEGER NOT NULL;
