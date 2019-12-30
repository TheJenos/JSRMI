const express = require('express');
const path = require('path');
const jsrmi = require('./index');
const app = express();

app.set('controllers', path.join(__dirname, '/controllers'))

app.use("/",express.static(__dirname + '/views'));
app.use("/js",express.static(__dirname + '/Js'));

jsrmi.route(app);

app.listen(8080, () => {
    console.log(`Test Server http://localhost:8080/`);
});