/**
 * Created by pirate on 21.12.15.
 */
/*
 * Сверяем хэш из сессии с хэшом из базы и выставляем username в this.state
 */
var dbQuery = require('../models/dbQuery');

function *online(next) {
    if (this.session.online){
        var result = yield dbQuery.checkOnline(this.session.online);

        if (result.length == 1) {
            this.state.username = result[0].login;
        }
    }
    yield next;
}

module.exports = online;