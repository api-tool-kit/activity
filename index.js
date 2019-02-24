/*****************************************
 * activity service for BigCo, Inc.
 * 2019-01 mamund
 *****************************************/
 
var express = require('express');
var app = express();
var activity = require('./activity');
var port = process.env.PORT || 8686;
 
app.use('/activity',activity);
app.listen(port, () => console.log(`activity svc listening on port ${port}!`));
