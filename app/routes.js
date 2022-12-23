const path = require('path');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.status(200).send('<h1>Hello World</h1>');
    })

    //Funcoes
    app.get('/funcoes', require('./routes/funcoes/all')())
    app.get('/funcoes/:id', require('./routes/funcoes/byId')())

    //Auth
    app.post('/auth/validate', require('./routes/auth/validate')())

    app.post('/auth/logout', require('./routes/auth/logout')())

    app.post('/auth/login', require('./routes/auth/login')())

    app.post('/auth/register', require('./routes/auth/register')())

    app.get('*', function (req, res) {
        res.status(404).sendFile(path.join(global.appRoot, 'views', '404.html'));
    })
}