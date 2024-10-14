-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Окт 14 2024 г., 21:47
-- Версия сервера: 5.7.39
-- Версия PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `HR`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Contact`
--

CREATE TABLE `Contact` (
  `ID_contact` int(11) NOT NULL,
  `phone_number` varchar(18) NOT NULL,
  `address` varchar(100) NOT NULL,
  `ID_employee` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Contact`
--

INSERT INTO `Contact` (`ID_contact`, `phone_number`, `address`, `ID_employee`) VALUES
(1, '+7 (997) 300-44-40', 'Г. Ярославль Проспект Ленина 48', 1),
(8, '+7 (997) 300-44-40', 'Г. Ярославль Проспект Ленина 48', 2),
(9, '+7 (910) 680-32-40', 'Г. Ярославль Проспект Ленина 58', 3),
(10, '+7 (399) 380-88-90', 'Г. Ярославль улица свободы 24', 4),
(11, '+7 (996) 380-11-22', 'Г. Ярославль проспект Толбухина', 5),
(12, '+7 (991) 410-32-00', 'Г. Ярославль улица марта 8', 6),
(13, '+7 (996) 380-46-00', 'Г. Ярославль Александровская площадь дом 3', 7),
(14, '+7 (996) 380-46-00', 'Тутаевское ш., 31А', 9),
(15, '+7 (996) 380-66-00', 'Тутаевское ш., 31А', 10),
(16, '+7 (996) 000-46-00', 'Тутаевское ш., 31А', 11),
(17, '+7 (996) 890-46-00', 'Тутаевское ш., 31А', 12),
(18, '+7 (996) 380-46-06', 'Тутаевское ш., 31А', 13),
(19, '+7 (996) 390-46-00', 'Тутаевское ш., 31А', 14),
(20, '+7 (999) 780-46-00', 'Тутаевское ш., 31А', 15),
(21, '+7 (996) 300-22-00', 'Тутаевское ш., 31А', 16),
(22, '+7 (999) 360-26-00', 'Тутаевское ш., 31А', 17),
(23, '+7 (997) 300-44-40', 'Тутаевское ш., 31А', 18),
(24, '+7 (996) 310-22-46', 'Тутаевское ш., 31А', 19),
(25, '+7 (996) 310-22-46', 'Тутаевское ш., 31А', 20),
(26, '+7 (997) 300-44-40', 'Тутаевское ш., 31А', 21),
(27, '+7 (996) 310-22-46', 'Тутаевское ш., 31А', 22),
(28, '+7 (996) 333-22-46', 'Тутаевское ш., 31А', 23),
(29, '+7 (980) 992-92-29', 'Тутаевское ш., 31А', 24),
(30, '+7 (906) 310-22-66', 'Тутаевское ш., 31А', 25),
(31, '+7 (980) 680-80-90', 'г.Ярославль', 26);

-- --------------------------------------------------------

--
-- Структура таблицы `Department`
--

