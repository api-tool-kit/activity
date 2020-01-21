/*****************************************
// bigco, inc activity
// transitions
// 2020-02-01 : mamund
 *****************************************/
 
 // page- and item-level forms
 exports.forms = {
   pageForms: [
     {
       id:"self",
       name:"self",
       href:"{fullurl}",
       rel: "self colllection activity",
       tags: "collection activity self home list item",
       title: "Self",
       method: "GET",
       properties:[]
     },
     {
       id:"home",
       name:"home",
       href:"{fullhost}/",
       rel: "collection activity",
       tags: "collection activity home list item",
       title: "Home",
       method: "GET",
       properties:[]
     },
     {
       id:"list",
       name:"list",
       href:"{fullhost}/list/",
       rel:"collection activity",
       tags:"collection activity home list item",
       title:"List",
       method:"GET",
       properties:[]
     },
     {
       id:"filter",
       name:"filter",
       href:"{fullhost}/filter/",
       rel:"collection activity filter",
       tags:"collection activity filter list item",
       title:"Search",
       method:"GET",
       properties:[
         {name:"activityType",value:""},
         {name:"companyId",value:""},
         {name:"accountId",value:""},
         {name:"status",value:""}
       ]
     },
     {
       id: "createActivity",
       name: "create",
       href: "{fullhost}/",
       rel: "create-form activity",
       tags: "collection activity list",
       title: "Create Activity",
       method: "POST",
       properties: [
        {name:"id",value:"{makeid}"},
        {name:"companyId",value:""},
        {name:"accountId",value:""},
        {name:"activityType",value:""},
        {name:"dateScheduled",value:""},
        {name:"notes",value:""},
        {name:"status",value:"pending"}
       ]
     }
   ],
   itemForms: [
     {
       id:"read_{id}",
       name: "read",
       href: "{fullhost}/{id}",
       rel: "item activity read",
       title: "Read",
       method: "GET",
       properties: []
     },
     {
       id:"update_{id}",
       name:"update",
       href:"{fullhost}/{id}",
       rel: "item edit-form activity",
       tags: "activity list item",
       title: "Edit",
       method: "PUT",
       properties: [
         {name:"id",value:"{id}"},
         {name:"companyId",value:"{companyId}"},
         {name:"accountId",value:"{accountId}"},
         {name:"activityType",value:"{activityType}"},
         {name:"dateScheduled",value:"{dateScheduled}"},
         {name:"notes",value:"{notes}"},
         {name:"status",value:"{status}"}
       ]
     },
     {
       id:"status_{id}",
       name:"status",
       href:"{fullhost}/status/{id}",
       rel: "item activity status",
       tags: "activity item list status",
       title: "Status",
       method: "PATCH",
       properties: [
         {name:"status",value:"{status}"}
       ]
     },
     {
       id:"close_{id}",
       name:"close",
       href:"{fullhost}/close/{id}",
       rel: "item activity limits",
       tags: "activigty item list close",
       title: "Close",
       method: "PATCH",
       properties: [
         {name:"status",value:"closed"}
       ]
     }
   ]
 }
