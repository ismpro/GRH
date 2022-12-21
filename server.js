/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('./app/logger.js');
const helmet = require('helmet');
const chalk = require('chalk');

console.clear()
console.log(chalk.green('\n  Starting server'));

//Config
const app = express()
dotenv.config()

//Some varibles
app.set("port", process.env.PORT || 3001);
app.set("pin", process.env.PIN || 1234);
global.appRoot = path.resolve(__dirname);
global.NODE_MODE = Boolean(process.env.NODE_DEV === 'true');
console.log(chalk.green(`  Node Mode: ${(global.NODE_MODE ? 'DEV' : 'PRD')}`));

//Disabling things for security
app.disable('x-powered-by');
app.use(helmet())

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

//Serving statics files
app.use(express.static('public'))

//Setting up cookies parser
app.use(cookieParser())

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
    }
}))

//Logger
app.use(logger());

//Adding Routes
require('./app/routes.js')(app)

//Handling erros inside of server
app.use(function (err, req, res) {
    res.status(500).send('Something broke!')
})

//Starting to listen to requests
var server = app.listen(app.get('port'),
    () => {
        console.log(chalk.green(`\n  Server Listing on: ${server.address().address === '::' ? 'localhost' : server.address().address}:${server.address().port}`))
    })