CREATE TABLE `Department` (
  `ID_department` int(11) NOT NULL,
  `title` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Department`
--

INSERT INTO `Department` (`ID_department`, `title`) VALUES
(1, 'Дизайн'),
(2, 'Разработка технических продуктов'),
(3, 'Тестировка'),
(4, 'Разработка мобильных приложений'),
(5, 'Продажи');

-- --------------------------------------------------------

--
-- Структура таблицы `Employee`
--

CREATE TABLE `Employee` (
  `ID_employee` int(11) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `name` varchar(20) NOT NULL,
  `patronymic` varchar(40) NOT NULL,
  `ID_post` int(11) NOT NULL,
  `ID_department` int(11) NOT NULL,
  `ID_status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Employee`
--

INSERT INTO `Employee` (`ID_employee`, `surname`, `name`, `patronymic`, `ID_post`, `ID_department`, `ID_status`) VALUES
(1, 'Иванов', 'Иван', 'Иванович', 2, 1, 2),
(2, 'Ключников1', 'Иван', 'Александрович', 4, 4, 4),
(3, 'Иванов', 'Егор', 'Андреевич', 3, 5, 3),
(4, 'Логинов', 'Алексей', 'Константинович ', 1, 2, 2),
(5, 'Бутузов', 'Иван', 'Генадьевич', 4, 2, 4),
(6, 'Полякова', 'Кристина', 'Генадьевна', 1, 2, 4),
(7, 'Мареева', 'Виктория', 'Семеновна', 5, 3, 3),
(8, 'Чубарова', 'Ольга', 'Владимировна', 3, 2, 4),
(9, 'Заводовский', 'Денис', 'Владимирови', 2, 4, 4),
(10, 'Цветаева', 'Марина', 'Владимировна', 4, 1, 1),
(11, 'Цветаева', 'Марина', 'Владимировна', 4, 1, 1),
(12, 'Чубарова', 'Ольга', 'Владимировна', 1, 4, 2),
(13, 'Чубарова', 'Ольга', 'Владимировна', 1, 4, 2),
(14, 'Заводовский', 'Денис', 'Владимирович', 3, 3, 4),
(15, 'Zavodovskiy', 'Denis', 'Владимирович', 4, 3, 4),
(16, 'Заводовский', 'Денис', 'Владимирови', 4, 2, 3),
(17, 'Овечкина', 'Ольга', 'Ильичина', 3, 2, 4),
(18, 'Овечкина', 'Ольга', 'Ильичина', 2, 3, 1),
(19, 'Заводовский', 'Денис', 'Владимирович', 4, 3, 2),
(20, 'Овечкина', 'Ольга', 'Ильичина', 1, 5, 2),
(21, 'Цветаева', 'Марина', 'Владимировна', 2, 2, 4),
(22, 'Василькова', 'Марина', 'Альбинасовна ', 2, 4, 2),
(23, 'Василькова', 'Ольга', 'Альбинасовна', 1, 3, 3),
(24, 'Иванова', 'Ольга', 'Ильичина', 5, 3, 4),
(25, 'Чубарова', 'Ольга', 'Владимировна', 4, 3, 3),
(26, 'Мареев', 'Илья', 'Мурович', 2, 3, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `Finances`
--

CREATE TABLE `Finances` (
  `ID_finances` int(11) NOT NULL,
  `patch` int(11) NOT NULL,
  `date_work` date NOT NULL,
  `ID_employee` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Finances`
--

INSERT INTO `Finances` (`ID_finances`, `patch`, `date_work`, `ID_employee`) VALUES
(1, 50009, '2024-09-03', 1),
(2, 78000, '2024-09-14', 2),
(3, 120409, '2024-07-02', 3),
(4, 56000, '2024-10-01', 4),
(5, 28000, '2024-10-02', 5),
(6, 56000, '2024-08-16', 6),
(7, 78600, '2024-06-20', 7),
(8, 46000, '2024-10-12', 9),
(9, 34000, '2024-10-12', 10),
(10, 34000, '2024-10-12', 11),
(11, 23456, '2024-10-12', 12),
(12, 23456, '2024-10-12', 13),
(13, 2222, '2024-10-12', 14),
(14, 2, '2024-10-12', 15),
(15, 55, '2024-10-12', 16),
(16, 6000, '2024-10-13', 17),
(17, 13550, '2024-10-13', 18),
(18, 90000, '2024-10-13', 19),
(19, 90, '2024-10-13', 20),
(20, 45000, '2024-10-13', 21),
(21, 333, '2024-10-13', 22),
(22, 45000, '2024-10-13', 23),
(23, 76000, '2024-10-13', 24),
(24, 33000, '2024-10-13', 25),
(25, 78000, '2024-10-14', 26);

-- --------------------------------------------------------

--
-- Структура таблицы `Passport`
--

CREATE TABLE `Passport` (
  `ID_passport` int(11) NOT NULL,
  `series_numer` varchar(11) NOT NULL,
  `ID_employee` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Passport`
--

INSERT INTO `Passport` (`ID_passport`, `series_numer`, `ID_employee`) VALUES
(1, '1234 567890', 1),
(2, '4565 809099', 2),
(3, '7003 809066', 3),
(4, '7560 405890', 4),
(5, '7903 903800', 5),
(6, '7089 505088', 6),
(7, '7723 800066', 7),
(8, '2232 456363', 9),
(9, '2232 456363', 10),
(10, '2232 456363', 11),
(11, '2232 456363', 12),
(12, '2232 456363', 13),
(13, '2232 456363', 14),
(14, '2232 456363', 15),
(15, '2232 456363', 16),
(16, '2232 456363', 17),
(17, '2232 445765', 18),
(18, '2232 456363', 19),
(19, '2232 456363', 20),
(20, '2232 456363', 21),
(21, '2232 456322', 22),
(22, '2232 456363', 23),
(23, '2232 456363', 24),
(24, '2232 456555', 25),
(25, '2232 456363', 26);

-- --------------------------------------------------------

--
-- Структура таблицы `Post`
--

CREATE TABLE `Post` (
  `ID_post` int(11) NOT NULL,
  `title` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Post`
--

INSERT INTO `Post` (`ID_post`, `title`) VALUES
(1, 'Верстальщик'),
(2, 'Дизайнер'),
(3, 'Администратор'),
(4, 'Тимлид'),
(5, 'Тестировщик');

-- --------------------------------------------------------

--
-- Структура таблицы `Status`
--

CREATE TABLE `Status` (
  `ID_status` int(11) NOT NULL,
  `title` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Status`
--

INSERT INTO `Status` (`ID_status`, `title`) VALUES
(1, 'Отпуск'),
(2, 'Уволен'),
(3, 'Работает'),
(4, 'Больничный');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Contact`
--
ALTER TABLE `Contact`
  ADD PRIMARY KEY (`ID_contact`),
  ADD KEY `ID_employee` (`ID_employee`);

--
-- Индексы таблицы `Department`
--
ALTER TABLE `Department`
  ADD PRIMARY KEY (`ID_department`);

--
-- Индексы таблицы `Employee`
--
ALTER TABLE `Employee`
  ADD PRIMARY KEY (`ID_employee`),
  ADD KEY `ID_post` (`ID_post`),
  ADD KEY `ID_department` (`ID_department`),
  ADD KEY `ID_status` (`ID_status`);

--
-- Индексы таблицы `Finances`
--
ALTER TABLE `Finances`
  ADD PRIMARY KEY (`ID_finances`),
  ADD KEY `ID_employee` (`ID_employee`);

--
-- Индексы таблицы `Passport`
--
ALTER TABLE `Passport`
  ADD PRIMARY KEY (`ID_passport`),
  ADD KEY `ID_employee` (`ID_employee`);

--
-- Индексы таблицы `Post`
--
ALTER TABLE `Post`
  ADD PRIMARY KEY (`ID_post`);

--
-- Индексы таблицы `Status`
--
ALTER TABLE `Status`
  ADD PRIMARY KEY (`ID_status`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Contact`
--
ALTER TABLE `Contact`
  MODIFY `ID_contact` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT для таблицы `Department`
--
ALTER TABLE `Department`
  MODIFY `ID_department` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `Employee`
--
ALTER TABLE `Employee`
  MODIFY `ID_employee` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT для таблицы `Finances`
--
ALTER TABLE `Finances`
  MODIFY `ID_finances` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT для таблицы `Passport`
--
ALTER TABLE `Passport`
  MODIFY `ID_passport` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT для таблицы `Post`
--
ALTER TABLE `Post`
  MODIFY `ID_post` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `Status`
--
ALTER TABLE `Status`
  MODIFY `ID_status` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Contact`
--
ALTER TABLE `Contact`
  ADD CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`ID_employee`) REFERENCES `Employee` (`ID_employee`);

--
-- Ограничения внешнего ключа таблицы `Employee`
--
ALTER TABLE `Employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`ID_post`) REFERENCES `Post` (`ID_post`),
  ADD CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`ID_status`) REFERENCES `Status` (`ID_status`),
  ADD CONSTRAINT `employee_ibfk_3` FOREIGN KEY (`ID_department`) REFERENCES `Department` (`ID_department`);

--
-- Ограничения внешнего ключа таблицы `Finances`
--
ALTER TABLE `Finances`
  ADD CONSTRAINT `finances_ibfk_1` FOREIGN KEY (`ID_employee`) REFERENCES `Employee` (`ID_employee`);

--
-- Ограничения внешнего ключа таблицы `Passport`
--
ALTER TABLE `Passport`
  ADD CONSTRAINT `passport_ibfk_1` FOREIGN KEY (`ID_employee`) REFERENCES `Employee` (`ID_employee`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
