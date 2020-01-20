// ****************************************
// bigco, inc
// data elements for activity
// properties, requireds, and enums
// 2020-02-01 : mamund
// ****************************************

// this service's message properties
exports.props = [
  'id',
  'companyId',
  'accountId',
  'activityType',
  'dateScheduled',
  'notes',
  'status',
  'dateCreated',
  'dateUpdated'
];

// required properties
exports.reqd = ['id','companyId','activityType','status'];

// enumerated properties
exports.enums = [
  {status:['pending','active','suspended','closed']},
  {activityType:['email','inperson','phone','letter']}
];

exports.defs = [
  {name:"activityType", value:"email"},
  {name:"status",value:"active"}
]

