CREATE DATABASE  IF NOT EXISTS `kayak` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `kayak`;

--
-- Table structure for table `BILLING`
--

DROP TABLE IF EXISTS `USER`;

CREATE TABLE `USER` (
  `email` varchar(90) NOT NULL,
  `password` varchar(45) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `user_role` enum('USER','ADMIN') DEFAULT NULL,
  `street_address` varchar(90) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `zip_code` int(11) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `profile_image_path` varchar(90) DEFAULT NULL,
  `credit_card_type` varchar(45) DEFAULT NULL,
  `credit_card_number` int(11) DEFAULT NULL,
  `credit_card_holder_name` varchar(45) DEFAULT NULL,
  `credit_card_valid_from` date DEFAULT NULL,
  `credit_card_valid_till` date DEFAULT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `USER` WRITE;

UNLOCK TABLES;




DROP TABLE IF EXISTS `BILLING`;

CREATE TABLE `BILLING` (
  `billing_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(90) NOT NULL,
  `booking_type` enum('CAR','FLIGHT','HOTEL') NOT NULL,
  `booking_date` datetime DEFAULT NULL,
  `billing_date` datetime NOT NULL,
  `billing_amount` int(11) NOT NULL COMMENT 'Billing Amount in US Dollars',
  `source` varchar(45) DEFAULT NULL COMMENT 'source of flight/car and address of hotel',
  `destination` varchar(45) DEFAULT NULL COMMENT 'Destination of flight/car drop off , NA for hotel',
  `booking_start_date` datetime DEFAULT NULL,
  `booking_end_date` datetime DEFAULT NULL,
  `person_count` int(11) DEFAULT NULL COMMENT 'Not applicable for car bookings',
  `booking_class` enum('FIRST','ECONOMY','BUSINESS') DEFAULT NULL COMMENT 'Booking class of flight',
  `target_id` varchar(90) DEFAULT NULL COMMENT 'Id of flight/car/hotel from MongoDB',
  `credit_card_type` varchar(45) DEFAULT NULL,
  `credit_card_number` int(11) DEFAULT NULL,
  `credit_card_holder_name` varchar(45) DEFAULT NULL,
  `credit_card_valid_from` date DEFAULT NULL,
  `credit_card_valid_till` date DEFAULT NULL,
  PRIMARY KEY (`billing_id`,`user_email`),
  KEY `user_id_idx` (`user_email`),
  CONSTRAINT `user_email` FOREIGN KEY (`user_email`) REFERENCES `USER` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


LOCK TABLES `BILLING` WRITE;

UNLOCK TABLES;

--
-- Table structure for table `CART`
--

DROP TABLE IF EXISTS `CART`;

CREATE TABLE `CART` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(90) NOT NULL,
  `booking_type` enum('CAR','FLIGHT','HOTEL') DEFAULT NULL,
  `billing_amount` int(11) DEFAULT NULL,
  `source` varchar(45) DEFAULT NULL,
  `destination` varchar(45) DEFAULT NULL,
  `booking_start_date` datetime DEFAULT NULL,
  `booking_end_date` datetime DEFAULT NULL,
  `person_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`cart_id`,`user_email`),
  KEY `user_email_cart_idx` (`user_email`),
  CONSTRAINT `user_email_cart` FOREIGN KEY (`user_email`) REFERENCES `USER` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


LOCK TABLES `CART` WRITE;

UNLOCK TABLES;

--
-- Table structure for table `USER`
--



--
-- Table structure for table `USER_ACTIVITY`
--

DROP TABLE IF EXISTS `USER_ACTIVITY`;

CREATE TABLE `USER_ACTIVITY` (
  `activity_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(90) NOT NULL,
  `activity_type` enum('CLICK') NOT NULL DEFAULT 'CLICK',
  `activity_target_page` enum('FLIGHT_BOOK','CAR_BOOK','HOTEL_BOOK') NOT NULL,
  PRIMARY KEY (`activity_id`,`user_email`),
  KEY `user_id_act_idx` (`user_email`),
  CONSTRAINT `user_email_act` FOREIGN KEY (`user_email`) REFERENCES `USER` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


LOCK TABLES `USER_ACTIVITY` WRITE;

UNLOCK TABLES;
