CREATE DATABASE  IF NOT EXISTS `kayak` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `kayak`;

DROP TABLE IF EXISTS `BILLING`;
DROP TABLE IF EXISTS `CART`;
DROP TABLE IF EXISTS `USER_ACTIVITY`;
DROP TABLE IF EXISTS `vendors`;
DROP TABLE IF EXISTS `USER`;


CREATE TABLE `USER` (
  `email` varchar(90) NOT NULL,
  `password` varchar(45) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `user_role` enum('USER','ADMIN') DEFAULT 'USER',
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


--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;

INSERT INTO `USER` VALUES ('meenakshi.paryani@gmail.com','password',NULL,NULL,'USER',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);

UNLOCK TABLES;

CREATE TABLE `BILLING` (
  `billing_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(90) NOT NULL,
  `target_id` varchar(90) NOT NULL COMMENT 'Id of flight/car/hotel from MongoDB',
  `target_name` varchar(90) DEFAULT NULL,
  `return_target_id` varchar(90) DEFAULT NULL,
  `return_target_name` varchar(90) DEFAULT NULL,
  `booking_type` enum('CAR','FLIGHT','HOTEL') NOT NULL,
  `flight_trip_type` enum('ONE-WAY','TWO-WAY') DEFAULT NULL,
  `car_trip_type` enum('SAME-DROPOFF','DIFFERENT-DROPOFF') NOT NULL,
  `room_type` enum('DELUX','PREMIUM','SUITE') DEFAULT NULL,
  `billing_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `billing_amount` int(11) NOT NULL COMMENT 'Billing Amount in US Dollars',
  `source_city` varchar(45) DEFAULT NULL COMMENT 'source of flight/car and address of hotel',
  `source_state` varchar(45) DEFAULT NULL,
  `destination_city` varchar(45) DEFAULT NULL COMMENT 'Destination of flight/car drop off , NA for hotel',
  `destination_state` varchar(45) DEFAULT NULL,
  `booking_start_date` datetime DEFAULT NULL,
  `booking_end_date` datetime DEFAULT NULL,
  `return_booking_start_date` datetime DEFAULT NULL,
  `return_booking_end_date` datetime DEFAULT NULL,
  `target_count` int(11) DEFAULT NULL COMMENT 'Count of Passengers for flights Or\nCount of hotel rooms Or\nCount of Cars booked\n',
  `booking_class` enum('FIRST','ECONOMY','BUSINESS') DEFAULT NULL COMMENT 'Booking class of flight',
  `credit_card_type` varchar(45) DEFAULT NULL,
  `credit_card_number` int(11) DEFAULT NULL,
  `credit_card_holder_name` varchar(45) DEFAULT NULL,
  `credit_card_valid_from` date DEFAULT NULL,
  `credit_card_valid_till` date DEFAULT NULL,
  PRIMARY KEY (`billing_id`,`user_email`,`target_id`),
  KEY `user_id_idx` (`user_email`),
  CONSTRAINT `user_email` FOREIGN KEY (`user_email`) REFERENCES `USER` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=188 DEFAULT CHARSET=latin1;


LOCK TABLES `BILLING` WRITE;

UNLOCK TABLES;

--
-- Table structure for table `CART`
--



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

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `vendorId` int(11) NOT NULL AUTO_INCREMENT,
  `vendorname` varchar(50) DEFAULT NULL,
  `servicetype` varchar(50) DEFAULT NULL,
  `vendorapi` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`vendorId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;


LOCK TABLES `vendors` WRITE;

INSERT INTO `vendors` VALUES (1,'MMT','car','http://localhost:3001/car/getcars?vendor=MmtCars'),(2,'Cleartrip','car','http://localhost:3001/car/getcars?vendor=CleartripCars'),(3,'Alamo','car','http://localhost:3001/car/getcars?vendor=AlamoCars'),(4,'MMT','hotel','http://localhost:3001/hotel/gethotels?vendor=MmtHotels'),(5,'Cleartrip','hotel','http://localhost:3001/hotel/gethotels?vendor=CleartripHotels'),(6,'TripAdvisor','hotel','http://localhost:3001/hotel/gethotels?vendor=TripAdvisorHotels'),(7,'MMT','flight','http://localhost:3001/flight/getflights?vendor=MmtFlights'),(8,'Cleartrip','flight','http://localhost:3001/flight/getflights?vendor=CleartripFlights'),(9,'Expedia','flight','http://localhost:3001/flight/getflights?vendor=ExpediaFlights');

UNLOCK TABLES;
