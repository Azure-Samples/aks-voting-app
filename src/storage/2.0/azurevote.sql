CREATE DATABASE IF NOT EXISTS azurevote;
CREATE TABLE `azurevote`.`azurevote` (`voteid` INT NOT NULL AUTO_INCREMENT,`votevalue` VARCHAR(45) NULL,PRIMARY KEY (`voteid`));