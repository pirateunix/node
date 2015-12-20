Для разворачивания проекта необходимо:

$git clone https://github.com/pirateunix/node.git
$cd node
$npm i
$npm start

http://localhost:5000/

Coздать БД node и создать таблицу:
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text CHARACTER SET utf8,
  `login` varchar(25) CHARACTER SET utf8 NOT NULL,
  `password` varchar(32) CHARACTER SET utf8 NOT NULL,
  `reg_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `salt` varchar(3) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `rights` smallint(1) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

Авторизация и регистрация пользователя. Проект создан с помощью koa-generator и с использованием фрэймвёрка Koa.
В качетсве шаблонизатора был выбран handlebars. Необходимые настройки вынесены в configs/config.json.
Создал модели для работы с БД, для проверки введеных пользователем данных. errorHandler - мой middleware,
создан для отслеживания ошибок и вывода их. Настроены роутеры: в users.js выполняется авторизация и регистрация пользователей.
