'use strict';

const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const session = require('express-session');

// routers
const router = require('./route');
const middleware = require('./middleware');

const app = express();

//  middleware
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
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

const host = "192.168.31.31";
const port = 8000;
var server = app.listen(port, host, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log(`Controller dashboard at http://${host}:${port}`);
});