---
title : CSV Connector
area : connectors
order : 200
seealso :
  - title: CSV Connector Github Repo
    link: "https://github.com/FlexSearch/CsvConnector"
  - title: Sample Usage
    link: "https://github.com/FlexSearch/CsvConnector/blob/master/src/CsvConnector.Tests/Sample.fs"
  - title: CSV API reference
    link: "/docs/rest/api-reference#csv"
  - title: CsvIndexingRequest API reference
    link: "/docs/rest/api-reference#csvIndexingRequest"
---
### Summary

The [CSV Connector] is nothing more than a FlexSearch plugin. It allows users to import data into a FlexSearch index from a CSV file or folder by `POST`-ing a request to a specific endpoint.

### Request object

You can find the [CsvIndexingRequest] request object in the [Reference] section of the REST API.

#### Important Notes:

* The `Path` parameter supports passing either a folder or a .csv file. If a folder is passed, then all files with a *.csv extension will be processed.

* If the `HasHeaderRecord` parameter is set to `False`, then the `Headers` parameter **MUST** be specified.  
    If the `HasHeaderRecord` parameter is set to `True`, then the `Headers` parameter will be ignored.

* **The first column in the CSV file will be taken as the index ID**. Therefore, make sure that you offset your column names by 1 in the `Headers` array.


### Endpoint

Assuming you want to import data into the `contact` index, you would need to `POST` a `CsvIndexingRequest` to the following endpoint:
```
<flexsearch_url_with_port_no>/indices/contact/csv
```

### Example

Please have a look at the [sample file] from the [CSV Connector] repository. It shows how to create the client, instantiate a request, send the request to FlexSearch, then check the status of that request.


[CSV Connector]: https://github.com/FlexSearch/CsvConnector
[sample file]: https://github.com/FlexSearch/CsvConnector/blob/master/src/CsvConnector.Tests/Sample.fs
[Reference]: /docs/rest/api-reference#csvIndexingRequest
[CsvIndexingRequest]: /docs/rest/api-reference#csvIndexingRequest
