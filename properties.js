/*****************************************
 * activity properties for BigCo, Inc.
 * 2019-01 mamund
 *****************************************/

// config message properties
exports.props = [
  'id',
  'activityType',
  'companyId',
  'accountId',
  'dateScheduled',
  'notes',
  'status',
  'dateCreated',
  'dateUpdated'
];

exports.reqd = ['activityType','companyId','status'];
exports.enums = [
  {status:['pending','active','suspended','closed']},
  {activityType:['email','inperson','phone','letter']}
];

// config response/request types
exports.responseTypes = [
  "application/links+json",
  "application/json",
  "text/csv"
];
exports.urlencoded = true;
exports.allowCORS = "GET POST PUT DELETE PATCH OPTIONS HEAD";

exports.links = [
 {name:"home", href:"/"},
 {name:"collection", href:"/list/"},
 {name:"search", href:"/filter/"}
];

exports.pageForms = [
  {name:"home", href:"/", method:"get", properties:[]},
  {name:"collection", href: "/list/", method:"get", properties:[]},
  {name:"search", href:"/filter/", method:"get", properties:[]}
];

// ****************************************
// DORR REPRESENTATION
// response templates
// one for each media type format
// ****************************************
exports.templates = [
  { 
    format : "application/json", 
    view : 
    `
      { 
          "<%=type%>" : 
          [
            <%var x=0;%>
            <%rtn.forEach(function(item){%>
              <%if(x!==0){%>,<%}%>
              {
                <%var y=0;%>
                <%for(var p in item){%>
                  <%if(y!==0){%>,<%}%>"<%=p%>" : "<%=item[p]%>"
                  <%y=1;%>
                <%}%>
              }
              <%x=1;%>
            <%});%>
          ]
       }
    `
  },
  { 
    format : "application/links+json", 
    view : 
    `
      { 
          "<%=type%>" : 
          { 
            "links" : 
            [
              <%var z=0;%>
              <%links.forEach(function(link){%>
                <%if(z!==0){%>,<%}%>
                {
                  <%var w=0;%>
                  <%for(var p in link){%>
                    <%if(w!==0){%>,<%}%>"<%=p%>" : "<%=link[p]%>"
                    <%w=1;%>
                  <%}%>  
                }
                <%z=1;%>
              <%});%>
            ],
            "items" : 
            [
              <%var x=0;%>
              <%rtn.forEach(function(item){%>
                <%if(x!==0){%>,<%}%>
                {
                  <%var y=0;%>
                  <%for(var p in item){%>
                    <%if(p==="id"){%>
                    "links" : [
                      {"name" : "item", "href" : "/<%=item[p]%>"},
                      {"name" : "edit", "href" : "/<%=item[p]%>"},
                      {"name" : "status", "href" : "/<%=item[p]%>"},
                      {"name" : "close", "href" : "/<%=item[p]%>"}
                    ]
                    <%y=1;%><%}%>
                    <%if(y!==0){%>,<%}%>"<%=p%>" : "<%=item[p]%>"
                    <%y=1;%>
                  <%}%>
                }
                <%x=1;%>
              <%});%>
            ]
          }
       }
    `
  },
  { 
    format : "application/forms+json", 
    view : 
    `
      { 
          "<%=type%>" : 
          { 
            "forms" : 
            [
              <%var z=0;%>
              <%pForms.forEach(function(form){%>
                <%if(z!==0){%>,<%}%>
                {
                  <%var w=0;%>
                  <%for(var p in form){%>
                    <%if(w!==0){%>,<%}%>"<%=p%>" : <%if(Array.isArray(form[p])){%>[]<%}else{%>"<%=form[p]%>"<%}%>
                    <%w=1;%>
                  <%}%>  
                }
                <%z=1;%>
              <%});%>
            ],
            "items" : 
            [
              <%var x=0;%>
              <%rtn.forEach(function(item){%>
                <%if(x!==0){%>,<%}%>
                {
                  <%var y=0;%>
                  <%for(var p in item){%>
                    <%if(p==="id"){%>
                    "forms" : [
                      {"name" : "item", "href" : "/<%=item[p]%>"},
                      {"name" : "edit", "href" : "/<%=item[p]%>"},
                      {"name" : "status", "href" : "/<%=item[p]%>"},
                      {"name" : "close", "href" : "/<%=item[p]%>"}
                    ]
                    <%y=1;%><%}%>
                    <%if(y!==0){%>,<%}%>"<%=p%>" : "<%=item[p]%>"
                    <%y=1;%>
                  <%}%>
                }
                <%x=1;%>
              <%});%>
            ]
          }
       }
    `
  },
  {
    format: "text/csv",
    view: 
    `<%var y=0;%><%for(var p in rtn[0]){%><%if(y!==0){%>,<%}%>"<%=p%>"<%y=1;%><%}%>
<%rtn.forEach(function(item){%><%var y=0;%><%for(var p in item){%><%if(y!==0){%>,<%}%>"<%=item[p]%>"<%y=1;%><%}%>
<%});%>`
  }
]
