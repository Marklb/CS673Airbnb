-- -----------------------------------------------------
-- Schema airbnb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `airbnb` ;

-- -----------------------------------------------------
-- Schema airbnb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `airbnb` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
USE `airbnb` ;

-- -----------------------------------------------------
-- Table `Address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Address` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Address` (
  `addr_ID` INT NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `zip` VARCHAR(10) NULL,
  `country` VARCHAR(45) NULL,
  PRIMARY KEY (`addr_ID`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `addr_ID_UNIQUE` ON `Address` (`addr_ID` ASC);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Users` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Users` (
  `user_ID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `Fname` VARCHAR(45) NOT NULL,
  `Lname` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) GENERATED ALWAYS AS (concat(Fname, Lname)) VIRTUAL,
  `email` VARCHAR(45) NOT NULL,
  `addr_ID` INT NULL,
  `gender` VARCHAR(45) NOT NULL,
  `DOB` VARCHAR(45) NOT NULL,
  `profile_pic` VARCHAR(45) NULL,
  `bio` VARCHAR(45) NULL,
  `join_date` VARCHAR(45) NULL,
  PRIMARY KEY (`user_ID`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `user_ID_UNIQUE` ON `Users` (`user_ID` ASC);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ListingType`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ListingType` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ListingType` (
  `listType_ID` INT NOT NULL AUTO_INCREMENT,
  `listType_Name` enum('Instant Booking','Auction','User-Set Response Time Frame','Host-Set Response Time Frame') DEFAULT NULL,
  PRIMARY KEY (`listType_ID`))
ENGINE = InnoDB;


CREATE UNIQUE INDEX `listType_ID_UNIQUE` ON `ListType` (`listType_ID` ASC);
SHOW WARNINGS;

INSERT INTO `ListingType` (`listType_ID`, `listType_Name`) VALUES
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
  `place_ID` INT NOT NULL,
  `host_ID` INT NOT NULL,
  `listType_ID` INT NOT NULL,
  `askAmount` VARCHAR(8) NOT NULL,
  `initialDateRange` VARCHAR(30) NOT NULL,
  `bookedDates` VARCHAR(200) NOT NULL,
  `responseTime` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`place_ID`, `host_ID`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Place`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Place` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Place` (
  `place_ID` INT NOT NULL AUTO_INCREMENT,
  `host_ID` INT NOT NULL,
  `addr_ID` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `cost_per_night` VARCHAR(45) NULL,
  `max_people` INT NULL,
  `pictures` VARCHAR(45) NULL,
  PRIMARY KEY (`place_ID`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `place_ID_UNIQUE` ON `Place` (`place_ID` ASC);

CREATE UNIQUE INDEX `host_ID_UNIQUE` ON `Place` (`host_ID` ASC);

CREATE UNIQUE INDEX `addr_ID_UNIQUE` ON `Place` (`addr_ID` ASC);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ClientPlaceRequest`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ClientPlaceRequest` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ClientPlaceRequest` (
  `req_ID` INT NOT NULL AUTO_INCREMENT,
  `client_ID` INT NOT NULL,
  `place_ID` INT NOT NULL,
  `resp_time` VARCHAR(45) NULL,
  `date_range` VARCHAR(45) NULL,
  `date_req` VARCHAR(45) NULL,
  `date_resp` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`req_ID`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `req_ID_UNIQUE` ON `ClientPlaceRequest` (`req_ID` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Auction`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Auction` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Auction` (
  `auction_ID` INT NOT NULL AUTO_INCREMENT,
  `place_ID` INT NOT NULL,
  `starting_price` VARCHAR(10) NOT NULL,
  `current_price` VARCHAR(10) NULL,
  `sold_price` VARCHAR(10) NULL,
  PRIMARY KEY (`auction_ID`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `auction_ID_UNIQUE` ON `Auction` (`auction_ID` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `ClientAuctionBids`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ClientAuctionBids` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `ClientAuctionBids` (
  `bid_ID` INT NOT NULL AUTO_INCREMENT,
  `auction_ID` INT NOT NULL,
  `bid_price` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`bid_ID`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `bid_ID_UNIQUE` ON `ClientAuctionBids` (`bid_ID` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Reservation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Reservation` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Reservation` (
  `reservation_ID` INT NOT NULL AUTO_INCREMENT,
  `place_ID` INT NOT NULL,
  `host_ID` INT NOT NULL,
  `client_ID` INT NOT NULL,
  `paymentType_ID` INT NOT NULL,
  `date_range` VARCHAR(45) NULL,
  `amt_paid` VARCHAR(45) NULL,
  `paid_date` VARCHAR(45) NULL,
  PRIMARY KEY (`reservation_ID`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `reservation_ID_UNIQUE` ON `Reservation` (`reservation_ID` ASC);

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `PaymentType`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PaymentType` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `PaymentType` (
  `paymentType_ID` int(5) NOT NULL,
  `paymentType_Name` enum('Cash','Check','Credit Card','PayPal', 'Other') DEFAULT NULL,
  PRIMARY KEY (`paymentType_ID`))
ENGINE=InnoDB;

CREATE UNIQUE INDEX `paymentType_ID_UNIQUE` ON `PaymentType` (`paymentType_ID` ASC);
SHOW WARNINGS;

INSERT INTO `PaymentType` (`paymentType_ID`, `paymentType_Name`) VALUES
(1, 'Cash'),
(2, 'Check'),
(3, 'Credit Card'),
(4, 'PayPal'),
(5, 'Other');
SHOW WARNINGS;

-- -----------------------------------------------------
-- Still to Do --- Table `CreditCard, Paypal, Check, Reviews, Comments, Public Q&A`
-- -----------------------------------------------------

INSERT INTO airbnb.Users (
   username,password,Fname,
   Lname,email,gender,DOB
) VALUES (
   'JohnDoe', 'test', 'John', 'Doe', 'JohnDoe@VIP.com','M','03/26/90'
);
