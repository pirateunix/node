/**
 * Created by pirate on 19.12.15.
 */
/*
 *Модуль для работы с БД
 */

var wrapper = require('co-mysql');
var mysql = require('mysql');
var db = null;
//параметры подключения храним в отдельном json
var nconf = require('nconf');

function connect() {
    if (db === null) {
        var pool = mysql.createPool({
            host: nconf.get('db:host'),
            user: nconf.get('db:user'),
            password: nconf.get('db:password'),
            database: nconf.get('db:database')
        });
        db = wrapper(pool);
    }
}

function *query(sql) {
    connect();
    return yield db.query(sql);
}
module.exports = query;
