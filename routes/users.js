var router = require('koa-router')();
var md5 = require('md5');
var dbQuery = require('../models/dbQuery');
var parser = require('../models/parser');

//Функция для генерации случайных чисел, нужня для создания соли. Шифруем пароль.
function randomInt(high, low) {
    return Math.floor(Math.random() * (high - low) + low);
}

router.post('/login', function *(next) {
    var req = this.request.body;
    var result = yield dbQuery.getUser(req.username);
    //Проверяю, что в БД существует такой логин
    if (result.length == 1) {
        var password = md5(req.password + result[0].salt);
        //сверяю хэш из БД с хэшем пароля, введенного пользователем
        if (password == result[0].password) {
            //Помещаю случайный хэш в базу и сессию
            var rand = randomInt(1000, 9000);
            var online = md5(rand);
            yield dbQuery.updateOnline(online,req.username);
            this.session.online = online;
            this.redirect('/');
        } else {
            this.throw("password incorrect");
        }
    } else {
        this.throw("user not found");
    }
});

router.get('/logout', function *(next) {
    //удаляю сессию
    this.session = null;
    yield this.render('index');
});

router.get('/registration', function *(next) {
    this.session = null;
    yield this.render('registration');
});

router.post('/isreg', function *(next) {
    var req = this.request.body;
    //Проверяем введеные пользователем email и username. Проверям что все поля заполнены.
    var matchMail = parser.parserMail(req.mail);
    var matchUser = parser.parserUser(req.username);
    if (req.name == '' || req.username == '' || req.password == '' || req.password2 == '' || req.mail == '' || !matchMail || !matchUser) {
        this.throw("Заполнены не все поля, либо не верны login|email");
    } else {
        //проверяем, что повторно пароль введен правильно
        if (req.password != req.password2) {
            this.throw("Повтор пароля введен не верно");
        } else {
            //проверяю, что такого пользователя нет в БД
            var result = yield dbQuery.getUser(req.username);
            if (result.length != 0) {
                this.throw("Имя пользователя уже существует");
            } else {
                var salt = randomInt(100, 900);
                var password = md5(req.password + salt);
                //Добавляем пользователя в БД
                yield dbQuery.addUser(req.username, req.name, password, salt, req.mai);
                //Помещаю случайный хэш в базу и сессию
                var rand = randomInt(1000, 9000);
                var online = md5(rand);
                yield dbQuery.updateOnline(online,req.username);
                this.session.online = online;
                this.redirect('/');
            }

        }
    }

});

module.exports = router;
