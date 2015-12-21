/**
 * Created by pirate on 20.12.15.
 */
var query = require('../models/database');
/*
 *Модуль для запроса данных пользователя из БД и добавления нового пользователя
 */
function *getUser(username) {
    var sql = 'SELECT * from user WHERE login =\'' + username + '\';';
    var result = yield query(sql);
    return result;
}

function *addUser(username, name, password, salt, mail) {
    var sql = 'INSERT INTO user (login,name,password,salt,mail,rights) VALUES (\'' + username + '\',\'' + name + '\',\'' + password + '\',' + salt + ',\'' + mail + '\',0);';
    var result = yield query(sql);
    return result;
}

function *updateOnline(online, username) {
    var sql = 'UPDATE user SET online = \'' + online + '\' WHERE login = \'' + username + '\';';
    var result = yield query(sql);
    return result;
}

function *checkOnline(online) {
    var sql = 'SELECT * from user WHERE online =\'' + online + '\';';
    var result = yield query(sql);
    return result;
}

module.exports = {
    getUser: getUser,
    addUser: addUser,
    updateOnline: updateOnline,
    checkOnline: checkOnline
}