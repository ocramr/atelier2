-- MySQL Script generated by MySQL Workbench
-- 02/06/17 14:40:49
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema fyw
-- -----------------------------------------------------


DROP SCHEMA IF EXISTS `fyw`; 

-- -----------------------------------------------------
-- Schema fyw
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fyw` DEFAULT CHARACTER SET utf8 ;
USE `fyw` ;

-- -----------------------------------------------------
-- Table `fyw`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fyw`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `last_name` VARCHAR(255) NULL,
  `first_name` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  `username` VARCHAR(255) NULL,
  `password` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fyw`.`place`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fyw`.`place` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(25) NOT NULL, 
  `lng` VARCHAR(255) NOT NULL,
  `type_indication` ENUM('text','url'),
  `lat` VARCHAR(255) NOT NULL,
  `indication` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fyw`.`destination`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fyw`.`destination` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(25) NOT NULL, 
  `lng` VARCHAR(255) NOT NULL,
  `lat` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fyw`.`hint`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fyw`.`hint` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `value` VARCHAR(255) NULL,
  `type` ENUM('text','url'),
  `id_destination` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_dest_idx` (`id_destination` ASC),
  CONSTRAINT `id_dest`
    FOREIGN KEY (`id_destination`)
    REFERENCES `fyw`.`destination` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fyw`.`level`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fyw`.`level` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL UNIQUE,
  `max_attempts` VARCHAR(255) NULL,
  `distance` VARCHAR(255) NOT NULL,
  `time` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fyw`.`game`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fyw`.`game` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pseudo` VARCHAR(255) NULL,
  `token` VARCHAR(255) NULL,
  `score` VARCHAR(255) NULL,
  `state` INT NULL DEFAULT 0,
  `duration` VARCHAR(255) NULL,
  `id_level` INT NULL,
  `id_destination` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_level_idx` (`id_level` ASC),
  INDEX `id_destination_idx` (`id_destination` ASC),
  CONSTRAINT `id_level`
    FOREIGN KEY (`id_level`)
    REFERENCES `fyw`.`level` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_destination`
    FOREIGN KEY (`id_destination`)
    REFERENCES `fyw`.`destination` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fyw`.`place_game`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fyw`.`place_game` (
  `id_place` INT NOT NULL,
  `id_game` INT NOT NULL,
  PRIMARY KEY (`id_place`, `id_game`),
  INDEX `id_partie_idx` (`id_game` ASC),
  CONSTRAINT `id_place`
    FOREIGN KEY (`id_place`)
    REFERENCES `fyw`.`place` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_game`
    FOREIGN KEY (`id_game`)
    REFERENCES `fyw`.`game` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;