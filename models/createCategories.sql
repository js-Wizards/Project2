USE eventfinder_db;

ALTER TABLE `eventfinder_db`.`categories` 
CHANGE COLUMN `createdAt` `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ;

ALTER TABLE `eventfinder_db`.`categories` 
CHANGE COLUMN `updatedAt` `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ;

INSERT INTO  categories (name)
VALUES ("music"),
    ("movie"),
    ("sports"),
    ("arts & theatre"),
    ("user event");