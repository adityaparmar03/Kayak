CREATE DATABASE  IF NOT EXISTS `kayak` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `kayak`;

--
-- Table structure for table `BILLING`
--

DROP TABLE IF EXISTS `BILLING`;

CREATE TABLE `BILLING` (
  `billing_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `booking_type` enum('CAR','FLIGHT','HOTEL') NOT NULL,
  `booking_date` varchar(45) DEFAULT NULL,
  `billing_date` datetime NOT NULL,
  `billing_amount` int(11) NOT NULL COMMENT 'Billing Amount in US Dollars',
  `source` varchar(45) DEFAULT NULL,
  `destination` varchar(45) DEFAULT NULL,
  `booking_start_date` datetime DEFAULT NULL,
  `booking_end_date` datetime DEFAULT NULL,
  `car_miles_used` int(11) DEFAULT NULL,
  `person_count` int(11) DEFAULT NULL COMMENT 'Not applicable for car bookings',
  PRIMARY KEY (`billing_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `BILLING`
--

LOCK TABLES `BILLING` WRITE;

UNLOCK TABLES;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;

CREATE TABLE `USER` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `user_role` enum('USER','ADMIN') DEFAULT NULL,
  `address` varchar(90) NOT NULL,
  `city` varchar(45) NOT NULL,
  `state` varchar(45) NOT NULL,
  `zip_code` int(11) NOT NULL,
  `phone` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `profile_image_path` varchar(90) DEFAULT NULL,
  `credit_card_holder_name` varchar(45) DEFAULT NULL,
  `credit_card_number` varchar(45) DEFAULT NULL,
  `credit_card_valid_from` date DEFAULT NULL,
  `credit_card_valid_till` date DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;

UNLOCK TABLES;

--
-- Table structure for table `USER_ACTIVITY`
--

DROP TABLE IF EXISTS `USER_ACTIVITY`;

CREATE TABLE `USER_ACTIVITY` (
  `activity_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `activity_type` enum('CLICK') NOT NULL DEFAULT 'CLICK',
  `activity_target_page` enum('FLIGHT_BOOK','CAR_BOOK','HOTEL_BOOK') NOT NULL,
  PRIMARY KEY (`activity_id`),
  KEY `user_id_idx` (`user_id`),
  KEY `user_id_act_idx` (`user_id`),
  CONSTRAINT `user_id_act` FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `USER_ACTIVITY`
--

LOCK TABLES `USER_ACTIVITY` WRITE;

UNLOCK TABLES;
