-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2022 at 02:06 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sdp`
--

-- --------------------------------------------------------

--
-- Table structure for table `closed_connection`
--

CREATE TABLE `closed_connection` (
  `gateway_sdpid` int(11) NOT NULL,
  `client_sdpid` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `start_timestamp` bigint(20) NOT NULL,
  `end_timestamp` bigint(20) NOT NULL,
  `protocol` tinytext COLLATE utf8_bin NOT NULL,
  `source_ip` tinytext COLLATE utf8_bin NOT NULL,
  `source_port` int(11) NOT NULL,
  `destination_ip` tinytext COLLATE utf8_bin NOT NULL,
  `destination_port` int(11) NOT NULL,
  `nat_destination_ip` tinytext COLLATE utf8_bin NOT NULL,
  `nat_destination_port` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `closed_connection`
--

INSERT INTO `closed_connection` (`gateway_sdpid`, `client_sdpid`, `service_id`, `start_timestamp`, `end_timestamp`, `protocol`, `source_ip`, `source_port`, `destination_ip`, `destination_port`, `nat_destination_ip`, `nat_destination_port`) VALUES
(55541, 55550, 7, 1663335621, 1663335621, 'tcp', '192.168.31.219', 43998, '192.168.31.241', 7000, '', 0),
(55541, 55550, 8, 1663377169, 1663377169, 'tcp', '192.168.31.219', 51152, '192.168.31.241', 8000, '10.42.0.1', 9000),
(55541, 55550, 9, 1663946329, 1663946329, 'tcp', '192.168.31.131', 41678, '192.168.31.111', 9000, '', 0),
(55541, 55550, 9, 1663946638, 1663946638, 'tcp', '192.168.31.131', 41682, '192.168.31.111', 9000, '', 0),
(55541, 55550, 8, 1663957121, 1663957121, 'tcp', '192.168.31.131', 56630, '192.168.31.111', 8000, '172.16.31.121', 8000),
(55541, 55550, 9, 1664000004, 1664000004, 'tcp', '192.168.31.131', 41740, '192.168.31.111', 9000, '', 0),
(55541, 55550, 8, 1664000678, 1664000678, 'tcp', '192.168.31.131', 56662, '192.168.31.111', 8000, '172.16.31.121', 8000),
(55541, 55550, 8, 1664000728, 1664000728, 'tcp', '192.168.31.131', 56662, '192.168.31.111', 8000, '172.16.31.121', 8000),
(55541, 55550, 8, 1664000746, 1664000746, 'tcp', '192.168.31.131', 56668, '192.168.31.111', 8000, '172.16.31.121', 8000),
(55541, 55550, 8, 1664001410, 1664001410, 'tcp', '192.168.31.131', 56672, '192.168.31.111', 8000, '172.16.31.121', 8000),
(55541, 55550, 8, 1664001431, 1664001431, 'tcp', '192.168.31.131', 56672, '192.168.31.111', 8000, '172.16.31.121', 8000),
(55541, 55550, 8, 1664001437, 1664001437, 'tcp', '192.168.31.131', 56678, '192.168.31.111', 8000, '172.16.31.121', 8000),
(55541, 55550, 8, 1664001705, 1664001705, 'tcp', '192.168.31.131', 56680, '192.168.31.111', 8000, '172.16.31.121', 8000),
(55541, 55551, 8, 1664003579, 1664003579, 'tcp', '192.168.31.132', 41144, '192.168.31.111', 8000, '172.16.31.121', 8000);

-- --------------------------------------------------------

--
-- Table structure for table `controller`
--

CREATE TABLE `controller` (
  `sdpid` int(11) NOT NULL,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL,
  `address` varchar(4096) COLLATE utf8_bin NOT NULL COMMENT 'ip or url',
  `port` int(11) NOT NULL,
  `gateway_sdpid` int(11) DEFAULT NULL,
  `service_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `environment`
--

