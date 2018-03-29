//server/server.js
var express = require('express');
var router = require('./routes/routes.js')
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var axios = require('axios');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

var json = 0;

axios.get("fermi.json")
    .then(response => {
        console.log("Json retrieved");
        json = response;
    })
    .catch(error => {
        console.log(error);
    });

mongoose.connect(json.dbURI);

app.use('/', router);

module.exports=app;
