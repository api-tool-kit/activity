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
  "application/json",
  "text/csv"
];
exports.urlencoded = true;

exports.allowCORS = "GET POST PUT DELETE PATCH OPTIONS HEAD";

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
    format: "text/csv",
    view: 
    `<%var y=0;%><%for(var p in rtn[0]){%><%if(y!==0){%>,<%}%>"<%=p%>"<%y=1;%><%}%>
<%rtn.forEach(function(item){%><%var y=0;%><%for(var p in item){%><%if(y!==0){%>,<%}%>"<%=item[p]%>"<%y=1;%><%}%>
<%});%>`
  }
]
