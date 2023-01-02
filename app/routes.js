const path = require('path');

module.exports = function (app, Mailing) {

    app.get('/', function (req, res) {
        res.status(200).send('<h1>Hello World</h1>');
    })

    app.get('/candidatura', function (req, res) {
        res.status(200).sendFile(path.join(global.appRoot, "www", "candidatura.html"));
    })

    //Testes
    app.get('/testes', require('../routes/testes/all')())
    app.get('/teste', require('../routes/testes/get')())
    app.post('/testes', require('../routes/testes/submit')())
    app.post('/testes/cancel', require('../routes/testes/cancel')())

    //Entrevistas
    app.get('/entrevistas', require('../routes/entrevista/all')())
    app.post('/entrevistas', require('../routes/entrevista/submit')())
    app.post('/entrevistas/cancel', require('../routes/entrevista/cancel')())

    //Funcoes
    app.get('/funcoes', require('../routes/funcoes/all')())
    app.get('/funcoes/:id', require('../routes/funcoes/byId')())

    //Vagas
    app.get('/vagas', require('../routes/vagas/all')())
    app.get('/vagas/:id', require('../routes/vagas/byId')())
    app.post('/vagas/create', require('../routes/vagas/create')())

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