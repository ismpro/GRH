const path = require('path');
const fs = require('fs');
const User = require('../models/User');

const redirectNonManager = async (req, res, next) => {
    if (req.session.userid) {
        let user = await User.findById(req.session.userid);

        if (user && user.atribuitesessionid === req.session.sessionId && user.type === 'manager') {
            next();
        } else {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
};

const redirectHome = async (req, res, next) => {
    if (req.session.userid) {
        let user = await User.findById(req.session.userid);

        if (user && user.atribuitesessionid === req.session.sessionId) {
            res.redirect("/");
        } else {
            next();
        }
    } else {
        next();
    }
};

module.exports = function (app, Mailing) {

    app.get("/", function (req, res) {
        if (req.session.userid) {
            User.findById(req.session.userid, (err, user) => {
                if (err) {
                    res.status(500).send(err.message)
                } else {
                    if (user && user.type === "manager") {
                        res.status(200).sendFile(path.join(global.appRoot, "www", `dashboard.html`));
                    } else {
                        res.status(200).sendFile(path.join(global.appRoot, "www", `index.html`));
                    }
                }
            })
        } else {
            res.status(200).sendFile(path.join(global.appRoot, "www", `index.html`));
        }
    });

    app.get("/dashboard", function (req, res, next) {
        res.redirect("/");
    });

    app.get("/login", redirectHome, function (req, res, next) {
        res.status(200).sendFile(path.join(global.appRoot, "www", `login.html`));
    });

    app.get("/nova_candidatura", function (req, res, next) {
        res.status(200).sendFile(path.join(global.appRoot, "www", `nova_candidatura.html`));
    });

    app.get('/stats', require('../routes/stats')())

    //Testes
    app.get('/testes/all', require('../routes/testes/all')())
    app.get('/teste', require('../routes/testes/get')())
    app.post('/testes', require('../routes/testes/submit')())
    app.post('/testes/cancel', require('../routes/testes/cancel')())

    //Entrevistas
    app.get('/entrevistas', require('../routes/entrevista/all')())
    app.post('/entrevistas', require('../routes/entrevista/submit')())
    app.post('/entrevistas/cancel', require('../routes/entrevista/cancel')())

    //Vagas
    app.get('/vagas/all', require('../routes/vagas/all')())
    app.get('/vagas/:id', require('../routes/vagas/byId')())
    app.post('/vagas/create', require('../routes/vagas/create')())

    //Candidatos
    app.get('/candidatos', require('../routes/candidato/all')())
    app.post('/candidatos/create', require('../routes/candidato/create')())
    app.post('/candidatos/alterStatus', require('../routes/candidato/alterStatus')(Mailing))

    //Auth
    app.post('/auth/validate', require('../routes/auth/validate')())
    app.post('/auth/logout', require('../routes/auth/logout')())
    app.post('/auth/login', require('../routes/auth/login')())
    app.post('/auth/register', require('../routes/auth/register')())

    app.get("/*", redirectNonManager, function (req, res, next) {
        if (fs.existsSync(path.join(global.appRoot, "www", `${req.path.slice(1)}.html`))) {
            res.status(200).sendFile(path.join(global.appRoot, "www", `${req.path.slice(1)}.html`));
        } else {
            next();
        }
    });

    app.get('*', function (req, res) {
        res.status(404).send("404 Not Found");
    })
}