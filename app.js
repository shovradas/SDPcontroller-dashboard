'use strict';

const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const session = require('express-session');

// routers
const router = require('./route');
const middleware = require('./middleware');
const config = require('./config');

const app = express();

//  middleware
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(path.join(__dirname, '/node_modules/jszip-sync/dist/')));
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(morgan('tiny'));
app.use(session({secret: 'mysecret'}));
app.use('*', middleware.authenticate);
app.use('/', router);

// app settings
app.set('views', [
    path.join(__dirname, 'views'),
    path.join(__dirname, 'views/user'),
    path.join(__dirname, 'views/service')
]);
app.set('view engine', 'ejs');

var server = app.listen(config.serverPort, config.serverHost, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log(`Controller dashboard at http://${host}:${port}`);
});