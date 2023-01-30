/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
console.clear();
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('./app/logger.js');
const helmet = require('helmet');
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const chalk = require('chalk');
const morgan = require('morgan');
const Mailing = require("./app/Mailing");

console.clear()
console.log(chalk.green('\n  Starting server'));

//Config
const app = express()

//Some varibles
app.set("port", process.env.PORT || 3001);
app.set("pin", process.env.PIN || 1234);
global.appRoot = path.resolve(__dirname);
global.NODE_MODE = Boolean(process.env.NODE_DEV === 'true');
console.log(chalk.green(`  Node Mode: ${(global.NODE_MODE ? 'DEV' : 'PRD')}`));

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//Mail
/* (async function gg() {
    try {
        await Mailing.sendEmail({email: "ismaelourenco@msn.com", template: "test"});
    } catch (error) {
        console.log(error)
    }
}()) */

//Disabling things for security
app.disable('x-powered-by');
//app.use(helmet())

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

//Setting up cookies parser
app.use(cookieParser())

//Logger
//app.use(logger());
app.use(morgan("dev"))


//Serving statics files
//app.use(express.static(path.join(__dirname, 'www')));
//Para não servir os html diretamente
app.use('/images', express.static(path.join(__dirname, 'www', 'images')));
app.use('/styles', express.static(path.join(__dirname, 'www', 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'www', 'scripts')));

//Setting Sessions
app.use(session({
    name: 'sid',
    resave: true,
    saveUninitialized: false,
    secret: process.env.SECRET || 'secretstring',
    cookie: {
        maxAge: 3600000,
        sameSite: 'lax',
        secure: false
    },
    store: MongoStore.create({ client: db.getClient(), dbName: "server", collectionName: "Sessions" })
}))

//Adding Routes
require('./app/routes.js')(app, Mailing)

//Handling erros inside of server
app.use(function (err, req, res) {
    res.status(500).send('Something broke!')
})

//Starting to listen to requests
db.once('open', function () {
    console.log(chalk.green('\n  MongoDB Connected'));
    var server = app.listen(app.get('port'),
        () => {
            console.log(chalk.green(`\n  Server Listing on: ${server.address().address === '::' ? 'localhost' : server.address().address}:${server.address().port}`))
        })

    /* const entrevista = require("./models/Entrevista")

    let ent = new entrevista();

    ent.candidato = "63a9cdf5e24b1409eff7e3c6";
    ent.date = new Date(2023, 1,25,16,30);
    ent.local = "Lisboa";
    ent.notes = "";
    ent.status = "undone";

    ent.save(); */

    /* 
        const can = require("./models/Candidato")

        let candidato1 = new can({
        nome: "Bruno Russo",
        type: "Externo",
        vaga: "63a9ccd6e7f2a6c2bdc34539",
        status: "triagem"
    });

    let candidato2 = new can({
        nome: "Alexandre Olivetree",
        type: "Interno",
        vaga: "63a9ccd6e7f2a6c2bdc34539",
        status: "triagem"
    });

    candidato1.save()
    candidato2.save() */

    /*  nome: String,
   endereco: String,
   email: String,
   telefone: String,
   dataNascimento: Date,
   genero: String,
   escolaridade: String,
   experienciaProfissional: String,
   habilidades: [String],
   pretensaoSalarial: Number,
   type: {
     type: String,
     enum: ['Interno', 'Externo'],
     default: 'Externo'
   },
   status: {
     type: String,
     enum: ['aprovado', 'reprovado','triagem', 'teste', 'decisao'],
     default: 'created'
   } */
});