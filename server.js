
//Server code - ExpressJS, Mongoose
const express = require('express');
const bodyParser = require('body-parser'); // we'll use body-parser extensively

const app = express();

app.use(bodyParser.json()) // application/json
app.use(bodyParser.urlencoded({ extended: true })) // application/x-www-form-urlencoded

const dbConnect = require('./config/connect'); 
const mongoose = require('mongoose');
const List  = require('./app/listmodel');
const { create, findAll } = require('./app/listcontrollers');
const res = require('express/lib/response');

mongoose.connect(dbConnect.database.url);
const db = mongoose.connection;
db.once('open', () => console.log('Connected to Database'));

require('./app/listroutes.js')(app);

const port = 3000;

app.listen(port, () => {
    console.log("Started server");
    console.log(new Date());
});

