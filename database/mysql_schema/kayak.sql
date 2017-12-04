CREATE DATABASE  IF NOT EXISTS `kayak` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `kayak`;

DROP TABLE IF EXISTS `BILLING`;
DROP TABLE IF EXISTS `CART`;
DROP TABLE IF EXISTS `USER_ACTIVITY`;
DROP TABLE IF EXISTS `vendors`;
DROP TABLE IF EXISTS `USER`;
DROP TABLE IF EXISTS `searchhistory`;
DROP TABLE IF EXISTS `click_tracker`;




CREATE TABLE `USER` (
  `email` varchar(90) NOT NULL,
  `password` varchar(45) NOT NULL,
  `first_name` varchar(45) DEFAULT '',
  `last_name` varchar(45) DEFAULT '',
  `user_role` enum('USER','ADMIN', 'VENDOR') DEFAULT 'USER',
  `street_address` varchar(90) DEFAULT '',
  `city` varchar(45) default '',
  `state` varchar(45)default '',
  `zip_code` varchar(45)default '',
  `phone` varchar(45)default '',
  `profile_image_path` varchar(300) default '' ,
  `credit_card_type` varchar(45) DEFAULT '',
  `credit_card_number` varchar(16) DEFAULT '',
  `credit_card_holder_name` varchar(45) DEFAULT '',
  `credit_card_valid_from` date DEFAULT null,
  `credit_card_valid_till` date DEFAULT null,
  PRIMARY KEY (`email`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;



UNLOCK TABLES;

CREATE TABLE `BILLING` (
  `billing_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(90) NOT NULL,
  `target_id` varchar(90) NOT NULL COMMENT 'Id of flight/car/hotel from MongoDB',
  `target_name` varchar(90) DEFAULT '',
  `return_target_id` varchar(90) DEFAULT '',
  `return_target_name` varchar(90) DEFAULT '',
  `booking_type` enum('CAR','FLIGHT','HOTEL') NOT NULL,
  `flight_trip_type` enum('ONE-WAY','TWO-WAY') DEFAULT NULL,
  `car_trip_type` enum('SAME-DROPOFF','DIFFERENT-DROPOFF') DEFAULT NULL,
  `room_type` enum('DELUX','PREMIUM','SUPER DELUX') DEFAULT NULL,
  `car_type` enum('Small','Medium','Large','SUV', 'Luxury', 'Van', 'Pickup Truck', 'Convertible') DEFAULT NULL,
  `billing_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `billing_amount` int(20) NOT NULL COMMENT 'Billing Amount in US Dollars',
  `source_city` varchar(45) DEFAULT '' COMMENT 'source of flight/car and address of hotel',
  `source_state` varchar(45) DEFAULT '',
  `source_street` varchar(45) DEFAULT NULL COMMENT 'Airport name for flight and address of hotel ',
  `source_country` varchar(45) DEFAULT '',
  `source_zipcode` varchar(45) DEFAULT '',
  `destination_city` varchar(45) DEFAULT '' COMMENT 'Destination of flight/car drop off , NA for hotel',
  `destination_state` varchar(45) DEFAULT '',
  `destination_street` varchar(45) DEFAULT '',
  `destination_country` varchar(45) DEFAULT '',
  `destination_zipcode` varchar(45) DEFAULT '',
  `source_airport` varchar(45) DEFAULT '',
  `destination_airport` varchar(45) DEFAULT '',
  `return_source_airport` varchar(45) DEFAULT '',
  `return_destination_airport` varchar(45) DEFAULT '',
  `booking_start_date` varchar(90) DEFAULT null,
  `booking_end_date` varchar(90) DEFAULT null,
  `return_booking_start_date` varchar(90) DEFAULT  null,
  `return_booking_end_date` varchar(90) DEFAULT null,
  `target_count` int(11) DEFAULT NULL COMMENT 'Count of Passengers for flights Or\nCount of hotel rooms Or\nCount of Cars booked\n',
  `booking_class` enum('FIRST','ECONOMY','BUSINESS') DEFAULT NULL COMMENT 'Booking class of flight',
  `credit_card_type` varchar(45) DEFAULT '',
  `credit_card_number` varchar(16) DEFAULT '',
  `credit_card_holder_name` varchar(45) DEFAULT '',
  `credit_card_valid_from` varchar(90) DEFAULT NULL,
  `credit_card_valid_till` varchar(90) DEFAULT NULL,
  PRIMARY KEY (`billing_id`,`user_email`,`target_id`),
  KEY `user_id_idx` (`user_email`),
  CONSTRAINT `user_email` FOREIGN KEY (`user_email`) REFERENCES `USER` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=248 DEFAULT CHARSET=latin1;




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
  `model` varchar(255) ,
  `email` varchar(255) ,
  PRIMARY KEY (`vendorId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;



  INSERT INTO `vendors` VALUES (1,'MMT','car','http://localhost:3001/car/getcars?vendor=MmtCars', 'MmtCars', 'mmt@gmail.com');
  INSERT INTO `vendors` VALUES (2, 'Cleartrip','car','http://localhost:3001/car/getcars?vendor=CleartripCars', 'CleartripCars', 'cct@gmail.com');
  INSERT INTO `vendors` VALUES (3,'Alamo','car','http://localhost:3001/car/getcars?vendor=AlamoCars', 'AlamoCars', 'ac@gmail.com');
  INSERT INTO `vendors` VALUES (4,'MMT','hotel','http://localhost:3001/hotel/gethotels?vendor=MmtHotels', 'MmtHotels', 'mmt@gmail.com');
  INSERT INTO `vendors` VALUES (5,'Cleartrip','hotel','http://localhost:3001/hotel/gethotels?vendor=CleartripHotels', 'CleartripHotels', 'cct@gmail.com' );
  INSERT INTO `vendors` VALUES (6,'TripAdvisor','hotel','http://localhost:3001/hotel/gethotels?vendor=TripAdvisorHotels', 'TripAdvisorHotels', 'triad@gmail.com');
  INSERT INTO `vendors` VALUES (7,'MMT','flight','http://localhost:3001/flight/getflights?vendor=MmtFlights', 'MmtFlights', 'mmt@gmail.com');
  INSERT INTO `vendors` VALUES (8,'Cleartrip','flight','http://localhost:3001/flight/getflights?vendor=CleartripFlights', 'CleartripFlights', 'cct@gmail.com');
  INSERT INTO `vendors` VALUES (9,'Expedia','flight','http://localhost:3001/flight/getflights?vendor=ExpediaFlights', 'ExpediaFlights', 'expedia@gmail.com');




create table searchhistory (
  `user_email` varchar(90) NOT NULL,
  `search_type` enum('CAR','FLIGHT','HOTEL') NOT NULL,
  `flight_trip_type` enum('ONE-WAY','TWO-WAY') ,
  `car_trip_type` enum('SAME-DROPOFF','DIFFERENT-DROPOFF'),
  `source_city` varchar(45) DEFAULT '' COMMENT 'source of flight/car and address of hotel',
  `source_state` varchar(45) DEFAULT '',
  `destination_city` varchar(45) DEFAULT '' COMMENT 'Destination of flight/car drop off , NA for hotel',
  `destination_state` varchar(45) DEFAULT '',
  `start_date` varchar(90) ,
  `end_date` varchar(90) ,
  `target_count` int(11) COMMENT 'Count of Passengers for flights Or\nCount of hotel rooms Or\nCount of Cars booked\n'
  );


CREATE TABLE `click_tracker` (
  `userId` varchar(255) DEFAULT NULL,
  `sessionId` varchar(255) DEFAULT NULL,
  `eventTime` datetime DEFAULT NULL,
  `eventName` varchar(255) DEFAULT NULL,
  `pageId` varchar(255) DEFAULT NULL,
  `buttonId` varchar(255) DEFAULT NULL,
  `objectId` varchar(255) DEFAULT NULL,
  `pageNav` varchar(4000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;





LOCK TABLES `vendors` WRITE;

UNLOCK TABLES;
