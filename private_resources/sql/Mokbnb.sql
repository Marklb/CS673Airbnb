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
  `disabled` BIT NOT NULL DEFAULT 0,
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

CREATE UNIQUE INDEX `session_auth_id_UNIQUE` ON `UserSession` (`session_auth_id` ASC);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Message` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Message` (
  `message_id` INT NOT NULL AUTO_INCREMENT,
  `sender_id` INT NOT NULL,
  `receiver_id` INT NOT NULL,
  `timestamp_sent` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `title` VARCHAR(200) NOT NULL,
  `body` TEXT NOT NULL,
  `is_read` BIT NOT NULL DEFAULT 0,
  `is_stared` BIT NOT NULL DEFAULT 0,
  `is_archived` BIT NOT NULL DEFAULT 0,
  PRIMARY KEY (`message_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `message_id_UNIQUE` ON `Message` (`message_id` ASC);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `HostPlaceListing`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HostPlaceListing` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `HostPlaceListing` (
  `place_id` INT NOT NULL,
  `host_id` INT NOT NULL,
  `bookingtype_id` INT NOT NULL,
  `ask_amount` VARCHAR(8) NOT NULL,
  `date_range_start` DATE NOT NULL,
  `date_range_end` DATE NOT NULL,
  `booked_dates` VARCHAR(200),
  `response_time` VARCHAR(30),
  `active` VARCHAR(3) NOT NULL,
  `rating` INT NOT NULL DEFAULT 0,
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
  `roomtype_id` INT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `cost_per_night` NUMERIC(7,2) NULL,
  `max_people` INT NULL,
  `bedroomsize` INT NULL,
  `bathroomsize` NUMERIC(2,1) NULL,
  `numofbeds` INT NULL,
  `pictures` VARCHAR(45) NULL,
  PRIMARY KEY (`place_id`))
ENGINE = InnoDB;

SHOW WARNINGS;
CREATE UNIQUE INDEX `place_id_UNIQUE` ON `Place` (`place_id` ASC);

CREATE UNIQUE INDEX `addr_id_UNIQUE` ON `Place` (`addr_id` ASC);
SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `BookingType`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BookingType` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `BookingType` (
  `bookingtype_id` INT NOT NULL AUTO_INCREMENT,
  `bookingtype_name` enum('Instant Booking','Auction','User-Set Response Time Frame','Host-Set Response Time Frame') DEFAULT NULL,
  PRIMARY KEY (`bookingtype_id`))
ENGINE = InnoDB;


CREATE UNIQUE INDEX `bookingtype_id_UNIQUE` ON `BookingType` (`bookingtype_id` ASC);
SHOW WARNINGS;

INSERT INTO `BookingType` (`bookingtype_id`, `bookingtype_name`) VALUES
(1, 'Instant Booking'),
(2, 'Auction'),
(3, 'User-Set Response Time Frame'),
(4, 'Host-Set Response Time Frame');
SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `RoomType`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `RoomType` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `RoomType` (
  `roomtype_id` INT NOT NULL AUTO_INCREMENT,
  `roomtype_name` enum('Entire home','Private room','Shared room') DEFAULT NULL,
  PRIMARY KEY (`roomtype_id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `roomtype_id_UNIQUE` ON `RoomType` (`roomtype_id` ASC);
SHOW WARNINGS;

INSERT INTO `RoomType` (`roomtype_id`, `roomtype_name`) VALUES
(1, 'Entire home'),
(2, 'Private room'),
(3, 'Shared room');
SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Amenity`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Amenity` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Amenity` (
  `amenity_id` int(5) NOT NULL,
  `amenity_name` enum('Wireless Internet','Pool','Kitchen','24-hour check-in','Air conditioning','Buzzer/wireless intercom','Cable TV','Carbon monoxide detector','Doorman','Doorman Entry','Dryer','Elevator in building','Essentials','Family/kid friendly','Fire extinguisher','First aid kit','Free parking on premises','Free parking on street','Gym','Hair dryer','Hangers','Heating','Hot tub','Indoor fireplace','Internet','Iron','Keypad','Laptop friendly workspace','Lock on bedroom door','Lockbox','Pets allowed','Safety card','Shampoo','Smartlock','Smoke detector','Smoking allowed','Suitable for events','TV','Washer','Wheelchair accessible') DEFAULT NULL,
  PRIMARY KEY (`amenity_id`))
ENGINE=InnoDB;

CREATE UNIQUE INDEX `amenity_id_UNIQUE` ON `Amenity` (`amenity_id` ASC);
SHOW WARNINGS;

INSERT INTO `Amenity` (`amenity_id`,`amenity_name`) VALUES
(1, 'Wireless Internet'),
(2, 'Pool'),
(3, 'Kitchen'),
(4, '24-hour check-in'),
(5, 'Air conditioning'),
(6, 'Buzzer/wireless intercom'),
(7, 'Cable TV'),
(8, 'Carbon monoxide detector'),
(9, 'Doorman'),
(10, 'Doorman Entry'),
(11, 'Dryer'),
(12, 'Elevator in building'),
(13, 'Essentials'),
(14, 'Family/kid friendly'),
(15, 'Fire extinguisher'),
(16, 'First aid kit'),
(17, 'Free parking on premises'),
(18, 'Free parking on street'),
(19, 'Gym'),
(20, 'Hair dryer'),
(21, 'Hangers'),
(22, 'Heating'),
(23, 'Hot tub'),
(24, 'Indoor fireplace'),
(25, 'Internet'),
(26, 'Iron'),
(27, 'Keypad'),
(28, 'Laptop friendly workspace'),
(29, 'Lock on bedroom door'),
(30, 'Lockbox'),
(31, 'Pets allowed'),
(32, 'Safety card'),
(33, 'Shampoo'),
(34, 'Smartlock'),
(35, 'Smoke detector'),
(36, 'Smoking allowed'),
(37, 'Suitable for events'),
(38, 'TV'),
(39, 'Washer'),
(40, 'Wheelchair accessible');
SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `PlaceAmenity`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `PlaceAmenity` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `PlaceAmenity` (
  `place_id` INT NOT NULL,
  `amenity_id` INT NOT NULL,
  PRIMARY KEY (`place_id`,`amenity_id`))
ENGINE = InnoDB;
SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `UserLanguage`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `UserLanguage` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `UserLanguage` (
  `user_id` INT NOT NULL,
  `language_id` INT NOT NULL,
  PRIMARY KEY (`user_id`,`language_id`))
ENGINE = InnoDB;
SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `Language`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Language` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Language` (
  `language_id` int(5) NOT NULL,
  `language_name` enum('English', 'Español', 'Français', 'Bahasa Indonesian', 'Bahasa Malaysia', 'Bengali', 'Dansk', 'Deutsch', 'Hindi', 'Italiano', 'Magyar', 'Nederlands', 'Norsk', 'Polski', 'Português', 'Punjabi', 'Sign Language', 'Suomi', 'Svenska', 'Tagalog', 'Türkçe', 'Čeština', 'Ελληνικά', 'Русский') DEFAULT NULL,
  PRIMARY KEY (`language_id`))
ENGINE=InnoDB;

CREATE UNIQUE INDEX `language_id_UNIQUE` ON `Language` (`language_id` ASC);
SHOW WARNINGS;

INSERT INTO `Language` (`language_id`, `language_name`) VALUES
(1, 'English'),
(2, 'Español'),
(3, 'Français'),
(4, 'Bahasa Indonesian'),
(5, 'Bahasa Malaysia'),
(6, 'Bengali'),
(7, 'Dansk'),
(8, 'Deutsch'),
(9, 'Hindi'),
(10, 'Italiano'),
(11, 'Magyar'),
(12, 'Nederlands'),
(13, 'Norsk'),
(14, 'Polski'),
(15, 'Português'),
(16, 'Punjabi'),
(17, 'Sign Language'),
(18, 'Suomi'),
(19, 'Svenska');
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
  `date_start` VARCHAR(45) NULL,
  `date_end` VARCHAR(45) NULL,
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
  `end_auction_time` TIMESTAMP NOT NULL,
  `active` VARCHAR(3) NOT NULL,
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
  `client_id` INT NOT NULL,
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
  `booked_date_start` DATE NOT NULL,
  `booked_date_end` DATE NOT NULL,
  `amt_paid` VARCHAR(45) NOT NULL,
  `paid_date` VARCHAR(45) NOT NULL,
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
-- Table `Ratings`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Ratings` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `Ratings` (
  `place_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `rating` INT NOT NULL,
  PRIMARY KEY (`place_id`,`user_id`))
ENGINE=InnoDB;
SHOW WARNINGS;

DROP TRIGGER IF EXISTS `InsertThenUpdateAvgRatings`;
CREATE TRIGGER InsertThenUpdateAvgRatings
AFTER INSERT ON `Ratings`
FOR EACH ROW

UPDATE hostplacelisting
SET rating = (SELECT AVG(rating)
              FROM Ratings
              WHERE place_id = NEW.place_id)
WHERE place_id = NEW.place_id;

DROP TRIGGER IF EXISTS `UpdateThenUpdateAvgRatings`;
CREATE TRIGGER UpdateThenUpdateAvgRatings
AFTER UPDATE ON `Ratings`
FOR EACH ROW

UPDATE hostplacelisting
SET rating = (SELECT AVG(rating)
              FROM Ratings
              WHERE place_id = NEW.place_id)
WHERE place_id = NEW.place_id;

SHOW WARNINGS;
-- -----------------------------------------------------
-- Still to Do --- Table `CreditCard, Paypal, Check, Reviews, Comments, Public Q&A`
-- -----------------------------------------------------

INSERT INTO Users (
   email,password,first_name,last_name,gender,birth_date
) VALUES
   ('JohnDoe@VIP.com', 'test', 'John', 'Doe', 'M','1998-04-09'),
   ('JamesBond@Agent.com', 'test', 'James', 'Bond', 'M','1992-08-16'),
   ('JaneDoe@VIP.com', 'test', 'Jane', 'Doe', 'F','2000-08-14'),
   ('JaclynBond@Agent.com', 'test', 'Jaclyn', 'Bond', 'F','1996-02-26')
;

INSERT INTO address (
   street, city, state, zip, country
) VALUES
   ("86 Heaven Lane", "Houston", "Texas", "07294", "USA"),
   ("666 Haunted Terrace", "Newark", "New Jersey", "07032", "USA"),
   ("24 Thirdington Road", "Newark", "New Jersey", "07032", "USA"),
   ("99 Fourthington Place", "Newark", "New Jersey", "07032", "USA"),
   ("68 Heaven Place", "Houston", "Texas", "07294", "USA")
;

INSERT INTO place (
   host_id, addr_id, roomtype_id, name, description, cost_per_night, max_people, bedroomsize, bathroomsize, numofbeds, pictures
) VALUES
   (1, 1, 1, "My First Cool Housetel", "Welcome to paradise.", 80.00, 2, 1, 1.5, 2, "/images/room1.jpg"),
   (2, 2, 2, "My Second Housetel", "Welcome to hell.", 666.00, 5, 3, 3, 2, "/images/room2.jpg"),
   (3, 3, 3, "The Third Floor", "Walk-Up to this gorgeous apartment.", 89.99, 3, 1, 1.5, 2, "/images/room3.jpg"),
   (4, 4, 2, "The Fourth Wall", "Stare at the fourth wall.", 64.95, 3, 1, 1.5, 2, "/images/room4.jpg"),
   (1, 5, 1, "The Fifth Scene", "Five is the lucky number.", 200.00, 3, 1, 1.5, 2, "/images/room5.jpg")
;

INSERT INTO hostplacelisting (
   place_id, host_id, bookingtype_id, ask_amount, date_range_start, date_range_end, active
) VALUE
   (1, 1, 2, "80.00", "2016-12-30", "2017-01-25", "yes"),
   (2, 2, 1, "666.00", "2016-11-02", "2016-12-16", "yes"),
   (3, 3, 3, "89.99", "2016-11-01", "2016-12-16", "yes"),
   (4, 4, 4, "64.95", "2016-11-01", "2016-12-16", "yes"),
   (5, 1, 2, "200.00", "2016-12-30", "2017-01-02", "yes")
;

INSERT INTO auction (
   place_id, starting_price, current_price, sold_price, end_auction_time, active
) VALUES
   (1, "80.00", "278.00", "278.00", "2016-11-24", "no"),
   (5, "200.00", "243.00", NULL, "2016-12-06", "yes")
;

INSERT INTO Ratings (
 place_id, user_id, rating
) VALUE
   (1, 2, 5),
   (1, 3, 4),
   (1, 4, 3),
   (2, 1, 2),
   (2, 3, 1),
   (2, 4, 2),
   (3, 1, 3),
   (3, 2, 4),
   (3, 4, 5),
   (4, 1, 4),
   (4, 2, 3),
   (4, 3, 2),
   (5, 2, 1),
   (5, 3, 2),
   (5, 4, 3)
;

INSERT INTO PlaceAmenity (
   place_id, amenity_id
) VALUES
   (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10), (1, 11), (1, 12), (1, 13), (1, 14), (1, 15), (1, 16), (1, 17), (1, 18), (1, 19), (1, 20), (1, 21), (1, 22), (1, 23), (1, 24), (1, 25), (1, 26), (1, 27), (1, 28), (1, 29), (1, 30),
   (2, 20), (2, 21), (2, 22), (2, 23), (2, 24), (2, 25), (2, 27), (2, 28), (2, 29), (2, 30), (2, 31), (2, 32), (2, 33), (2, 34), (2, 35), (2, 36), (2, 37), (2, 38), (2, 39), (2, 40)
;

INSERT INTO UserLanguage (
  user_id, language_id
) VALUES
   (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10), (1, 11), (1, 12), (1, 13),
   (2, 8), (2, 9), (2, 10), (2, 11), (2, 12), (2, 13), (2, 14), (2, 15), (2, 16), (2, 17), (2, 18), (2, 19)
;

INSERT INTO Reservation (
   place_id, host_id, client_id, payment_type_id, booked_date_start, booked_date_end, amt_paid, paid_date
) VALUES
   (1, 1, 3, 3, "2016-12-02", "2016-12-05", "278.00", "2016-11-26"),
   (1, 1, 2, 2, "2016-12-06", "2016-12-08", "99.00", "2016-12-01"),
   (2, 2, 1, 1, "2016-12-05", "2016-12-07", "666.00", "2016-12-01"),
   (3, 3, 1, 3, "2016-12-07", "2016-12-09", "85.00", "2016-12-01")
;
