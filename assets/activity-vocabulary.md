## Activity API Vocabulary

### Actions

 * createActivity
   * activityType(r), companyId(r)(e), accountId, status(r)(e), notes, dateScheduled
 * updateActivity
   * id, activityType(r)(e), companyId(r), accountId, status(r)(e), notes, dateScheduled
 * closeActivity
   * id, notes 
 * statusActivity
   * id, status(r)(e)
 * listActivities
   * (none)
 * getActivity
   * id
 * filterActiities
   * activityType, status, companyId, accountId

### Properties

* id
* activityType (r)(e)
* companyId (r)
* accountId
* dataScheduled
* notes
* status (r)(e)
* dateCreated
* dateUpdated 

Valid _activityType_ values are:
- email
- inperson
- phone
- letter

Valid _status_ values are:
 - suspended
 - pending
 - active
 - closed


