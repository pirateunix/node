var router = require('koa-router')();

router.get('/', function *(next) {
    var template = {
        auth: false
    };
    if (this.state.username) {
        template = {
            title: 'My app!',
            auth: true,
            name: this.state.username
        }
    }
    yield this.render('index', template);
});

router.get('/entering', function *(next) {
    yield this.render('entering');
});

module.exports = router;
