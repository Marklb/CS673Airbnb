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

CREATE UNIQUE INDEX `session_id_UNIQUE` ON `UserSession` (`session_auth_id` ASC);
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
  `date_range_start` VARCHAR(30) NOT NULL,
  `date_range_end` VARCHAR(30) NOT NULL,
  `booked_dates` VARCHAR(200),
  `response_time` VARCHAR(30),
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
  `payment_type_name` enum('Cash','Check','Credit Card','PayPal','Other') DEFAULT NULL,
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
   email,password,first_name,last_name,gender,birth_date
) VALUES
   ('JohnDoe@VIP.com', 'test', 'John', 'Doe', 'M','1998-04-09'),
   ('JamesBond@Agent.com', 'test', 'James', 'Bond', 'M','1992-08-16'),
   ('JaneSmith@Book.com', 'test', 'Jane', 'Smith', 'F','1988-03-25')
;

INSERT INTO address (
   street, city, state, zip, country
) VALUES (
   "86 Heaven Lane", "Houston", "Texas", "07294", "USA"
);

INSERT INTO address (
   street, city, state, zip, country
) VALUES (
   "666 Haunted Terrace", "Newark", "New Jersey", "07032", "USA"
);

INSERT INTO address (
   street, city, state, zip, country
) VALUES (
   "777 Lucky Place", "Harrison", "New Jersey", "07058", "USA"
);

INSERT INTO place (
   host_id, addr_id, roomtype_id, name, description, cost_per_night, max_people, bedroomsize, bathroomsize, numofbeds, pictures
) VALUES (
   1, 1, 1, "My First Cool Housetel", "Welcome to paradise.", 80.00, 2, 1, 1.5, 2, "/images/room1.jpg"
);

INSERT INTO place (
   host_id, addr_id, roomtype_id, name, description, cost_per_night, max_people, bedroomsize, bathroomsize, numofbeds, pictures
) VALUES (
   1, 2, 2, "My Second Housetel", "Welcome to hell.", 666.00, 5, 3, 3, 2, "/images/room2.jpg"
);

INSERT INTO place (
   host_id, addr_id, roomtype_id, name, description, cost_per_night, max_people, bedroomsize, bathroomsize, numofbeds, pictures
) VALUES (
   3, 3, 3, "My Third Housetel", "Welcome to earth.", 777.00, 5, 4, 4, 3, "/images/room3.jpg"
);

INSERT INTO hostplacelisting (
   place_id, host_id, bookingtype_id, ask_amount, date_range_start, date_range_end
) VALUES (
   1, 1, 1, "80.00", "2016-11-01", "2016-11-06"
);

INSERT INTO hostplacelisting (
   place_id, host_id, bookingtype_id, ask_amount, date_range_start, date_range_end
) VALUES (
   2, 1, 2, "666.00", "2016-11-02", "2016-11-07"
);

INSERT INTO hostplacelisting (
   place_id, host_id, bookingtype_id, ask_amount, date_range_start, date_range_end
) VALUES (
   3, 3, 3, "777.00", "2016-11-03", "2016-11-05"
);


INSERT INTO PlaceAmenity (
   place_id, amenity_id
) VALUES
   (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10), (1, 11), (1, 12), (1, 13), (1, 14), (1, 15), (1, 16), (1, 17), (1, 18), (1, 19), (1, 20), (1, 21), (1, 22), (1, 23), (1, 24), (1, 25), (1, 26), (1, 27), (1, 28), (1, 29), (1, 30),
   (2, 20), (2, 21), (2, 22), (2, 23), (2, 24), (2, 25), (2, 27), (2, 28), (2, 29), (2, 30), (2, 31), (2, 32), (2, 33), (2, 34), (2, 35), (2, 36), (2, 37), (2, 38), (2, 39), (2, 40), (3, 1), (3, 2), (3, 3)
;

INSERT INTO UserLanguage (
  user_id, language_id
) VALUES
   (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10), (1, 11), (1, 12), (1, 13),
   (2, 8), (2, 9), (2, 10), (2, 11), (2, 12), (2, 13), (2, 14), (2, 15), (2, 16), (2, 17), (2, 18), (2, 19), (3, 1), (3, 2)
;
