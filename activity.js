var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');
var component = require('./simple-component');

var ejs = require('ejs');
var jsonView = '<%= body %>';

// set up request body parsing
router.use(bodyParser.json({type:[
    "application/json",
    "application/vnd.hal+json",
    "application/vnd.siren+json",
    "application/vnd.collection+json"
    ]}));
router.use(bodyParser.urlencoded({extended:true}));

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// config activity object
var props = [
  'id',
  'activityType',
  'companyId',
  'accountId',
  'dataScheduled',
  'notes',
  'status',
  'dateCreated',
  'dateUpdated'
]
var reqd = ['activityType','companyId','status'];

/*
status MUST be one of:
- pending
- active
- suspended
- closed

activityType MUST be one of:
- email
- inperson
- phone
- letter
*/

/***************************************
 * handle request events
 ***************************************/
// home
router.get('/', function (req, res) {
  res.send('{"home" : "{"name":"activity", "rel" : "collection", href":"/activity/list/"}}\n');
})

// create
router.post('/', function(req,res) {
  processPost(req,res).then(function(body) {
    body = itemLinks(body);
    body = {activity:body};
    body = collectionLinks(body);
    res.send(JSON.stringify(body,null,2));
  }).catch(function(err) {
    res.send('{"error" : ' + JSON.stringify(err,null,2) + '}\n');
  });
});

// list
router.get('/list/', function(req, res) {
  processList(req,res).then(function(body) {
    body = itemLinks(body);
    body = {activity:body};
    body = collectionLinks(body);
    res.send(JSON.stringify(body,null,2));
  }).catch(function(err) {
    res.send('{"error" : ' + JSON.stringify(err,null,2) + '}\n');
  });
});

// filter
router.get('/filter/', function(req, res) {
  processFilter(req,res).then(function(body){
    body = itemLinks(body);
    body = {activity:body};
    body = collectionLinks(body);
    res.send(JSON.stringify(body,null,2));
  }).catch(function(err) {
    res.send('{"error" : ' + JSON.stringify(err,null,2) + '}\n');
  });
});

// read
router.get('/:activityId', function(req, res) {
  processItem(req,res).then(function(body){
    body = itemLinks(body);
    body = {activity:body};
    body = collectionLinks(body);
    res.send(JSON.stringify(body,null,2));
  }).catch(function(err) {
    res.send('{"error" : ' + JSON.stringify(err,null,2) + '}\n');
  });
});

// update
router.put('/:activityId', function(req, res) {
  processUpdate(req,res).then(function(body){
    body = itemLinks(body);
    body = {activity:body};
    body = collectionLinks(body);
    res.send(JSON.stringify(body,null,2));
  }).catch(function(err) {
    res.send('{"error" : ' + JSON.stringify(err,null,2) + '}\n');
  });
});

// delete
router.delete('/:activityId', function(req, res) {
  processDelete(req,res).then(function(body){
    body = itemLinks(body);
    body = {activity:body};
    body = collectionLinks(body);
    res.send(JSON.stringify(body,null,2));
  }).catch(function(err) {
    res.send('{"error" : ' + JSON.stringify(err,null,2) + '}\n');
  });
});

module.exports = router


// handle links for each item
function itemLinks(list) {
  list.forEach(item => {
    item.links = [];
    item.links[0] = {rel:"read",href:"/activity/" + item.id};
    item.links[1] = {
      rel:"update",href:"/activity/" + item.id,
      form: {
        method:"put",
        contentType:"application/x-www-form-urlencoded",
        properties:[
          {name:"activityId",value:item.id||""},
          {name:"actiityType",value:item.activityType||""},
          {name:"accountId",value:item.accountId||""},
          {name:"companyId",value:item.companyId||""},
          {name:"dateScheduled",value:item.dateScheduled||""},
          {name:"notes",value:item.notes||""},
          {name:"status",value:item.status||""}
        ]
      }
    };
    item.links[2] = {rel:"delete",href:"/activity/" + item.id,
      form: {
        method:"delete",
        properties:[]
      }
    };
  });
  return list;
}

// handle collection links
function collectionLinks(list) {
    list.links = [];
    list.links[0] = {rel:"list",href:"/activity/list"};
    list.links[1] = {rel:"filter",href:"/activity/filter",
      form: {
        method:"get",
        contentType:"application/x-www-form-urlencoded",
        properties:[
          {name:"actiityType",value:""},
          {name:"dateScheduled",value:""},
          {name:"status",value:""}
        ]
      }
    };
    list.links[2] = {rel:"add",href:"/activity/list",
      form: {
        method:"post",
        contentType:"application/x-www-form-urlencoded",
        properties: [
          {name:"actiityType",value:"email"},
          {name:"accountId",value:""},
          {name:"companyId",value:""},
          {name:"dateScheduled",value:""},
          {name:"notes",value:""},
          {name:"status",value:"pending"}
        ]
      }
    };
    list.links[3] = {rel:"home",href:"/activity/"};
    console.log(list);
  return list;
}

/****************************************
 * handle processing of request/responses
 ****************************************/

function processPost(req,res) {
  return new Promise(function(resolve,reject) {
    if(req.body) {
     var body = req.body;
     resolve(component({name:'activity',action:'add',item:body,props:props,reqd:reqd}));
    }
    else {
      reject({error:"invalid body"});
    }
  });
};

function processList(req,res) {
  return new Promise(function(resolve,reject) {
    resolve(component({name:'activity',action:'list'}));
  });
}

function processFilter(req,res) {
  return new Promise(function(resolve,reject){
    if(req.query && req.query.length!==0) {
      resolve(component({name:'activity',action:'filter',filter:req.query}));
    }
    else {
      reject({error:"invalid query string"});
    }
  })
}

function processItem(req,res) {
  return new Promise(function(resolve,reject){
    if(req.params.activityId && req.params.activityId!==null) {
      var id = req.params.activityId;
      resolve(component({name:'activity',action:'item',id:id}));
    } 
    else {
      reject({error:"missing id"});
    }
  });
}

function processUpdate(req,res) {
  var id,body;
  return new Promise(function(resolve,reject){
    id = req.params.activityId||null;
    body = req.body||null;
    if(id!==null && body!==null) {
       resolve(component(
         {name:'activity',
          action:'update',
          id:id,
          item:body,
          props:props,
          reqd:reqd}));
     }
     else {
       reject({error:"missing id and/or body"});
     }
  });
}

function processDelete(req,res) {
  return new Promise(function(resolve,reject){
    if(req.params.activityId && req.params.activityId!==null) {
      var id = req.params.activityId;
      resolve(component({name:'activity',action:'delete', id:id}));
    }
    else {
      reject({error:"invalid id"});
    }
  });
}
