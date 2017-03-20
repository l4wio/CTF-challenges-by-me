-- phpMyAdmin SQL Dump
-- version 2.11.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 18, 2009 at 07:46 PM
-- Server version: 5.0.51
-- PHP Version: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `test1`
--

-- --------------------------------------------------------

--
-- Table structure for table `basic`
--

CREATE TABLE IF NOT EXISTS `basic` (
  `id` int(2) NOT NULL,
  `title` varchar(100) character set latin1 NOT NULL,
  `content` varchar(1000) collate utf8_unicode_ci NOT NULL,
  `count` int(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `basic`
--

INSERT INTO `basic` (`id`, `title`, `content`, `count`) VALUES
(1, 'Welcome', 'M&#236;nh l&#7853;p ra c&#225;i Tester n&#224;y &#273;&#7875; a-e hi&#7875;u bi&#7871;t th&#234;m v&#7873; MySQL :) . Mong nh&#7919;ng t&#224;i li&#7879;u n&#224;y s&#7869; gi&#250;p a-e hi&#7875;u th&#234;m v&#7873; SQL Injection h&#417;n :). --ManhLuat93--', 17),
(2, 'Google', 'Google l&#224; m&#7897;t c&#244;ng ty Internet t&#7847;m c&#7905; th&#7871; gi&#7899;i c&#243; tr&#7909; s&#7903; t&#7841;i Hoa K&#7923;, &#273;&#432;&#7907;c th&#224;nh l&#7853;p v&#224;o n&#259;m 1998. S&#7843;n ph&#7849;m ch&#237;nh c&#7911;a c&#244;ng ty n&#224;y l&#224; c&#244;ng c&#7909; t&#236;m ki&#7871;m Google, &#273;&#432;&#7907;c nhi&#7873;u ng&#432;&#7901;i &#273;&#225;nh gi&#225; l&#224; c&#244;ng c&#7909; t&#236;m ki&#7871;m h&#7919;u &#237;ch v&#224; m&#7841;nh m&#7869; nh&#7845;t tr&#234;n Internet. Tr&#7909; s&#7903; c&#7911;a Google t&#234;n l&#224; "Googleplex" t&#7841;i Mountain View, California. Google c&#243; tr&#234;n 15.000 nh&#226;n vi&#234;n, gi&#225;m &#273;&#7889;c l&#224; Ti&#7871;n s&#297; Eric Schmidt, tr&#432;&#7899;c &#273;&#226;y l&#224; gi&#225;m &#273;&#7889;c c&#244;ng ty Novell. T&#234;n "Google" l&#224; m&#7897;t l&#7889;i ch&#417;i ch&#7919; c&#7911;a t&#7915; googol, b&#7857;ng 10100. Google ch&#7885;n t&#234;n n&#224;y &#273;&#7875; th&#7875; ', 4),
(3, 'Yahoo', 'Yahoo! Inc. [1] l&#224; m&#7897;t c&#244;ng ty Internet Hoa K&#7923; v&#7899;i m&#7909;c ti&#234;u tr&#7903; th&#224;nh "d&#7883;ch v&#7909; Internet to&#224;n c&#7847;u h&#224;ng &#273;&#7847;u cho ng&#432;&#7901;i ti&#234;u th&#7909; v&#224; gi&#7899;i doanh nghi&#7879;p". Trang ch&#237;nh c&#7911;a n&#243; &#273;&#7863;t t&#7841;i http://www.yahoo.com, phi&#234;n b&#7843;n ti&#7871;ng Vi&#7879;t t&#7841;i http://vn.yahoo.com, m&#7897;t th&#432; m&#7909;c m&#7841;ng l&#432;&#7899;i v&#224; m&#7897;t s&#7889; d&#7883;ch v&#7909; kh&#225;c, trong &#273;&#243; c&#243; Yahoo! Mail. Yahoo! &#273;&#432;&#7907;c s&#225;ng l&#7853;p b&#7903;i hai sinh vi&#234;n cao h&#7885;c t&#7841;i tr&#432;&#7901;ng &#272;&#7841;i h&#7885;c Stanford l&#224; David Filo v&#224; Jerry Yang (&#26954;&#33268;&#36960;, D&#432;&#417;ng Tr&#237; Vi&#7877;n) v&#224;o th&#225;ng 1 n&#259;m 1994 v&#224; &#273;&#432;&#7907;c th&#224;nh l&#7853;p v&#224;o ng&#224;y 2 th&#225;ng 3 n&#259;m 1995. Tr&#7909; s&#7903; c&#2', 0);
