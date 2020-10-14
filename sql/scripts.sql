CREATE TABLE `bot_wa`.`users_now` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cliente` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `bot_wa`.`after_users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cliente` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `bot_wa`.`options` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `options_client` VARCHAR(45) NOT NULL,
  `option1` VARCHAR(45) NULL,
  `option2` VARCHAR(45) NULL,
  `option3` VARCHAR(45) NULL,
  `option4` VARCHAR(45) NULL,
  `option5` VARCHAR(45) NULL,
  `option6` VARCHAR(45) NULL,
  `option7` VARCHAR(45) NULL,
  `option8` VARCHAR(45) NULL,
  `option9` VARCHAR(45) NULL,
  `option10` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `bot_wa`.`users_now` 
ADD COLUMN `number` INT(22) NOT NULL AFTER `cliente`;

ALTER TABLE `bot_wa`.`after_users` 
ADD COLUMN `number` INT(22) NOT NULL AFTER `cliente`;