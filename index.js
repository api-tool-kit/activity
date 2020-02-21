/*****************************************
<<<<<<< HEAD
// bigco, inc activity
// root of the service API
// 2020-02-01 : mamund
=======
 * account service for BigCo, Inc.
 * 2019-01 mamund
>>>>>>> 8a57f003db37321d4aef320b5710f207c938148c
 *****************************************/
 
var express = require('express');
var app = express();
<<<<<<< HEAD
var cors = require('cors');

var resources = require('./darrt/resources');
var port = process.env.PORT || 8686;

// support calls from JS in browser
app.use(cors());
app.options('*',cors()); 

// point to exposed resources for this API
app.use('/',resources); 

// start listening for requests
app.listen(port, () => console.log(`listening on port ${port}!`));
=======
var account = require('./account');
var port = process.env.PORT || 8282;
 
app.use('/account',account);
app.listen(port, () => console.log(`account svc listening on port ${port}!`));
>>>>>>> 8a57f003db37321d4aef320b5710f207c938148c