CREATE TABLE `environment` (
  `id` int(11) NOT NULL,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL,
  `mobile` tinyint(1) NOT NULL,
  `os_group` enum('Android','iOS','Windows','OSX','Linux') COLLATE utf8_bin NOT NULL,
  `os_version` varchar(1024) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `gateway`
--

CREATE TABLE `gateway` (
  `sdpid` int(11) NOT NULL,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL,
  `address` varchar(1024) COLLATE utf8_bin NOT NULL COMMENT 'ip or url',
  `port` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `gateway_controller`
--

CREATE TABLE `gateway_controller` (
  `id` int(11) NOT NULL,
  `gateway_sdpid` int(11) NOT NULL,
  `controller_sdpid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `group`
--

CREATE TABLE `group` (
  `id` int(11) NOT NULL,
  `valid` tinyint(4) NOT NULL DEFAULT 1,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL,
  `Description` varchar(4096) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `group`
--

INSERT INTO `group` (`id`, `valid`, `name`, `Description`) VALUES
(1, 1, 'ADMIN', 'Administrators'),
(2, 1, 'VSR', 'Distributed and Self-organizing Systems'),
(3, 1, 'IWU', 'Institute for Machine Tools and Forming Technology'),
(4, 1, 'IPT', 'Institute for Production Technology'),
(5, 0, 'IVI', 'Institute for Transportation and Infrastructure Systems'),
(6, 0, 'IWS', 'Institute for Material and Beam Technology'),
(7, 0, 'ENAS', 'Institute for Electronic Nano Systems'),
(8, 0, 'IFF', 'Institute for Factory Operation and Automation');

--
-- Triggers `group`
--
DELIMITER $$
CREATE TRIGGER `group_after_delete` AFTER DELETE ON `group` FOR EACH ROW BEGIN
    INSERT INTO refresh_trigger
    SET table_name = 'group',
        event = 'delete';
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `group_mqtttopic`
--

CREATE TABLE `group_mqtttopic` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `access` enum('read','write','readwrite','deny') NOT NULL DEFAULT 'deny'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `group_mqtttopic`
--

INSERT INTO `group_mqtttopic` (`id`, `group_id`, `topic_id`, `access`) VALUES
(1, 3, 2, 'deny'),
(2, 4, 1, 'deny'),
(3, 2, 2, 'deny');

-- --------------------------------------------------------

--
-- Table structure for table `group_service`
--

CREATE TABLE `group_service` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `group_service`
--

INSERT INTO `group_service` (`id`, `group_id`, `service_id`) VALUES
(2, 3, 4),
(3, 3, 1),
(4, 5, 1),
(5, 7, 1),
(6, 5, 2),
(7, 7, 2),
(9, 3, 3),
(10, 7, 3),
(11, 5, 3),
(12, 7, 4),
(13, 5, 4),
(14, 7, 5),
(15, 5, 5),
(16, 3, 5),
(23, 2, 1);

--
-- Triggers `group_service`
--
DELIMITER $$
CREATE TRIGGER `group_service_after_delete` AFTER DELETE ON `group_service` FOR EACH ROW BEGIN
    INSERT INTO refresh_trigger
    SET table_name = 'group_service',
        event = 'delete';
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `group_service_after_insert` AFTER INSERT ON `group_service` FOR EACH ROW BEGIN
    INSERT INTO refresh_trigger
    SET table_name = 'group_service',
        event = 'insert';
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `group_service_after_update` AFTER UPDATE ON `group_service` FOR EACH ROW BEGIN
    INSERT INTO refresh_trigger
    SET table_name = 'group_service',
        event = 'update';
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `mqtttopic`
--

CREATE TABLE `mqtttopic` (
  `id` int(11) NOT NULL,
  `valid` tinyint(4) NOT NULL DEFAULT 1,
  `name` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mqtttopic`
--

INSERT INTO `mqtttopic` (`id`, `valid`, `name`, `description`) VALUES
(1, 1, 'thing1/temperature', 'temperature'),
(2, 1, 'thing1/humidity', 'humidity'),
(3, 1, 'thing2/pressure', 'pressure'),
(4, 1, 'thing3/voltage', 'voltage'),
(5, 0, 'thing4/current', 'current');

-- --------------------------------------------------------

--
-- Table structure for table `open_connection`
--

CREATE TABLE `open_connection` (
  `gateway_sdpid` int(11) NOT NULL,
  `client_sdpid` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `start_timestamp` bigint(20) NOT NULL,
  `end_timestamp` bigint(20) NOT NULL,
  `protocol` tinytext COLLATE utf8_bin NOT NULL,
  `source_ip` tinytext COLLATE utf8_bin NOT NULL,
  `source_port` int(11) NOT NULL,
  `destination_ip` tinytext COLLATE utf8_bin NOT NULL,
  `destination_port` int(11) NOT NULL,
  `nat_destination_ip` tinytext COLLATE utf8_bin NOT NULL,
  `nat_destination_port` int(11) NOT NULL,
  `gateway_controller_connection_id` int(11) NOT NULL COMMENT 'Only used to track open conns, not an index to a table'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `refresh_trigger`
--

CREATE TABLE `refresh_trigger` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `table_name` tinytext COLLATE utf8_bin NOT NULL,
  `event` tinytext COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `refresh_trigger`
--

INSERT INTO `refresh_trigger` (`id`, `timestamp`, `table_name`, `event`) VALUES
(51, '2022-09-11 17:42:39', 'sdpid_service', 'insert'),
(52, '2022-09-11 17:43:13', 'service_gateway', 'insert'),
(53, '2022-09-11 19:02:03', 'service_gateway', 'update'),
(54, '2022-09-11 19:12:59', 'service_gateway', 'insert'),
(55, '2022-09-11 19:15:59', 'user_group', 'insert'),
(56, '2022-09-11 19:16:17', 'group_service', 'insert'),
(57, '2022-09-15 08:29:35', 'service_gateway', 'delete'),
(58, '2022-09-15 08:29:35', 'service_gateway', 'delete'),
(59, '2022-09-15 08:29:35', 'service_gateway', 'delete'),
(60, '2022-09-15 08:29:35', 'service_gateway', 'delete'),
(61, '2022-09-15 08:30:55', 'service_gateway', 'insert'),
(62, '2022-09-15 08:30:55', 'service_gateway', 'insert'),
(63, '2022-09-15 08:30:55', 'service_gateway', 'insert'),
(64, '2022-09-15 08:30:55', 'service_gateway', 'insert'),
(65, '2022-09-15 17:41:41', 'service_gateway', 'update'),
(66, '2022-09-15 17:41:47', 'service_gateway', 'update'),
(67, '2022-09-15 21:44:21', 'service_gateway', 'update'),
(68, '2022-09-15 21:48:35', 'service_gateway', 'update'),
(69, '2022-09-15 22:05:43', 'service_gateway', 'update'),
(70, '2022-09-15 22:05:50', 'service_gateway', 'update'),
(71, '2022-09-15 22:38:59', 'service_gateway', 'update'),
(72, '2022-09-15 22:45:44', 'service_gateway', 'update'),
(73, '2022-09-16 13:24:23', 'service_gateway', 'update'),
(74, '2022-09-16 13:24:27', 'service_gateway', 'update'),
(75, '2022-09-16 14:25:06', 'service_gateway', 'update'),
(76, '2022-09-16 14:25:09', 'service_gateway', 'update'),
(77, '2022-09-16 14:27:29', 'service_gateway', 'update'),
(78, '2022-09-16 14:29:18', 'service_gateway', 'update'),
(79, '2022-09-16 14:29:33', 'service_gateway', 'update'),
(80, '2022-09-23 14:00:29', 'sdpid_service', 'insert'),
(81, '2022-09-23 14:10:43', 'service_gateway', 'update'),
(82, '2022-09-23 14:10:55', 'service_gateway', 'update'),
(83, '2022-09-23 14:11:38', 'service_gateway', 'update'),
(84, '2022-09-24 07:08:01', 'sdpid_service', 'insert'),
(85, '2022-09-26 07:04:13', 'service', 'delete'),
(86, '2022-09-26 20:28:56', 'service', 'delete'),
(87, '2022-09-26 23:22:06', 'service', 'delete'),
(88, '2022-09-26 23:27:37', 'service', 'delete'),
(89, '2022-09-26 23:32:47', 'service', 'delete'),
(90, '2022-09-27 18:59:44', 'service', 'delete'),
(91, '2022-09-27 19:05:40', 'service', 'delete'),
(92, '2022-09-27 19:06:02', 'service', 'delete'),
(93, '2022-09-27 19:06:32', 'service', 'delete'),
(94, '2022-09-28 07:42:01', 'service', 'delete'),
(95, '2022-09-28 07:42:07', 'service', 'delete'),
(96, '2022-09-28 07:42:10', 'service', 'delete'),
(97, '2022-09-28 07:42:14', 'service', 'delete'),
(98, '2022-09-28 07:45:48', 'service', 'delete'),
(99, '2022-09-28 07:59:49', 'service', 'delete'),
(100, '2022-09-28 08:33:28', 'user', 'delete'),
(101, '2022-09-28 09:39:32', 'sdpid', 'delete'),
(102, '2022-09-28 09:42:57', 'sdpid', 'delete'),
(103, '2022-09-30 15:00:13', 'service', 'delete'),
(104, '2022-09-30 15:00:13', 'service', 'delete'),
(105, '2022-09-30 15:00:13', 'service', 'delete'),
(106, '2022-09-30 16:11:30', 'service_gateway', 'update'),
(107, '2022-09-30 16:11:37', 'service_gateway', 'update'),
(108, '2022-09-30 16:11:43', 'service_gateway', 'update'),
(109, '2022-10-01 16:53:43', 'service_gateway', 'insert'),
(110, '2022-10-02 05:51:49', 'service_gateway', 'insert'),
(111, '2022-10-02 05:53:01', 'service_gateway', 'insert'),
(112, '2022-10-02 05:54:03', 'service_gateway', 'insert'),
(113, '2022-10-02 05:54:45', 'service_gateway', 'insert'),
(114, '2022-10-02 05:58:16', 'service_gateway', 'insert'),
(115, '2022-10-02 06:16:00', 'service_gateway', 'insert'),
(116, '2022-10-02 06:44:44', 'service_gateway', 'insert'),
(117, '2022-10-02 06:50:46', 'service_gateway', 'update'),
(118, '2022-10-02 06:50:54', 'service_gateway', 'update'),
(119, '2022-10-02 06:51:06', 'service_gateway', 'update'),
(120, '2022-10-02 07:10:56', 'service_gateway', 'insert'),
(121, '2022-10-02 07:11:28', 'service_gateway', 'insert'),
(122, '2022-10-02 07:12:58', 'service_gateway', 'insert'),
(123, '2022-10-02 07:16:17', 'service_gateway', 'insert'),
(124, '2022-10-02 07:36:46', 'service_gateway', 'insert'),
(125, '2022-10-02 07:37:38', 'service_gateway', 'insert'),
(126, '2022-10-02 07:38:12', 'service_gateway', 'delete'),
(127, '2022-10-02 07:40:56', 'service_gateway', 'delete'),
(128, '2022-10-02 07:42:07', 'service_gateway', 'delete'),
(129, '2022-10-02 07:42:25', 'service_gateway', 'delete'),
(130, '2022-10-02 07:42:29', 'service_gateway', 'delete'),
(131, '2022-10-02 07:42:32', 'service_gateway', 'delete'),
(132, '2022-10-02 07:56:52', 'service_gateway', 'insert'),
(133, '2022-10-02 07:57:06', 'service_gateway', 'update'),
(134, '2022-10-02 07:57:52', 'service_gateway', 'update'),
(135, '2022-10-02 09:48:49', 'service_gateway', 'update'),
(136, '2022-10-02 11:04:51', 'service_gateway', 'insert'),
(137, '2022-10-02 11:05:04', 'service_gateway', 'insert'),
(138, '2022-10-02 11:05:46', 'service_gateway', 'insert'),
(139, '2022-10-02 11:06:01', 'service_gateway', 'update'),
(140, '2022-10-02 11:09:14', 'service_gateway', 'insert'),
(141, '2022-10-02 12:58:14', 'sdpid_service', 'insert'),
(142, '2022-10-02 17:15:44', 'sdpid', 'update'),
(143, '2022-10-02 17:15:47', 'sdpid', 'update'),
(144, '2022-10-02 17:15:49', 'sdpid', 'update'),
(145, '2022-10-02 17:15:56', 'sdpid', 'update'),
(146, '2022-10-02 17:15:59', 'sdpid', 'update'),
(147, '2022-10-02 17:16:02', 'sdpid', 'update'),
(148, '2022-10-02 17:16:04', 'sdpid', 'update'),
(149, '2022-10-02 17:46:04', 'sdpid_service', 'insert'),
(150, '2022-10-02 17:46:24', 'sdpid_service', 'insert'),
(151, '2022-10-02 17:46:24', 'sdpid_service', 'insert'),
(152, '2022-10-02 18:42:15', 'sdpid_service', 'insert'),
(153, '2022-10-02 18:42:15', 'sdpid_service', 'insert'),
(154, '2022-10-02 18:42:15', 'sdpid_service', 'insert'),
(155, '2022-10-02 18:43:59', 'sdpid_service', 'insert'),
(156, '2022-10-02 18:43:59', 'sdpid_service', 'insert'),
(157, '2022-10-02 19:00:39', 'sdpid', 'update'),
(158, '2022-10-02 19:01:14', 'sdpid_service', 'update'),
(159, '2022-10-02 19:04:37', 'sdpid_service', 'delete'),
(160, '2022-10-02 19:04:37', 'sdpid_service', 'delete'),
(161, '2022-10-02 19:04:37', 'sdpid_service', 'delete'),
(162, '2022-10-02 19:04:37', 'sdpid_service', 'delete'),
(163, '2022-10-02 19:04:37', 'sdpid_service', 'delete'),
(164, '2022-10-02 19:04:37', 'sdpid_service', 'delete'),
(165, '2022-10-02 19:04:37', 'sdpid_service', 'delete'),
(166, '2022-10-02 19:04:37', 'sdpid_service', 'delete'),
(167, '2022-10-02 19:04:37', 'sdpid_service', 'delete'),
(168, '2022-10-02 19:04:37', 'sdpid_service', 'delete'),
(169, '2022-10-02 19:04:37', 'sdpid_service', 'delete'),
(170, '2022-10-02 19:04:37', 'sdpid_service', 'delete'),
(171, '2022-10-02 19:04:37', 'sdpid_service', 'delete'),
(172, '2022-10-02 19:04:37', 'sdpid_service', 'delete'),
(173, '2022-10-02 19:13:24', 'sdpid_service', 'insert'),
(174, '2022-10-02 19:30:27', 'sdpid_service', 'insert'),
(175, '2022-10-02 19:30:39', 'sdpid_service', 'insert'),
(176, '2022-10-02 19:40:48', 'sdpid_service', 'insert'),
(177, '2022-10-02 19:40:48', 'sdpid_service', 'insert'),
(178, '2022-10-02 19:41:45', 'sdpid_service', 'insert'),
(179, '2022-10-02 19:41:55', 'sdpid_service', 'insert'),
(180, '2022-10-02 19:41:55', 'sdpid_service', 'insert'),
(181, '2022-10-02 19:41:55', 'sdpid_service', 'insert'),
(182, '2022-10-02 19:42:58', 'sdpid_service', 'insert'),
(183, '2022-10-02 19:42:58', 'sdpid_service', 'insert'),
(184, '2022-10-02 20:23:44', 'sdpid_service', 'insert'),
(185, '2022-10-02 20:23:44', 'sdpid_service', 'insert'),
(186, '2022-10-02 20:23:59', 'sdpid_service', 'insert'),
(187, '2022-10-02 21:05:32', 'sdpid_service', 'insert'),
(188, '2022-10-02 21:07:28', 'sdpid_service', 'insert'),
(189, '2022-10-02 21:09:58', 'sdpid_service', 'insert'),
(190, '2022-10-02 21:24:00', 'sdpid_service', 'insert'),
(191, '2022-10-02 21:28:17', 'sdpid_service', 'insert'),
(192, '2022-10-02 21:28:53', 'sdpid_service', 'insert'),
(193, '2022-10-02 21:29:11', 'sdpid_service', 'insert'),
(194, '2022-10-02 21:46:18', 'sdpid_service', 'insert'),
(195, '2022-10-02 21:46:56', 'sdpid_service', 'insert'),
(196, '2022-10-02 21:46:56', 'sdpid_service', 'insert'),
(197, '2022-10-02 21:47:21', 'sdpid_service', 'insert'),
(198, '2022-10-02 21:47:36', 'sdpid_service', 'insert'),
(199, '2022-10-02 21:47:50', 'sdpid_service', 'insert'),
(200, '2022-10-02 21:48:11', 'sdpid_service', 'insert'),
(201, '2022-10-02 21:48:11', 'sdpid_service', 'insert'),
(202, '2022-10-02 21:49:37', 'sdpid_service', 'insert'),
(203, '2022-10-02 21:49:37', 'sdpid_service', 'insert'),
(204, '2022-10-02 21:50:49', 'sdpid_service', 'insert'),
(205, '2022-10-02 21:50:54', 'sdpid_service', 'insert'),
(206, '2022-10-02 21:51:25', 'sdpid_service', 'insert'),
(207, '2022-10-02 21:53:24', 'sdpid_service', 'insert'),
(208, '2022-10-02 21:55:03', 'sdpid_service', 'insert'),
(209, '2022-10-02 21:55:14', 'sdpid_service', 'insert'),
(210, '2022-10-02 21:55:20', 'sdpid_service', 'insert'),
(211, '2022-10-02 21:55:26', 'sdpid_service', 'insert'),
(212, '2022-10-02 21:57:09', 'sdpid_service', 'insert'),
(213, '2022-10-02 21:57:47', 'sdpid_service', 'insert'),
(214, '2022-10-02 21:58:24', 'sdpid_service', 'insert'),
(215, '2022-10-02 21:59:01', 'sdpid_service', 'insert'),
(216, '2022-10-02 21:59:01', 'sdpid_service', 'insert'),
(217, '2022-10-02 21:59:06', 'sdpid_service', 'insert'),
(218, '2022-10-02 22:36:25', 'sdpid_service', 'delete'),
(219, '2022-10-02 22:36:41', 'sdpid_service', 'delete'),
(220, '2022-10-02 22:37:36', 'sdpid_service', 'delete'),
(221, '2022-10-02 22:37:40', 'sdpid_service', 'delete'),
(222, '2022-10-02 22:39:37', 'sdpid_service', 'delete'),
(223, '2022-10-02 22:40:06', 'sdpid_service', 'delete'),
(224, '2022-10-02 23:39:49', 'sdpid_service', 'insert'),
(225, '2022-10-02 23:42:27', 'sdpid_service', 'insert'),
(226, '2022-10-02 23:43:15', 'sdpid_service', 'delete'),
(227, '2022-10-02 23:43:35', 'sdpid_service', 'insert'),
(228, '2022-10-02 23:44:16', 'sdpid_service', 'delete'),
(229, '2022-10-02 23:44:55', 'sdpid_service', 'delete'),
(230, '2022-10-02 23:45:36', 'sdpid_service', 'delete'),
(231, '2022-10-02 23:45:49', 'sdpid_service', 'insert'),
(232, '2022-10-02 23:46:14', 'sdpid_service', 'insert'),
(233, '2022-10-02 23:46:32', 'sdpid_service', 'delete'),
(234, '2022-10-02 23:47:23', 'sdpid_service', 'insert'),
(235, '2022-10-02 23:47:56', 'sdpid_service', 'delete'),
(236, '2022-10-02 23:48:28', 'sdpid_service', 'delete'),
(237, '2022-10-02 23:49:53', 'sdpid_service', 'delete'),
(238, '2022-10-02 23:52:53', 'sdpid_service', 'insert'),
(239, '2022-10-02 23:53:17', 'sdpid_service', 'insert'),
(240, '2022-10-02 23:53:23', 'sdpid_service', 'delete'),
(241, '2022-10-02 23:56:59', 'sdpid_service', 'delete'),
(242, '2022-10-02 23:57:11', 'sdpid_service', 'insert'),
(243, '2022-10-02 23:59:04', 'sdpid_service', 'delete'),
(244, '2022-10-02 23:59:12', 'sdpid_service', 'delete'),
(245, '2022-10-02 23:59:24', 'sdpid_service', 'delete'),
(246, '2022-10-02 23:59:33', 'sdpid_service', 'insert'),
(247, '2022-10-02 23:59:48', 'sdpid_service', 'insert'),
(248, '2022-10-02 23:59:57', 'sdpid_service', 'delete'),
(249, '2022-10-03 00:00:03', 'sdpid_service', 'delete'),
(250, '2022-10-03 09:43:25', 'sdpid_service', 'insert'),
(251, '2022-10-03 09:43:30', 'sdpid_service', 'delete'),
(252, '2022-10-03 09:44:16', 'sdpid_service', 'insert'),
(253, '2022-10-03 09:47:08', 'sdpid_service', 'insert'),
(254, '2022-10-03 09:47:16', 'sdpid_service', 'delete'),
(255, '2022-10-03 09:51:21', 'sdpid_service', 'delete'),
(256, '2022-10-03 09:51:53', 'sdpid_service', 'insert'),
(257, '2022-10-03 09:52:01', 'sdpid_service', 'delete'),
(258, '2022-10-03 09:57:19', 'sdpid_service', 'delete'),
(259, '2022-10-03 09:57:22', 'sdpid_service', 'delete'),
(260, '2022-10-03 09:57:26', 'sdpid_service', 'insert'),
(261, '2022-10-03 09:57:26', 'sdpid_service', 'insert'),
(262, '2022-10-03 10:02:07', 'sdpid_service', 'delete'),
(263, '2022-10-03 11:11:24', 'group_service', 'insert'),
(264, '2022-10-03 11:11:29', 'group_service', 'insert'),
(265, '2022-10-03 11:12:36', 'group_service', 'insert'),
(266, '2022-10-03 11:15:28', 'group_service', 'insert'),
(267, '2022-10-03 11:15:28', 'group_service', 'insert'),
(268, '2022-10-03 11:16:15', 'group_service', 'insert'),
(269, '2022-10-03 11:16:54', 'group_service', 'insert'),
(270, '2022-10-03 11:17:03', 'group_service', 'insert'),
(271, '2022-10-03 11:17:11', 'group_service', 'insert'),
(272, '2022-10-03 11:18:05', 'group_service', 'insert'),
(273, '2022-10-03 11:18:39', 'group_service', 'insert'),
(274, '2022-10-03 11:18:48', 'group_service', 'insert'),
(275, '2022-10-03 11:19:06', 'group_service', 'insert'),
(276, '2022-10-03 11:19:15', 'group_service', 'insert'),
(277, '2022-10-03 11:22:19', 'group_service', 'insert'),
(278, '2022-10-03 11:23:23', 'group_service', 'insert'),
(279, '2022-10-03 11:23:43', 'group_service', 'insert'),
(280, '2022-10-03 11:24:00', 'group_service', 'insert'),
(281, '2022-10-03 11:24:14', 'group_service', 'insert'),
(282, '2022-10-03 11:24:31', 'group_service', 'insert'),
(283, '2022-10-03 11:29:26', 'group_service', 'delete'),
(284, '2022-10-03 11:29:31', 'sdpid_service', 'delete'),
(285, '2022-10-03 11:55:30', 'sdpid_service', 'insert'),
(286, '2022-10-03 11:55:41', 'sdpid_service', 'delete'),
(287, '2022-10-03 11:58:31', 'group_service', 'insert'),
(288, '2022-10-03 12:05:47', 'sdpid_service', 'insert'),
(289, '2022-10-03 12:06:01', 'sdpid_service', 'delete'),
(290, '2022-10-03 22:26:19', 'group', 'delete'),
(291, '2022-10-04 09:55:05', 'user', 'delete'),
(292, '2022-10-04 10:40:23', 'service_gateway', 'delete'),
(293, '2022-10-04 10:40:26', 'service_gateway', 'delete'),
(294, '2022-10-04 10:40:31', 'service_gateway', 'delete'),
(295, '2022-10-04 10:40:35', 'service_gateway', 'delete'),
(296, '2022-10-04 10:40:38', 'service_gateway', 'delete'),
(297, '2022-10-04 10:44:47', 'service_gateway', 'update'),
(298, '2022-10-04 10:44:59', 'service_gateway', 'update'),
(299, '2022-10-04 10:46:28', 'service', 'delete'),
(300, '2022-10-04 10:46:30', 'service', 'delete'),
(301, '2022-10-04 10:46:35', 'service', 'delete'),
(302, '2022-10-04 10:46:38', 'service', 'delete'),
(303, '2022-10-04 10:46:41', 'service', 'delete'),
(304, '2022-10-04 10:46:43', 'service', 'delete'),
(305, '2022-10-04 10:46:46', 'service', 'delete'),
(306, '2022-10-06 14:08:02', 'user', 'delete'),
(307, '2022-10-06 14:08:09', 'user', 'delete'),
(308, '2022-10-06 14:08:14', 'user', 'delete'),
(309, '2022-10-06 14:08:24', 'user', 'delete'),
(310, '2022-10-06 14:08:54', 'user', 'delete'),
(311, '2022-10-06 14:08:54', 'user', 'delete'),
(312, '2022-10-06 14:08:54', 'user', 'delete'),
(313, '2022-10-06 14:08:54', 'user', 'delete'),
(314, '2022-10-06 14:08:54', 'user', 'delete'),
(315, '2022-10-06 14:13:08', 'user_group', 'update'),
(316, '2022-10-06 14:14:25', 'user_group', 'insert'),
(317, '2022-10-06 14:14:43', 'user_group', 'insert'),
(318, '2022-10-06 14:14:50', 'user_group', 'update'),
(319, '2022-10-06 14:23:48', 'sdpid', 'update'),
(320, '2022-10-06 14:24:02', 'sdpid', 'update'),
(321, '2022-10-06 14:24:13', 'sdpid', 'update'),
(322, '2022-10-06 14:25:40', 'sdpid', 'update'),
(323, '2022-10-06 14:26:18', 'sdpid', 'update'),
(324, '2022-10-06 14:26:21', 'sdpid', 'update'),
(325, '2022-10-06 14:26:40', 'sdpid', 'update'),
(326, '2022-10-06 14:26:42', 'sdpid', 'update'),
(327, '2022-10-06 14:27:35', 'sdpid', 'update'),
(328, '2022-10-07 05:51:52', 'user_group', 'update'),
(329, '2022-10-07 12:06:03', 'service', 'delete');

-- --------------------------------------------------------

--
-- Table structure for table `sdpid`
--

CREATE TABLE `sdpid` (
  `sdpid` int(11) NOT NULL,
  `valid` tinyint(1) NOT NULL DEFAULT 1,
  `type` enum('client','gateway','controller') COLLATE utf8_bin NOT NULL DEFAULT 'client',
  `country` varchar(128) COLLATE utf8_bin NOT NULL,
  `state` varchar(128) COLLATE utf8_bin NOT NULL,
  `locality` varchar(128) COLLATE utf8_bin NOT NULL,
  `org` varchar(128) COLLATE utf8_bin NOT NULL,
  `org_unit` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `alt_name` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `encrypt_key` varchar(2048) COLLATE utf8_bin DEFAULT NULL,
  `hmac_key` varchar(2048) COLLATE utf8_bin DEFAULT NULL,
  `serial` varchar(40) COLLATE utf8_bin NOT NULL,
  `last_cred_update` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `cred_update_due` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int(11) DEFAULT NULL,
  `environment_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `sdpid`
--

INSERT INTO `sdpid` (`sdpid`, `valid`, `type`, `country`, `state`, `locality`, `org`, `org_unit`, `alt_name`, `email`, `encrypt_key`, `hmac_key`, `serial`, `last_cred_update`, `cred_update_due`, `user_id`, `environment_id`) VALUES
(55540, 1, 'controller', 'DE', 'Saxony', 'Dresden', 'TU Dresden', 'Informatik', NULL, NULL, 'SiB+Qu6/1/Nhg/NF1iFGwQa4wzlsXzlT+mlJPF1fIo0lwom9bZbC9xJpG8IRB9UPHGZVwztyQSW1QoJs3rrnhwVuKd5Q17qgBNmEtzYvaO5DkirmbkMtD7DVTDxUWp4ORVLO+hH4TKi+SZPagGN/lJhsoWd0jpB/4EnTwQKBgQDHH5s5S5PeDq5phpxZ2263QvbuSfAZ1DBBpk7VqKMSUixoyS73+82loAlga1gIl/mh5mYXl2pLISlrG2FaKwHrYa9aO/TTedN7FE6hZwUhAUBCO2XeFC8oiHOduCpqNQcTxSzaYuoS7XjlU4CVKqJtaUNpubNgyVyZaVs6b5dRcQ==', 'l/LQ7zNS17UscrByyQc8JxVMSbn7yZLmm+ukyR6ulnN7D2hRayMNueqtCOs5MSD7ZXG9F7E4gAt1iEFulwJBAIkGd4QfO5ommj/mrsaSmbKp9uYKWY9S4L5ssd4OD5TQ/rutuObbQWVzL0tv2XKmmEY+bzZelJzaXmMTFLJ2Nwc=', '', '2022-10-07 07:36:28', '2022-11-06 23:00:00', 1, NULL),
(55541, 0, 'controller', 'DE', 'Saxony', 'Chemnitz', 'TU Chemnitz', 'Informatik', NULL, NULL, NULL, NULL, '', '2022-09-28 10:18:03', '2022-10-28 22:00:00', 1, NULL),
(55550, 1, 'gateway', 'DE', 'Saxony', 'Chemnitz', 'TU Chemnitz', 'Informatik', NULL, NULL, NULL, NULL, '', '2022-09-24 12:50:47', '2022-10-24 22:00:00', 1, NULL),
(55551, 1, 'gateway', 'DE', 'Saxony', 'Chemnitz', 'Fraunhofer', 'IWU', NULL, NULL, NULL, NULL, '', '2022-09-24 07:02:51', '2022-10-24 22:00:00', 1, NULL),
(55552, 0, 'gateway', 'BD', 'Dhaka', 'Dhaka', 'Dhaka City College', NULL, NULL, NULL, NULL, NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, NULL),
(55560, 1, 'client', 'BD', 'Dhaka', 'Dhaka', 'Dhaka City College', NULL, NULL, NULL, NULL, NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, NULL),
(55561, 1, 'client', 'BD', 'Dhaka', 'Dhaka', 'Dhaka City College', NULL, NULL, NULL, NULL, NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, NULL),
(55562, 1, 'client', 'US', 'California', 'Dont Know', 'California University', NULL, NULL, NULL, NULL, NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, NULL),
(55563, 1, 'client', 'UK', 'ABCD', 'XYZ', 'PQR', NULL, NULL, NULL, NULL, NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, NULL),
(55564, 1, 'client', 'BD', 'Dhaka', 'Dhaka', 'AIUB', NULL, NULL, NULL, NULL, NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, NULL),
(55565, 0, 'client', 'BD', 'Dhaka', 'Narsingdi', 'Narsingdi College', NULL, NULL, NULL, NULL, NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, NULL),
(55566, 0, 'client', 'BD', 'Dhaka', 'Dhaka', 'Dhaka City College', NULL, NULL, NULL, NULL, NULL, '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, NULL);

--
-- Triggers `sdpid`
--
DELIMITER $$
CREATE TRIGGER `sdpid_after_delete` AFTER DELETE ON `sdpid` FOR EACH ROW BEGIN
    INSERT INTO refresh_trigger
    SET table_name = 'sdpid',
        event = 'delete';
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `sdpid_after_update` AFTER UPDATE ON `sdpid` FOR EACH ROW BEGIN
IF OLD.user_id != NEW.user_id OR
   OLD.valid != NEW.valid THEN
    INSERT INTO refresh_trigger
    SET table_name = 'sdpid',
        event = 'update';
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `sdpid_mqtttopic`
--

CREATE TABLE `sdpid_mqtttopic` (
  `id` int(11) NOT NULL,
  `sdpid` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sdpid_mqtttopic`
--

INSERT INTO `sdpid_mqtttopic` (`id`, `sdpid`, `topic_id`) VALUES
(1, 55560, 1),
(2, 55560, 2),
(3, 55561, 2),
(4, 55561, 2),
(5, 55563, 3);

-- --------------------------------------------------------

--
-- Table structure for table `sdpid_service`
--

CREATE TABLE `sdpid_service` (
  `id` int(11) NOT NULL,
  `sdpid` int(11) NOT NULL,
  `service_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `sdpid_service`
--

INSERT INTO `sdpid_service` (`id`, `sdpid`, `service_id`) VALUES
(25, 55563, 3),
(26, 55564, 3),
(27, 55564, 4),
(28, 55565, 4),
(29, 55566, 4),
(34, 55564, 5),
(35, 55565, 5),
(36, 55564, 1),
(42, 55560, 2),
(46, 55566, 2),
(49, 55560, 12),
(54, 55565, 12),
(55, 55566, 12),
(85, 55566, 5),
(86, 55560, 5),
(87, 55560, 3),
(88, 55566, 1);

--
-- Triggers `sdpid_service`
--
DELIMITER $$
CREATE TRIGGER `sdpid_service_after_delete` AFTER DELETE ON `sdpid_service` FOR EACH ROW BEGIN
    INSERT INTO refresh_trigger
    SET table_name = 'sdpid_service',
        event = 'delete';
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `sdpid_service_after_insert` AFTER INSERT ON `sdpid_service` FOR EACH ROW BEGIN
    INSERT INTO refresh_trigger
    SET table_name = 'sdpid_service',
        event = 'insert';
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `sdpid_service_after_update` AFTER UPDATE ON `sdpid_service` FOR EACH ROW BEGIN
    INSERT INTO refresh_trigger
    SET table_name = 'sdpid_service',
        event = 'update';
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `name` varchar(1024) COLLATE utf8_bin NOT NULL,
  `description` varchar(4096) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `name`, `description`) VALUES
(1, 'SDP Controller 1', 'SDP Controller service running at port 5000'),
(2, 'SDP Controller 2', 'SDP Controller instance reserved for further orchestration '),
(3, 'Mosquitto Broker', 'Eclipse Mosquitto Broker running at 1883, 8883'),
(4, 'Python Test Web Server', 'Python Test Web Server running at port 9000 and 5000'),
(5, 'A', 'A'),
(12, 'E', 'E');

--
-- Triggers `service`
--
DELIMITER $$
CREATE TRIGGER `service_after_delete` AFTER DELETE ON `service` FOR EACH ROW BEGIN
    INSERT INTO refresh_trigger
    SET table_name = 'service',
        event = 'delete';
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `service_gateway`
--

CREATE TABLE `service_gateway` (
  `id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `gateway_sdpid` int(11) NOT NULL,
  `protocol` tinytext COLLATE utf8_bin NOT NULL COMMENT 'TCP, UDP',
  `port` int(10) UNSIGNED NOT NULL,
  `nat_ip` varchar(128) COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '1.1.1.1   internal IP address',
  `nat_port` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `service_gateway`
--

INSERT INTO `service_gateway` (`id`, `service_id`, `gateway_sdpid`, `protocol`, `port`, `nat_ip`, `nat_port`) VALUES
(5, 1, 55541, 'TCP', 5000, '', 0),
(6, 3, 55550, 'TCP', 1883, '172.16.31.121', 1883),
(7, 3, 55550, 'TCP', 8883, '172.16.31.121', 8883),
(8, 4, 55541, 'TCP', 9000, '', 0),
(16, 4, 55550, 'TCP', 5000, '', 0),
(17, 2, 55550, 'TCP', 6000, '', 5000),
(23, 2, 55550, 'TCP', 5000, '172.16.31.31', 5000),
(25, 2, 55550, 'TCP', 5000, '', 0),
(26, 2, 55550, 'TCP', 1234, '', 0),
(27, 5, 55550, 'TCP', 58548, '', 0),
(28, 5, 55550, 'TCP', 789, '', 0);

--
-- Triggers `service_gateway`
--
DELIMITER $$
CREATE TRIGGER `service_gateway_after_delete` AFTER DELETE ON `service_gateway` FOR EACH ROW BEGIN
    INSERT INTO refresh_trigger
    SET table_name = 'service_gateway',
        event = 'delete';
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `service_gateway_after_insert` AFTER INSERT ON `service_gateway` FOR EACH ROW BEGIN
    INSERT INTO refresh_trigger
    SET table_name = 'service_gateway',
        event = 'insert';
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `service_gateway_after_update` AFTER UPDATE ON `service_gateway` FOR EACH ROW BEGIN
    INSERT INTO refresh_trigger
    SET table_name = 'service_gateway',
        event = 'update';
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `last_name` varchar(128) COLLATE utf8_bin NOT NULL,
  `first_name` varchar(128) COLLATE utf8_bin NOT NULL,
  `country` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `state` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `locality` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `org` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `org_unit` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `alt_name` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(128) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `last_name`, `first_name`, `country`, `state`, `locality`, `org`, `org_unit`, `alt_name`, `email`) VALUES
(1, 'Admin', 'Dev', 'DE', 'Saxony', 'Chemnitz', 'TU Chemnitz', 'ADMIN', NULL, ''),
(2, 'Gaedke', 'Martin', 'DE', 'Saxony', 'Chemnitz', 'TU Chemnitz', 'VSR', NULL, ''),
(3, 'Valentin', 'Siegert', 'DE', 'Saxony', 'Chemnitz', 'TU Chemnitz', 'VSR', NULL, ''),
(4, 'Süße', 'Marian', 'DE', 'Saxony', 'Chemnitz', 'Fraunhofer', 'IWU', NULL, ''),
(5, 'Singer', 'Adrian', 'DE', 'Saxony', 'Chemnitz', 'Fraunhofer', 'IWU', NULL, ''),
(6, 'Sankal', 'Talib', 'DE', 'Nordrhein-Westfalen', 'Aachen', 'Fraunhofer', 'IPT', NULL, ''),
(7, 'Drechsler', 'Chris', 'DE', 'Saxony', 'Chemnitz', 'Fraunhofer', 'IWU', NULL, ''),
(8, 'Schwarting', 'Tom', 'DE', 'Saxony', 'Chemnitz', 'Fraunhofer', 'IWU', NULL, '');

--
-- Triggers `user`
--
DELIMITER $$
CREATE TRIGGER `user_after_delete` AFTER DELETE ON `user` FOR EACH ROW BEGIN
    INSERT INTO refresh_trigger
    SET table_name = 'user',
        event = 'delete';
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user_credential`
--

CREATE TABLE `user_credential` (
  `id` int(11) NOT NULL,
  `username` varchar(64) NOT NULL,
  `password` char(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_credential`
--

INSERT INTO `user_credential` (`id`, `username`, `password`) VALUES
(1, 'devadmin', 'ef260e9aa3c673af240d17a2660480361a8e081d1ffeca2a5ed0e3219fc18567'),
(4, 'marian', 'ds'),
(2, 'martin', 'ss'),
(3, 'valentin', 'ss');

-- --------------------------------------------------------

--
-- Table structure for table `user_group`
--

CREATE TABLE `user_group` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `user_group`
--

INSERT INTO `user_group` (`id`, `user_id`, `group_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 2);

--
-- Triggers `user_group`
--
DELIMITER $$
CREATE TRIGGER `user_group_after_delete` AFTER DELETE ON `user_group` FOR EACH ROW BEGIN
    INSERT INTO refresh_trigger
    SET table_name = 'user_group',
        event = 'delete';
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `user_group_after_insert` AFTER INSERT ON `user_group` FOR EACH ROW BEGIN
    INSERT INTO refresh_trigger
    SET table_name = 'user_group',
        event = 'insert';
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `user_group_after_update` AFTER UPDATE ON `user_group` FOR EACH ROW BEGIN
    INSERT INTO refresh_trigger
    SET table_name = 'user_group',
        event = 'update';
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user_mqtttopic`
--

CREATE TABLE `user_mqtttopic` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `access` enum('read','write','readwrite','deny') NOT NULL DEFAULT 'deny'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_mqtttopic`
--

INSERT INTO `user_mqtttopic` (`id`, `user_id`, `topic_id`, `access`) VALUES
(3, 2, 1, 'deny'),
(4, 3, 2, 'deny'),
(5, 3, 3, 'deny'),
(10, 4, 4, 'deny');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `closed_connection`
--
ALTER TABLE `closed_connection`
  ADD PRIMARY KEY (`gateway_sdpid`,`client_sdpid`,`start_timestamp`,`source_port`),
  ADD KEY `gateway_sdpid` (`gateway_sdpid`),
  ADD KEY `client_sdpid` (`client_sdpid`);

--
-- Indexes for table `controller`
--
ALTER TABLE `controller`
  ADD PRIMARY KEY (`sdpid`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `gateway_sdpid` (`gateway_sdpid`);

--
-- Indexes for table `environment`
--
ALTER TABLE `environment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gateway`
--
ALTER TABLE `gateway`
  ADD PRIMARY KEY (`sdpid`);

--
-- Indexes for table `gateway_controller`
--
ALTER TABLE `gateway_controller`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gateway_sdpid` (`gateway_sdpid`),
  ADD KEY `controller_sdpid` (`controller_sdpid`);

--
-- Indexes for table `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_mqtttopic`
--
ALTER TABLE `group_mqtttopic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_mqtttopic_ibfk_1` (`group_id`),
  ADD KEY `group_mqtttopic_ibfk_2` (`topic_id`);

--
-- Indexes for table `group_service`
--
ALTER TABLE `group_service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `mqtttopic`
--
ALTER TABLE `mqtttopic`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `open_connection`
--
ALTER TABLE `open_connection`
  ADD PRIMARY KEY (`gateway_controller_connection_id`,`client_sdpid`,`start_timestamp`,`source_port`),
  ADD KEY `gateway_sdpid` (`gateway_sdpid`),
  ADD KEY `client_sdpid` (`client_sdpid`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `refresh_trigger`
--
ALTER TABLE `refresh_trigger`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sdpid`
--
ALTER TABLE `sdpid`
  ADD PRIMARY KEY (`sdpid`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `environment_id` (`environment_id`);

--
-- Indexes for table `sdpid_mqtttopic`
--
ALTER TABLE `sdpid_mqtttopic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sdpid_mqtttopic_ibfk_1` (`sdpid`),
  ADD KEY `sdpid_mqtttopic_ibfk_2` (`topic_id`);

--
-- Indexes for table `sdpid_service`
--
ALTER TABLE `sdpid_service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `sdpid` (`sdpid`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_gateway`
--
ALTER TABLE `service_gateway`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `gateway_sdpid` (`gateway_sdpid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_credential`
--
ALTER TABLE `user_credential`
  ADD UNIQUE KEY `user_credential_ix_unique_username` (`username`),
  ADD KEY `user_credential_ibfk_1` (`id`);

--
-- Indexes for table `user_group`
--
ALTER TABLE `user_group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `user_mqtttopic`
--
ALTER TABLE `user_mqtttopic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_mqtttopic_ibfk_1` (`user_id`),
  ADD KEY `user_mqtttopic_ibfk_2` (`topic_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `environment`
--
ALTER TABLE `environment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gateway_controller`
--
ALTER TABLE `gateway_controller`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `group`
--
ALTER TABLE `group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `group_mqtttopic`
--
ALTER TABLE `group_mqtttopic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `group_service`
--
ALTER TABLE `group_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `mqtttopic`
--
ALTER TABLE `mqtttopic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `refresh_trigger`
--
ALTER TABLE `refresh_trigger`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=330;

--
-- AUTO_INCREMENT for table `sdpid`
--
ALTER TABLE `sdpid`
  MODIFY `sdpid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55570;

--
-- AUTO_INCREMENT for table `sdpid_mqtttopic`
--
ALTER TABLE `sdpid_mqtttopic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sdpid_service`
--
ALTER TABLE `sdpid_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `service_gateway`
--
ALTER TABLE `service_gateway`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user_group`
--
ALTER TABLE `user_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_mqtttopic`
--
ALTER TABLE `user_mqtttopic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `closed_connection`
--
ALTER TABLE `closed_connection`
  ADD CONSTRAINT `closed_connection_ibfk_1` FOREIGN KEY (`gateway_sdpid`) REFERENCES `sdpid` (`sdpid`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `closed_connection_ibfk_2` FOREIGN KEY (`client_sdpid`) REFERENCES `sdpid` (`sdpid`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `controller`
--
ALTER TABLE `controller`
  ADD CONSTRAINT `controller_ibfk_1` FOREIGN KEY (`sdpid`) REFERENCES `sdpid` (`sdpid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `controller_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `controller_ibfk_3` FOREIGN KEY (`gateway_sdpid`) REFERENCES `sdpid` (`sdpid`) ON UPDATE CASCADE;

--
-- Constraints for table `gateway`
--
ALTER TABLE `gateway`
  ADD CONSTRAINT `gateway_ibfk_1` FOREIGN KEY (`sdpid`) REFERENCES `sdpid` (`sdpid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `gateway_controller`
--
ALTER TABLE `gateway_controller`
  ADD CONSTRAINT `gateway_controller_ibfk_1` FOREIGN KEY (`gateway_sdpid`) REFERENCES `sdpid` (`sdpid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `gateway_controller_ibfk_2` FOREIGN KEY (`controller_sdpid`) REFERENCES `sdpid` (`sdpid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `group_mqtttopic`
--
ALTER TABLE `group_mqtttopic`
  ADD CONSTRAINT `group_mqtttopic_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `group_mqtttopic_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `mqtttopic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `group_service`
--
ALTER TABLE `group_service`
  ADD CONSTRAINT `group_service_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `group_service_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `open_connection`
--
ALTER TABLE `open_connection`
  ADD CONSTRAINT `open_connection_ibfk_1` FOREIGN KEY (`gateway_sdpid`) REFERENCES `sdpid` (`sdpid`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `open_connection_ibfk_2` FOREIGN KEY (`client_sdpid`) REFERENCES `sdpid` (`sdpid`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `open_connection_ibfk_3` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `sdpid`
--
ALTER TABLE `sdpid`
  ADD CONSTRAINT `sdpid_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `sdpid_ibfk_2` FOREIGN KEY (`environment_id`) REFERENCES `environment` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `sdpid_mqtttopic`
--
ALTER TABLE `sdpid_mqtttopic`
  ADD CONSTRAINT `sdpid_mqtttopic_ibfk_1` FOREIGN KEY (`sdpid`) REFERENCES `sdpid` (`sdpid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sdpid_mqtttopic_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `mqtttopic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sdpid_service`
--
ALTER TABLE `sdpid_service`
  ADD CONSTRAINT `sdpid_service_ibfk_1` FOREIGN KEY (`sdpid`) REFERENCES `sdpid` (`sdpid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sdpid_service_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `service_gateway`
--
ALTER TABLE `service_gateway`
  ADD CONSTRAINT `service_gateway_ibfk_1` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `service_gateway_ibfk_2` FOREIGN KEY (`gateway_sdpid`) REFERENCES `sdpid` (`sdpid`) ON UPDATE CASCADE;

--
-- Constraints for table `user_credential`
--
ALTER TABLE `user_credential`
  ADD CONSTRAINT `user_credential_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_group`
--
ALTER TABLE `user_group`
  ADD CONSTRAINT `user_group_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_group_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_mqtttopic`
--
ALTER TABLE `user_mqtttopic`
  ADD CONSTRAINT `user_mqtttopic_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_mqtttopic_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `mqtttopic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
