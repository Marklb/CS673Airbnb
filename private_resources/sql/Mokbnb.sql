-- -----------------------------------------------------
-- Schema mokbnb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mokbnb` ;

-- -----------------------------------------------------
-- Schema mokbnb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mokbnb` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
USE `mokbnb` ;

-- -----------------------------------------------------
-- Table `Address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Address` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Address` (
  `addr_id` INT NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `zip` VARCHAR(10) NULL,
  `country` VARCHAR(45) NULL,
  PRIMARY KEY (`addr_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `addr_id_UNIQUE` ON `Address` (`addr_id` ASC);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Users` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) GENERATED ALWAYS AS (concat(first_name, ' ', last_name)) VIRTUAL,
  `addr_id` INT NULL,
  `gender` VARCHAR(45) NULL,
  `birth_date` VARCHAR(45) NOT NULL,
  `profile_pic` VARCHAR(45) NULL,
  `bio` VARCHAR(45) NULL,
  `join_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `user_id_UNIQUE` ON `Users` (`user_id` ASC);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `UserSession`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `UserSession` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `UserSession` (
  `user_id` INT NOT NULL,
  `auth_type` VARCHAR(45) NOT NULL,
  `session_auth_id` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`user_id`, `session_auth_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `session_id_UNIQUE` ON `UserSession` (`session_auth_id` ASC);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ListingType`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ListingType` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ListingType` (
  `list_type_id` INT NOT NULL AUTO_INCREMENT,
  `list_type_name` enum('Instant Booking','Auction','User-Set Response Time Frame','Host-Set Response Time Frame') DEFAULT NULL,
  PRIMARY KEY (`list_type_id`))
ENGINE = InnoDB;


CREATE UNIQUE INDEX `listType_id_UNIQUE` ON `ListingType` (`list_type_id` ASC);
SHOW WARNINGS;

INSERT INTO `ListingType` (`list_type_id`, `list_type_name`) VALUES
(1, 'Instant Booking'),
(2, 'Auction'),
(3, 'User-Set Response Time Frame'),
(4, 'Host-Set Response Time Frame');
SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `HostPlaceListing`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HostPlaceListing` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `HostPlaceListing` (
  `place_id` INT NOT NULL,
  `host_id` INT NOT NULL,
  `list_type_id` INT NOT NULL,
  `ask_amount` VARCHAR(8) NOT NULL,
  `initial_date_range` VARCHAR(30) NOT NULL,
  `booked_dates` VARCHAR(200) NOT NULL,
  `response_time` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`place_id`, `host_id`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Place`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Place` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Place` (
  `place_id` INT NOT NULL AUTO_INCREMENT,
  `host_id` INT NOT NULL,
  `addr_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `cost_per_night` VARCHAR(45) NULL,
  `max_people` INT NULL,
  `pictures` VARCHAR(45) NULL,
  PRIMARY KEY (`place_id`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `place_id_UNIQUE` ON `Place` (`place_id` ASC);

CREATE UNIQUE INDEX `host_id_UNIQUE` ON `Place` (`host_id` ASC);

CREATE UNIQUE INDEX `addr_id_UNIQUE` ON `Place` (`addr_id` ASC);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ClientPlaceRequest`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ClientPlaceRequest` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ClientPlaceRequest` (
  `req_id` INT NOT NULL AUTO_INCREMENT,
  `client_id` INT NOT NULL,
  `place_id` INT NOT NULL,
  `resp_time` VARCHAR(45) NULL,
  `date_range` VARCHAR(45) NULL,
  `date_req` VARCHAR(45) NULL,
  `date_resp` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`req_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `req_id_UNIQUE` ON `ClientPlaceRequest` (`req_id` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Auction`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Auction` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Auction` (
  `auction_id` INT NOT NULL AUTO_INCREMENT,
  `place_id` INT NOT NULL,
  `starting_price` VARCHAR(10) NOT NULL,
  `current_price` VARCHAR(10) NULL,
  `sold_price` VARCHAR(10) NULL,
  PRIMARY KEY (`auction_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `auction_id_UNIQUE` ON `Auction` (`auction_id` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ClientAuctionBids`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ClientAuctionBids` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ClientAuctionBids` (
  `bid_id` INT NOT NULL AUTO_INCREMENT,
  `auction_id` INT NOT NULL,
  `bid_price` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`bid_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `bid_id_UNIQUE` ON `ClientAuctionBids` (`bid_id` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Reservation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Reservation` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Reservation` (
  `reservation_id` INT NOT NULL AUTO_INCREMENT,
  `place_id` INT NOT NULL,
  `host_id` INT NOT NULL,
  `client_id` INT NOT NULL,
  `payment_type_id` INT NOT NULL,
  `date_range` VARCHAR(45) NULL,
  `amt_paid` VARCHAR(45) NULL,
  `paid_date` VARCHAR(45) NULL,
  PRIMARY KEY (`reservation_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `reservation_id_UNIQUE` ON `Reservation` (`reservation_id` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `PaymentType`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PaymentType` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `PaymentType` (
  `payment_type_id` int(5) NOT NULL,
  `payment_type_name` enum('Cash','Check','Credit Card','PayPal', 'Other') DEFAULT NULL,
  PRIMARY KEY (`payment_type_id`))
ENGINE=InnoDB;

CREATE UNIQUE INDEX `paymentType_id_UNIQUE` ON `PaymentType` (`payment_type_id` ASC);
SHOW WARNINGS;

INSERT INTO `PaymentType` (`payment_type_id`, `payment_type_name`) VALUES
(1, 'Cash'),
(2, 'Check'),
(3, 'Credit Card'),
(4, 'PayPal'),
(5, 'Other');
SHOW WARNINGS;

-- -----------------------------------------------------
-- Still to Do --- Table `CreditCard, Paypal, Check, Reviews, Comments, Public Q&A`
-- -----------------------------------------------------

INSERT INTO Users (
   email,password,first_name,
   last_name,gender,birth_date
) VALUES (
   'JohnDoe@VIP.com', 'test', 'John', 'Doe', 'M','03/26/90'
);
