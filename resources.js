/*****************************************
 * acitivty service for BigCo, Inc.
 * 2019-01 mamund
 *****************************************/

var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');

var actions = require('./actions');
var properties = require('./properties');
var utils = require('./dorr-utils');


// set up request body parsing
router.use(bodyParser.json({type:properties.responseTypes}));
router.use(bodyParser.urlencoded({extended:properties.urlencoded}));

//set up response body templates
var templates = properties.templates;
var object = "activity";

// tracking middleware
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now() + " : " + req.headers.host + req.url)
  next()
})

// output headers
router.use(function emitCORS (req, res, next) {
  if(properties.allowCORS && properties.allowCORS !== "") {
    res.set("Access-Control-Allow-Methods", properties.allowCORS);
  }  
  next()
})

// the actions/capabilities of this service API
router.get('/',function(req,res){
  utils.handler(req,res,actions.home,"home", templates)
});

router.post('/', function(req,res){
  utils.handler(req,res,actions.create,object, templates)
});

router.get('/list/',function(req,res){
  utils.handler(req,res,actions.list,object, templates)
});

router.get('/filter/', function(req,res){
  utils.handler(req,res,actions.filter,object, templates)
});

router.get('/:activityId', function(req,res){
  utils.handler(req,res,actions.read,object, templates)
});

router.put('/:activityId', function(req,res){
  utils.handler(req,res,actions.update,object, templates)
});

router.patch('/status/:activityId', function(req,res){
  utils.handler(req,res,actions.status,object, templates)
});

router.post('/close/:activityId', function(req,res){
  utils.handler(req,res,actions.close,object, templates)
});

// publish the capability routes
module.exports = router


