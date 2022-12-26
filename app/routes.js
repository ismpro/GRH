const path = require('path');

module.exports = function (app, Mailing) {

    /* app.get('/', function (req, res) {
        res.status(200).send('<h1>Hello World</h1>');
    }) */

    //Funcoes
    app.get('/funcoes', require('../routes/funcoes/all')())
    app.get('/funcoes/:id', require('../routes/funcoes/byId')())

    //Candidatos
    app.get('/candidatos', require('../routes/candidato/all')())
    app.get('/candidatos/:id', require('../routes/candidato/byId')())
    app.post('/candidatos/create', require('../routes/candidato/create')())
    app.post('/candidatos/alterStatus', require('../routes/candidato/alterStatus')(Mailing))

    //Auth
    app.post('/auth/validate', require('../routes/auth/validate')())
    app.post('/auth/logout', require('../routes/auth/logout')())
    app.post('/auth/login', require('../routes/auth/login')())
    app.post('/auth/register', require('../routes/auth/register')())

    app.get('*', function (req, res) {
        res.status(404).send("404 Not Found");
    })
}