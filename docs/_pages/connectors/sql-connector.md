---
title : SQL Connector
area : connectors
order : 500
seealso:
  - title: "SQL Connector Github Repo"
    link: "https://github.com/FlexSearch/SqlConnector"
  - title: "SQL Connector sample file"
    link: "https://github.com/FlexSearch/SqlConnector/blob/master/src/SqlConnector.Tests/Sample.fs"
  - title: "SQL API Reference"
    link: "/docs/rest/api-reference#sql"
  - title: "SqlIndexingRequest API Reference"
    link: "/docs/rest/api-reference#sqlIndexingRequest"
---
### Summary

The [SQL Connector] is nothing more than a FlexSearch plugin. It allows users to import data into a FlexSearch index from a SQL database by `POST`-ing a request to a specific endpoint.

### Request object

You can find the [SqlIndexingRequest] request object in the [Reference] section of the REST API.

#### Important Notes:

* The connection string should be in a supported .NET format. Example:  
   `data source=<server_name>;initial catalog=<db_name>;Integrated Security=True`

* The query is a `SQL SELECT` statement in which the names of the columns should match the names of the index fields. Also, a very important note is that **the first column acts as a unique identifier for the document within the index**.

### Endpoint

Assuming you want to import data into the `contact` index, you would need to `POST` a `SqlIndexingRequest` to the following endpoint:
```
<flexsearch_url_with_port_no>/indices/contact/sql
```

### Example

Please have a look at the [sample file] from the [SQL Connector] repository. It shows how to create the client, instantiate a request, send the request to FlexSearch, then check the status of that request.


[SQL Connector]: https://github.com/FlexSearch/SqlConnector
[sample file]: https://github.com/FlexSearch/SqlConnector/blob/master/src/SqlConnector.Tests/Sample.fs
[Reference]: /docs/rest/api-reference#sqlIndexingRequest
[SqlIndexingRequest]: /docs/rest/api-reference#sqlIndexingRequest
