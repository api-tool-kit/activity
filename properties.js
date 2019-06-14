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

exports.pageLinks = [
 {name:"home", href:"/"},
 {name:"collection", href:"/list/"},
 {name:"search", href:"/filter/"},
 {name:"create", href:"/"}
];

exports.itemLinks = [
  {"name" : "item", "href" : "/<%=item[p]%>"},
  {"name" : "edit", "href" : "/<%=item[p]%>"},
  {"name" : "status", "href" : "/<%=item[p]%>"},
  {"name" : "close", "href" : "/<%=item[p]%>"}
];

exports.pageForms = [
  {name:"home", href:"/", method:"get", properties:[]},
  {name:"collection", href: "/list/", method:"get", properties:[]},
  {name:"search", href:"/filter/", method:"get", 
    properties:[
      {name:"activityType", value:""},
      {name:"companyId", value:""},
      {name:"accountId", value:""},
      {name:"status", value:""}
  ]},
  {name:"create", href:"/", method:"post", 
    properties:[
      {name:"activityType", value:"email"},
      {name:"companyId", value:""},
      {name:"accountId", value:""},
      {name:"dateScheduled", value:""},
      {name:"notes", value:""},
      {name:"status", value:"pending"}
  ]}
];

exports.itemForms = [
  {name:"item", href:"/<%-item.id%>", method:"get", properties:[]},
  {name:"edit", href:"/<%-item.id%>", method:"put",
    properties:[
      {name:"activityType", value:""},
      {name:"companyId", value:""},
      {name:"accountId", value:""},
      {name:"dateScheduled", value:""},
      {name:"notes", value:""},
      {name:"status", value:"pending"}
  ]},
  {name:"status", href:"/<%=item[p]%>", method:"patch", properties:[
      {name:"status", value:""}
  ]},
  {name:"close", href:"/<%=item[p]%>", method:"post", properties:[
      {name:"notes", value:""},
      {name:"status", value:"pending"}
  ]}
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
              <%pLinks.forEach(function(link){%>
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
                    <%if(w!==0){%>,<%}%>"<%=p%>" : <%if(Array.isArray(form[p])){%>
	              [
	              <%var a=0;%>
		      <%form[p].forEach(function(prop){%>
	                <%if(a!==0){%>,<%}%>
			{
			  <%var b=0;%>
			  <%for(var pr in prop){%>
			    <%if(b!==0){%>,<%}%>"<%=pr%>" : "<%=prop[pr]%>"
			    <%b=1;%>
			  <%}%>
			}
		      <%});%>
		      ]	      
	            <%}else{%>"<%=form[p]%>"<%}%>
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

                  <%var q=0;%>
                  <%iForms.forEach(function(form){%>
                    <%if(q!==0){%>,<%}%>
                    {
                      <%var r=0;%>
                      <%for(var p in form){%>
                        <%if(r!==0){%>,<%}%>"<%=p%>" : <%if(Array.isArray(form[p])){%><%-JSON.stringify(form[p])%><%}else{%>"<%=form[p]%>"<%}%>
                        <%r=1;%>
                      <%}%>  
                    }
                    <%q=1;%>
                  <%});%>
                
                  <%var y=0;%>
                  <%for(var p in item){%>
                    <%if(p==="id"){%>
                    "forms" : [
                      {"name" : "item", "href" : "/<%=item[p]%>", "method":"get","properties":[]},
                      {"name" : "edit", "href" : "/<%=item[p]%>", "method":"put","properties":[]},
                      {"name" : "status", "href" : "/<%=item[p]%>", "method":"patch","properties":[]},
                      {"name" : "close", "href" : "/<%=item[p]%>", "method":"post","properties":[]}
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
