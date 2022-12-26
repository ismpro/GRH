/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
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
app.use(express.static('www'))

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
    store: MongoStore.create({ client: db.getClient(), dbName: "server", collectionName: "Sessions"})
}))

//Adding Routes
require('./app/routes.js')(app)

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