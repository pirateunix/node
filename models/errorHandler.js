/**
 * Created by pirate on 20.12.15.
 */
/*
 * Отлавливаю все ошибки и вывожу их в специальном шаблоне.
 * Отдельно проверяю статус 404
 */
module.exports = function *(next) {
    try {
        yield next;
    } catch (err) {
        console.log(err.status);
        this.status = err.status || 500;
        if (this.status >= 400) {
            var error = {};
            error.status = String(this.status);
            error.title = err.message;
            yield this.render('error', {
                text: error.title
            });

        }
    }
    if (this.status == 404) {
        this.status = 404;
        this.body = "Sorry, file not found";
    }
};
