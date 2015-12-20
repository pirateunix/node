/**
 * Created by pirate on 20.12.15.
 */
/*
 *Проверяю по регулярным выражениям Корректность введенных пользователям данных
 */
function parserMail(mail) {
    var regex = /^([a-z0-9])(\w|[.]|-|_)+([a-z0-9])@([a-z0-9])([a-z0-9.-]*)([a-z0-9])([.]{1})([a-z]{2,4})$/;
    var result = regex.test(mail);
    return result;
}

function parserUser(username) {
    var regex = /^([a-zA-Z0-9])(\w|-|_)+([a-z0-9])$/;
    var result = regex.test(username);
    return result;
}

module.exports = {
    parserUser: parserUser,
    parserMail: parserMail
}
