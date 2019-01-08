USE eventfinder_db;
ALTER TABLE Users
ADD Column `admin` BOOL,
ADD Column city VARCHAR(64);