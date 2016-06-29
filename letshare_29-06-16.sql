CREATE DATABASE  IF NOT EXISTS `letshare` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `letshare`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: letshare
-- ------------------------------------------------------
-- Server version	5.1.50-community

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `level` varchar(45) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `img` varchar(45) DEFAULT NULL,
  `is_group` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (101,'RIDE','1',1,'','1'),(102,'TAXI','2',101,'taxi.png','0'),(103,'CAR','2',101,'car.png','0'),(104,'BIKE','2',101,'bike.png','0'),(105,'MISCELLANEOUS','1',1,'','1'),(106,'MACHINE','2',105,'machine.png','0'),(107,'OFFICE AREA','2',105,'office-area.png','0'),(108,'FOOD','2',105,'food.png','0'),(122,'Books','1',1,NULL,'1'),(123,'Stationary','2',122,NULL,'0'),(124,'Selected','2',105,NULL,'0');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_fields`
--

DROP TABLE IF EXISTS `category_fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category_fields` (
  `category_field_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `field` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`category_field_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_fields`
--

LOCK TABLES `category_fields` WRITE;
/*!40000 ALTER TABLE `category_fields` DISABLE KEYS */;
INSERT INTO `category_fields` VALUES (1,101,'toLocation'),(2,101,'brand'),(3,101,'uniqueId'),(4,101,'capacity'),(5,101,'availability'),(6,101,'amenities'),(7,101,'age'),(8,102,'toLocation'),(9,102,'brand'),(10,102,'uniqueId'),(11,102,'capacity'),(12,102,'availability'),(13,102,'amenities'),(14,102,'age'),(15,103,'toLocation'),(16,103,'brand'),(17,103,'uniqueId'),(18,103,'capacity'),(19,103,'availability'),(20,103,'amenities'),(21,103,'age'),(22,104,'uniqueId'),(23,104,'capacity'),(24,104,'availability'),(25,104,'amenities'),(26,104,'age'),(27,105,'brand'),(28,105,'uniqueId'),(29,105,'capacity'),(30,105,'amenities'),(31,105,'age');
/*!40000 ALTER TABLE `category_fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city` (
  `city_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (101,'Bengaluru'),(102,'Belgaum'),(103,'Mysore'),(104,'Hubli'),(105,'Pune'),(106,'Mumbai');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `activation` varchar(255) DEFAULT NULL,
  `address_id` int(11) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `email2` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `mobile` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_role`
--

DROP TABLE IF EXISTS `employee_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_Id` int(11) DEFAULT NULL,
  `roles_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_role`
--

LOCK TABLES `employee_role` WRITE;
/*!40000 ALTER TABLE `employee_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location` (
  `location_id` int(11) NOT NULL AUTO_INCREMENT,
  `city_id` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (201,101,'Vijaynagar'),(202,101,'Rajajinagar'),(203,101,'Yesvantpur'),(204,101,'Banashankari'),(205,101,'Jayanagar');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `permission_no` int(11) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `description` varchar(400) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `post_location_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `post_details_id` int(11) DEFAULT NULL,
  `verification_code` varchar(20) DEFAULT NULL,
  `active` bit(1) DEFAULT NULL,
  `posted_date` timestamp NULL DEFAULT NULL,
  `last_modified` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `postDetails_post_details_id` int(11) DEFAULT NULL,
  `postLocation_post_location_id` int(11) DEFAULT NULL,
  `post_type` varchar(255) DEFAULT NULL,
  `display_contact_details` bit(1) DEFAULT b'0',
  `process_date` datetime DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `FK_isntduqyalimxqw5uu7k5qh0n` (`postDetails_post_details_id`),
  CONSTRAINT `FK_isntduqyalimxqw5uu7k5qh0n` FOREIGN KEY (`postDetails_post_details_id`) REFERENCES `post_details` (`post_details_id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'post1','post desc',3,4,3,4,'dfg','\0',NULL,NULL,NULL,NULL,NULL,NULL,'\0',NULL),(2,'dfg','dfgg',0,0,0,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,NULL,'\0',NULL),(3,'dfg','dfgg',0,0,0,NULL,NULL,'',NULL,NULL,NULL,1,1,NULL,'\0',NULL),(4,'dfgg565','tyj678',345,0,0,NULL,NULL,'',NULL,NULL,NULL,2,2,NULL,'\0',NULL),(5,'dfgg565','tyj678',345,0,0,NULL,NULL,'','2016-01-26 18:30:00',NULL,'2016-01-27 00:00:00',3,3,NULL,'\0',NULL),(6,'dfgg565','tyj678',345,0,0,NULL,NULL,'','2016-01-26 20:59:42',NULL,'2016-01-27 02:29:42',4,4,NULL,'\0',NULL),(7,NULL,NULL,0,0,0,NULL,NULL,'','2016-01-27 16:38:08',NULL,'2016-01-27 22:08:08',6,6,NULL,'\0',NULL),(8,NULL,NULL,0,0,0,NULL,NULL,'','2016-01-27 16:38:08',NULL,'2016-01-27 22:08:08',5,5,NULL,'\0',NULL),(9,'fsfsdf','sdffff',3,0,0,NULL,NULL,'','2016-01-30 19:59:38',NULL,'2016-01-31 01:29:38',7,7,NULL,'\0',NULL),(10,'fsfsdf','sdffff',3,0,0,NULL,NULL,'','2016-01-30 20:01:43',NULL,'2016-01-31 01:31:43',8,8,NULL,'\0',NULL),(11,NULL,NULL,0,0,0,NULL,NULL,'','2016-02-13 20:12:22',NULL,'2016-02-14 01:42:22',9,9,NULL,'\0',NULL),(12,NULL,NULL,0,0,0,NULL,NULL,'','2016-03-08 20:35:52',NULL,'2016-03-09 02:05:52',10,10,NULL,'\0',NULL),(13,'sdf',NULL,0,0,0,NULL,NULL,'','2016-03-08 20:40:34',NULL,'2016-03-09 02:10:34',11,11,NULL,'\0',NULL),(14,'sdf','sdf',0,0,0,NULL,NULL,'','2016-03-08 20:40:36',NULL,'2016-03-09 02:10:36',12,12,NULL,'\0',NULL),(15,'sdfsf','sdf',1,0,1,NULL,NULL,'','2016-04-09 06:36:10',NULL,'2016-04-09 12:06:10',13,13,NULL,'\0',NULL),(16,'sdfsf','sdf',1,0,1,NULL,NULL,'','2016-04-09 06:41:22',NULL,'2016-04-09 12:11:22',14,14,NULL,'\0',NULL),(17,'sdfsf','sdf',1,0,1,NULL,NULL,'','2016-04-09 06:42:13',NULL,'2016-04-09 12:12:13',15,15,NULL,'\0',NULL),(18,'sdfsf','sdf',1,0,1,NULL,NULL,'','2016-04-09 06:43:46',NULL,'2016-04-09 12:13:46',16,16,NULL,'\0',NULL),(19,'dfdf','sdf',1,0,1,NULL,NULL,'','2016-04-23 20:35:11',NULL,'2016-04-24 02:05:11',17,17,NULL,'\0',NULL),(20,'car pooling from vijayanagar','hddgsdf',1,0,1,NULL,NULL,'','2016-04-27 18:14:37',NULL,'2016-04-27 23:44:37',18,18,NULL,'\0',NULL),(21,'car pooling from vijayanagar','hddgsdf',1,0,1,NULL,NULL,'','2016-04-27 18:15:13',NULL,'2016-04-27 23:45:13',19,19,NULL,'\0',NULL),(22,'car pooling from vijayanagar','hddgsdf',1,0,1,NULL,NULL,'','2016-04-27 18:38:03',NULL,'2016-04-28 00:08:03',20,20,NULL,'\0',NULL),(23,'car pooling from vijayanagar','hddgsdf',1,0,1,NULL,NULL,'','2016-04-27 18:38:16',NULL,'2016-04-28 00:08:16',21,21,NULL,'\0',NULL),(24,'taxi pooling','dfgdfgg',2,0,1,NULL,NULL,'','2016-04-27 18:46:01',NULL,'2016-04-28 00:16:01',22,22,NULL,'\0',NULL),(26,'jQuery Grid','klk',2,0,1,NULL,NULL,'','2016-04-27 19:11:32',NULL,'2016-04-28 00:41:32',24,24,NULL,'\0',NULL),(27,'bike pooling','KTM RC200 bike pooling',3,0,1,NULL,NULL,'','2016-04-28 19:12:59',NULL,'2016-04-29 00:42:59',25,25,NULL,'\0',NULL),(28,'sdf','asddas',1,0,0,NULL,NULL,'','2016-05-12 16:25:06',NULL,'2016-05-12 21:55:06',26,26,NULL,'\0',NULL),(29,'sdff','sdff',2,0,0,NULL,NULL,'','2016-05-12 19:37:52',NULL,'2016-05-13 01:07:52',27,27,NULL,'\0',NULL),(30,'tit',NULL,0,0,0,NULL,NULL,'','2016-05-14 10:36:18',NULL,'2016-05-14 16:06:18',28,28,NULL,'\0',NULL),(31,'tit',NULL,0,0,0,NULL,NULL,'','2016-05-14 10:55:44',NULL,'2016-05-14 16:25:44',29,29,NULL,'\0',NULL),(32,'UL Li Nav HTML5 CSS3','asdfffffffff',1,0,0,NULL,NULL,'','2016-05-14 13:01:04',NULL,'2016-05-14 18:31:04',30,30,NULL,'\0',NULL),(33,'ret','dfg',4,0,0,NULL,NULL,'','2016-05-14 14:56:48',NULL,'2016-05-14 20:26:48',31,31,NULL,'\0',NULL),(34,'Highcharts Demo','ftytryh',4,0,0,NULL,NULL,'','2016-05-14 15:03:48',NULL,'2016-05-14 20:33:48',32,32,NULL,'\0',NULL),(35,'jQuery Grid','sdgfgfg',4,0,0,NULL,NULL,'','2016-05-16 19:50:30',NULL,'2016-05-17 01:20:30',33,33,NULL,'\0',NULL),(36,'jQuery Grid','sdgfgfg',4,0,0,NULL,NULL,'','2016-05-16 19:57:10',NULL,'2016-05-17 01:27:10',34,34,NULL,'\0',NULL),(37,'jQuery Grid','sdgfgfg',4,0,0,NULL,NULL,'','2016-05-16 20:03:39',NULL,'2016-05-17 01:33:39',35,35,NULL,'\0',NULL),(38,'jusdf','asdsgsg',102,0,0,NULL,NULL,'','2016-05-21 12:04:14',NULL,'2016-05-21 17:34:14',36,36,'share','\0',NULL),(39,'tit',NULL,0,0,0,NULL,NULL,'','2016-05-21 12:09:45',NULL,'2016-05-21 17:39:45',37,37,'share','\0',NULL),(40,'tit','kjdsfklskjl',101,0,3100,NULL,NULL,'','2016-05-21 12:11:49',NULL,'2016-05-21 17:41:49',38,38,'requirement','\0',NULL),(41,'kra poo','sdgagasdff',102,0,3100,NULL,NULL,'','2016-05-30 21:40:31',NULL,'2016-05-31 03:10:31',39,39,'share','','2016-06-10 00:00:00'),(42,'jQuery Grid grttts','sdggggggggaag',103,0,3100,NULL,NULL,'\0','2016-05-30 21:44:30',NULL,'2016-05-31 03:14:30',40,40,'share','\0','2016-06-10 00:00:00'),(43,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'\0','2016-06-05 00:00:00');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_details`
--

DROP TABLE IF EXISTS `post_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_details` (
  `post_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `unique_id` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `measurement` varchar(45) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `availability` int(11) DEFAULT NULL,
  `amenities` varchar(400) DEFAULT NULL,
  `brand` varchar(45) DEFAULT NULL,
  `age` varchar(45) DEFAULT NULL,
  `uniqueId` varchar(255) DEFAULT NULL,
  `post_post_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`post_details_id`),
  KEY `FK_ndukdo72lsxdc1u1b306wcyuf` (`post_post_id`),
  CONSTRAINT `FK_ndukdo72lsxdc1u1b306wcyuf` FOREIGN KEY (`post_post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_details`
--

LOCK TABLES `post_details` WRITE;
/*!40000 ALTER TABLE `post_details` DISABLE KEYS */;
INSERT INTO `post_details` VALUES (1,NULL,NULL,NULL,0,0,NULL,NULL,NULL,'dfgdg',NULL),(2,NULL,NULL,NULL,0,0,NULL,NULL,NULL,'dfgdg',NULL),(3,NULL,NULL,NULL,0,0,NULL,NULL,NULL,'dfgdg',NULL),(4,NULL,NULL,NULL,0,0,NULL,NULL,NULL,'dfgdg',NULL),(5,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL),(6,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL),(7,NULL,NULL,NULL,0,0,NULL,NULL,NULL,'dfgdg',NULL),(8,NULL,NULL,NULL,0,0,NULL,NULL,NULL,'dfgdgffffff',NULL),(9,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL),(10,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL),(11,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL),(12,NULL,NULL,NULL,0,0,NULL,NULL,NULL,NULL,NULL),(13,'ghjgjh','','',27,6,'jhkjhk','hjhgj','86',NULL,NULL),(14,'ghjgjh','','',27,6,'jhkjhk','hjhgj','86',NULL,NULL),(15,'ghjgjh','','',27,6,'jhkjhk','hjhgj','86',NULL,NULL),(16,'ghjgjh','','',27,6,'jhkjhk','hjhgj','86',NULL,NULL),(17,NULL,'','',0,0,NULL,'fdsf',NULL,NULL,NULL),(18,'1690','','',5,3,'AC','swift','5',NULL,NULL),(19,'1690','','',5,3,'AC','swift','5',NULL,NULL),(20,'1690','','',5,3,'AC','swift','5',NULL,NULL),(21,'1690','','',5,3,'AC','swift','5',NULL,NULL),(22,'1690','','',5,3,'AC','indica','3',NULL,NULL),(23,'1690','','',45,34,'AC','indica','23',NULL,NULL),(24,'1690','','',45,34,'AC','indica','23',NULL,NULL),(25,'1690','','',2,1,NULL,'KTM','1',NULL,NULL),(26,'','','',2,2,'lklk;','asd','34',NULL,NULL),(27,'dsf','','',32,23,'sdff','sf','34',NULL,NULL),(28,NULL,'','',0,0,NULL,NULL,NULL,NULL,NULL),(29,NULL,'','',0,0,NULL,NULL,NULL,NULL,NULL),(30,'asdff','','',23,23,'ac','asdff','34',NULL,NULL),(31,'dfg','','',0,0,NULL,'dfg',NULL,NULL,NULL),(32,NULL,'','',0,0,NULL,NULL,NULL,NULL,NULL),(33,'adsf','','',4,3,'asdf','asdf','34',NULL,NULL),(34,'adsf','','',4,3,'asdf','asdf','34',NULL,NULL),(35,'adsf','','',4,3,'asdf','asdf','34',NULL,NULL),(36,'kldfg','','members',34,32,'fghfghs','sadfg','32',NULL,NULL),(37,NULL,'','members',0,0,NULL,NULL,NULL,NULL,NULL),(38,'kjjkkk','','members',23,23,'jkklsdf','lkl;k;lk','34',NULL,NULL),(39,'sf','','members',34,23,'sf','asf',NULL,NULL,NULL),(40,'agag','','members',34,22,'aagag','asggggggg','23',NULL,NULL);
/*!40000 ALTER TABLE `post_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_location`
--

DROP TABLE IF EXISTS `post_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_location` (
  `post_location_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `location1_id` int(11) DEFAULT NULL,
  `city1_id` int(11) DEFAULT NULL,
  `location2_id` int(11) DEFAULT NULL,
  `city2_id` int(11) DEFAULT NULL,
  `location3_id` int(11) DEFAULT NULL,
  `city3_id` int(11) DEFAULT NULL,
  `post_post_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`post_location_id`),
  KEY `FK_psnnivldlx5qjh1qrlw0ulao6` (`post_post_id`),
  CONSTRAINT `FK_psnnivldlx5qjh1qrlw0ulao6` FOREIGN KEY (`post_post_id`) REFERENCES `post` (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_location`
--

LOCK TABLES `post_location` WRITE;
/*!40000 ALTER TABLE `post_location` DISABLE KEYS */;
INSERT INTO `post_location` VALUES (0000000001,0,0,0,0,0,0,NULL),(0000000002,56,45,56,45,56,45,NULL),(0000000003,56,45,56,45,56,45,NULL),(0000000004,56,45,56,45,56,45,NULL),(0000000005,0,0,0,0,0,0,NULL),(0000000006,0,0,0,0,0,0,NULL),(0000000007,2,3,2,3,2,3,NULL),(0000000008,24,33,24,33,24,33,NULL),(0000000009,0,0,0,0,0,0,NULL),(0000000010,0,0,0,0,0,0,NULL),(0000000011,0,0,0,0,0,0,NULL),(0000000012,0,0,0,0,0,0,NULL),(0000000013,2,6,7,7,7,7,NULL),(0000000014,2,6,7,7,7,7,NULL),(0000000015,2,6,7,7,7,7,NULL),(0000000016,2,6,7,7,7,7,NULL),(0000000017,0,0,0,0,0,0,NULL),(0000000018,0,0,0,0,0,0,NULL),(0000000019,0,0,0,0,0,0,NULL),(0000000020,0,0,0,0,0,0,NULL),(0000000021,0,0,0,0,0,0,NULL),(0000000022,202,101,0,0,0,0,NULL),(0000000023,202,101,0,0,0,0,NULL),(0000000024,202,101,0,0,0,0,NULL),(0000000025,202,101,0,0,0,0,NULL),(0000000026,201,101,0,0,0,0,NULL),(0000000027,202,101,0,0,0,0,NULL),(0000000028,201,101,0,0,0,0,NULL),(0000000029,201,101,0,0,0,0,NULL),(0000000030,201,101,0,0,0,0,NULL),(0000000031,201,101,0,0,0,0,NULL),(0000000032,201,101,0,0,0,0,NULL),(0000000033,201,101,0,0,0,0,NULL),(0000000034,201,101,0,0,0,0,NULL),(0000000035,201,101,0,0,0,0,NULL),(0000000036,201,105,0,0,0,0,NULL),(0000000037,201,101,0,0,0,0,NULL),(0000000038,201,102,0,0,0,0,NULL),(0000000039,201,101,0,0,0,0,NULL),(0000000040,201,101,0,0,0,0,NULL);
/*!40000 ALTER TABLE `post_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  `roleno` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_permission` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permission`
--

LOCK TABLES `role_permission` WRITE;
/*!40000 ALTER TABLE `role_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `mobile` bigint(20) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `address_id` int(11) DEFAULT NULL,
  `activation_code` varchar(45) DEFAULT NULL,
  `email2` varchar(45) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `created_date` varchar(45) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `enabled` bit(1) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `authorization_token` varchar(255) DEFAULT NULL,
  `token_issued_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3116 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (3100,'Kranti','Chavannavar','kra@gmail.com',9916549962,'M',100,NULL,NULL,'zlyhY0tfvVg=',NULL,NULL,'1','',NULL,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrcmFAZ21haWwuY29tIiwiZXhwIjoxNDY3MjE3NDg3fQ.h1g0EublhqLuNCojaZSghzVkI4DWqv2QETlk6R6J7jTwOD8WeI8YZLv0w7r6gwUCSRk0BY7JKhmZuapQdHPKHQ','2016-06-29 21:49:47'),(3101,'ABC','EFG','abc@gmail.com',5555555555,'M',101,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(3102,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'\0',NULL,NULL,NULL),(3103,'Kranti','Chavannavar','kra1@gmail.com',9999999999,NULL,NULL,NULL,NULL,'bynas1hWbAk=',NULL,NULL,NULL,'\0',NULL,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrcmExQGdtYWlsLmNvbSIsImV4cCI6MTQ2MTE4NTEzNn0.rsjZdx0FpnpG8cfHuhQ5LQy7dvr6fUlixc35i6QcDXx8MUwAO5KHqKg-nON7ej2_Dd7nyFJ3yZrBCRSG4qRq8Q',NULL),(3105,'Kranti','Chavannavar','kra@gmail.coms',99999999399,NULL,NULL,NULL,NULL,'bynas1hWbAk=',NULL,NULL,NULL,'\0',NULL,NULL,NULL),(3106,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,'0ujZ2W3hrwg=',NULL,NULL,NULL,'\0',NULL,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIiLCJleHAiOjE0NjMyMjIzMjl9.gCQIxKkZ-RHQK05xOpuzqAorm5DkFBTByiX7Bw4vIg2Q5lAqur5fNSZJeSQnFUb5ahqVKCX1C2ZEt3WIvINLmQ','2016-05-14 16:03:49'),(3107,'arun','s','arun@gmail.com',987987998855,NULL,NULL,NULL,NULL,'nH29pEdsKfI=',NULL,NULL,NULL,'\0',NULL,NULL,NULL),(3108,'arun3','s','arun@gmaild.com',987987998852,NULL,NULL,NULL,NULL,'nH29pEdsKfI=',NULL,NULL,NULL,'\0',NULL,NULL,NULL),(3109,'arun3','s','agv@gmail.com',93987998852,NULL,NULL,NULL,NULL,'6JGR9527sP0=',NULL,NULL,NULL,'\0',NULL,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZ3ZAZ21haWwuY29tIiwiZXhwIjoxNDYzMzE1NDYzfQ.xQTjlpcuHTgFhw8xEZrxJJRj3NH53lt8n939baT5xOubG5063X4xaCqqIDZiaRZUVHNcmhS_UNoafteeTXIt4w','2016-05-15 17:56:03'),(3110,'aa','asd','kr',99888,NULL,NULL,NULL,NULL,'bynas1hWbAk=',NULL,NULL,NULL,'\0',NULL,NULL,NULL),(3111,'kallappa','chavannavar','jchavannavar@gmail.com',9482744928,NULL,NULL,NULL,NULL,'FlJD8OdoIMpArYvgBd8uNw==',NULL,NULL,NULL,'\0',NULL,NULL,'2016-05-18 03:04:46'),(3112,'sdff','asdd','kraas@gmail.com',1111111111,NULL,NULL,NULL,NULL,'boodjJsiN5Q=',NULL,NULL,NULL,'\0',NULL,NULL,NULL),(3113,'dfgsdf','sdffff','krsda@gmail.com',5558555555,NULL,NULL,NULL,NULL,'n5rkW9ltJN0=',NULL,NULL,NULL,'\0',NULL,NULL,NULL),(3114,'kallappa','chavannavar','ksdra@gmail.com',9898989899,NULL,NULL,NULL,NULL,'EowiQRHOTm0=',NULL,NULL,NULL,'\0',NULL,NULL,NULL),(3115,'sdff','sdff','krafs@gmail.com',9898989893,NULL,NULL,NULL,NULL,'n5rkW9ltJN0=',NULL,NULL,NULL,'\0',NULL,NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_address`
--

DROP TABLE IF EXISTS `user_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_address` (
  `user_address_id` int(10) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `line1` varchar(45) DEFAULT NULL,
  `line2` varchar(45) DEFAULT NULL,
  `area` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `pin` int(10) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_address`
--

LOCK TABLES `user_address` WRITE;
/*!40000 ALTER TABLE `user_address` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_login`
--

DROP TABLE IF EXISTS `user_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_login` (
  `user_login_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `start_date` timestamp NULL DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `user_active` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`user_login_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_login`
--

LOCK TABLES `user_login` WRITE;
/*!40000 ALTER TABLE `user_login` DISABLE KEYS */;
INSERT INTO `user_login` VALUES (1,3100,'kranti4all@gmail.com','kra123',NULL,NULL,'true'),(2,3101,'abc@gmail.com','abc',NULL,NULL,'true'),(3,3102,'admin','admin',NULL,NULL,NULL);
/*!40000 ALTER TABLE `user_login` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-06-29 21:57:28
