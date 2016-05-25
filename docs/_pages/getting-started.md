---
title : Getting Started
area : quick-start
order : 200
---

The below guide will walk you through the steps involved in installing FlexSearch and utilising basic capabilities like indexing and searching.

### Install FlexSearch

::: info
#### Requirements

* .net Runtime Environment version 4.6 or higher
* Windows 7, Windows 2008 R2 or higher
* Ram : 4GB minimum / 8GB recommended
* CPU : Dual Core CPU (minimum) / Quad Core CPU (recommended)

:::

<div class="page-break"></div>
<div class="card text-xs-center">
  <div class="card-header">
    <h3>5 minute install</h3>
  </div>
  <div class="card-block">
    <a class="btn btn-primary" href="https://github.com/flexsearch/flexsearch/releases">Download FlexSearch Package</a>
  </div>
   <ul class="list-group list-group-flush text-xs-left">
        <li class="list-group-item">Extract <code>FlexSearch.&lt;version_number&gt;.zip</code> into a folder (root of drive recommended, assume <code>C:\flexsearch</code>).</li>
        <li class="list-group-item">Start the server by executing <code>FlexSearch-Server.exe</code></li>
        <li class="list-group-item">
        <h4>Install as a service (optional)</h4>
        <p>
From an elevated command prompt (administrator mode) @<code>C:\FlexSearch</code> run:
<pre><code>&gt; FlexSearch-Server.exe --install</code></pre>
<pre><code>&gt; FlexSearch-Server.exe --start</code></pre>
This installs FlexSearch as a service, then starts the service.</p></li>
    </ul>
</div>

::: info
#### Viewing Logs
Once configured successfully you can access the logs from Event Viewer.

![Event Viewer](/assets/img/docs/event-viewer.png)
:::

::: info
#### Accessing Portal
Navigate to http://localhost:9800/.
:::

### Creating an index
::: info
Follow along the below tutorial by using your favourite HTTP request command tool like `Fiddler`, `Curl`, `Postman` etc.
:::

Let's start with a simple example of creating an index with the below information. Index field name represents the name that will be used to represent the field in the index. Field name should be lowercase and should not contain any special characters. The type of field represents the type of value we intend to save in the field to save in the field. Text field is a general-purpose field which can be used to save any kind of data which needs to be tokenized. By tokenization we refer to the process of breaking the input text into smaller tokens. For example a whitespace tokenizer will break the input text at white spaces.

Keyword field is used to represent a piece of information which should not be tokenized, fields like identifiers, constants etc where tokenization doesn't make any sense.

Field Name | Index Field Name | Type
-|-|-
Employee ID | `employeeId` | `Keyword`
First Name | `firstname` | `Text`
Last Name | `lastname`  | `Text`
Date of Birth | `dob` | `Date`

Fire up your favourite HTTP request generation tool and make the below request. FlexSearch follows a simple mapping convention to define the rest endpoints. 

::: info
Refer to the API basics guide to know more about the convention.
:::

Here we are trying to create an index which is hosted on `indices` endpoint. According to a convention creation maps to `POST`web request. There are few other properties that can be defined for a specific field. The below only represents the bare minimum information that is required to create an index. `Text` is the default file type so we don't have to specify it for first name and last name fields.

```http
POST http://localhost:9800/indices HTTP/1.1
Content-Type: application/json; charset=utf-8

{
  "indexName": "contact",
  "fields": [
    {
      "fieldName": "employeeid",
      "fieldType": "Keyword",
    },
    {
      "fieldName": "firstname"
    },
    {
      "fieldName": "lastname",
    },
    {
      "fieldName": "dob",
      "fieldType": "DateTime",
    }
  ]
}
```
Executing the above request will give you the below response. There are a few interesting things about this response:

* The response returned with a HTTP code of 201 which stands for created. This is one of the many cases where FlexSearch tries to follow the correct HTTP codes.

* The returned response object has two parts data and error. These two parts are always returned as part of FlexSearch response. In this case there is no error so the server returned now for the error property.

```http
HTTP/1.1 201 Created
Transfer-Encoding: chunked
Content-Type: application/json
Server: Kestrel

{
  "data": true,
  "error": null
}
```

### Retrieving Index information
In order to retrieve information about an existing index, execute the below HTTP request:

```http
GET http://localhost:9800/indices/contact HTTP/1.1
```

```http
HTTP/1.1 200 OK
Date: Sun, 08 May 2016 14:35:08 GMT
Transfer-Encoding: chunked
Content-Type: application/json
Server: Kestrel

{
   "data":{
      "indexName":"contact",
      "fields":[
         {
            "allowSort":false,
            "fieldName":"employeeid",
            "fieldType":"Keyword",
            "indexAnalyzer":"standard",
            "searchAnalyzer":"standard",
            "similarity":"TFIDF"
         },
         {
            "allowSort":false,
            "fieldName":"firstname",
            "fieldType":"Text",
            "indexAnalyzer":"standard",
            "searchAnalyzer":"standard",
            "similarity":"TFIDF"
         },
         {
            "allowSort":false,
            "fieldName":"lastname",
            "fieldType":"Text",
            "indexAnalyzer":"standard",
            "searchAnalyzer":"standard",
            "similarity":"TFIDF"
         },
         {
            "allowSort":false,
            "fieldName":"dob",
            "fieldType":"DateTime",
            "indexAnalyzer":"standard",
            "searchAnalyzer":"standard",
            "similarity":"TFIDF"
         }
      ],
      "predefinedQueries":[

      ],
      "shardConfiguration":{
         "shardCount":1
      },
      "indexConfiguration":{
         "commitTimeSeconds":60,
         "deleteLogsOnClose":true,
         "commitOnClose":true,
         "autoCommit":true,
         "directoryType":"MemoryMapped",
         "defaultWriteLockTimeout":1000,
         "ramBufferSizeMb":100,
         "maxBufferedDocs":3,
         "refreshTimeMilliseconds":500,
         "autoRefresh":true,
         "indexVersion":"FlexSearch_1B",
         "allowReads":true,
         "allowWrites":true
      },
      "active":true
   },
   "error":null
}
```

Here the response contains a lot more information compare to what we defined in the previous section. What has happened is that FlexSearch used default values for the missing properties. You might wish to specify some of these for more specific cases, but for a simple example the defaults will do.

::: info
in order to know more about index object refer to: index object.
:::

Again the response consists of two parts data and error. As the request was successful the returned object has null value for error property.

Have you noticed that active property in the response? The active property is used to signify if the index should be active or not. Only an active index can be searched. In order to check if an index is active or inactive we can execute the below HTTP request:

```http
GET http://localhost:9800/indices/contact/status HTTP/1.1
```

```http
HTTP/1.1 200 OK
Date: Sun, 08 May 2016 14:44:24 GMT
Transfer-Encoding: chunked
Content-Type: application/json
Server: Kestrel

{"data":{"indexStatus":"Online"},"error":null}
```
### Indexing data
Let's try to add a document to our newly created index. Each document in the index should have an identifier associated with it. Unlike a database FlexSearch doesn't enforce uniqueness of the identifier. So you could have multiple documents each associated with the same identifier. But in most of the cases it does make sense to have a unique identifier otherwise there will be no way to retrieve or update the document.

::: info
Refer to concurrency control to understand more about the ID requirement.
:::

If you remember we never specified an ID field when we were creating a index. This is because FlexSearch uses an internal field called `_id`to represent ID of the document. The name of this file cannot be changed.

::: info
All internal fields start with `_` character.
:::

Since we are trying to create a document, according to our convention we have to use a POST request.

```http
POST http://localhost:9800/indices/contact/documents HTTP/1.1

{
  "fields": { 
    "firstname": "John",
    "lastname": "Doe"
  },
  "id": "1",
  indexName: "contact"
}
```

```http
HTTP/1.1 201 Created
Date: Sun, 08 May 2016 15:00:55 GMT
Transfer-Encoding: chunked
Content-Type: application/json
Server: Kestrel

{"data":{"id":"1"},"error":null}
```

### Retrieving documents by Id
Any document in an index can be retrieved by using its ID.

```http
GET http://localhost:9800/indices/contact/documents/1 HTTP/1.1
```

```http
HTTP/1.1 200 OK
Date: Sun, 08 May 2016 15:10:16 GMT
Transfer-Encoding: chunked
Content-Type: application/json
Server: Kestrel

{
   "data":{
      "fields":{
         "employeeid":"",
         "firstname":"John",
         "lastname":"Doe",
         "dob":"10101000000"
      },
      "id":"1",
      "indexName":"contact",
      "timeStamp":20160508160115647,
      "modifyIndex":2,
      "highlights":[

      ],
      "score":0.0
   },
   "error":null
}
```

### Modifying data
An existing record can be updated using the ID of the document. The service endpoint can be used for both creating new documents and for updating existing documents. The behaviour whether the document will be updated on a new document gets created depends on the value of `_modifyIndex` field. The default behaviour is to check if a document exist with a given ID, if it does then it updates the document otherwise it creates a new one.

::: info
Refer to concurrency control to understand more about the modify index field.
:::

```http
PUT http://localhost:9800/indices/contact/documents/1 HTTP/1.1

{
  "fields": { 
    "firstname": "John",
    "lastname": "Smith"
  },
  "id": "1",
  "indexName": "contact"
}
```

```http
HTTP/1.1 200 OK
Date: Sun, 08 May 2016 17:28:51 GMT
Transfer-Encoding: chunked
Content-Type: application/json
Server: Kestrel

{"data":true,"error":null}
```

### Setting up demo index

FlexSearch ships sample data extracted from `World Fact book` which is used to create a dummy index. This will be used throughout the documentation to explain major concepts. You can download the data from the following link to cross check the results: [World Fact Book](/docs/resources/demo.json).

This data is extremely useful for demonstrating a number of search concepts. There
are various kinds of fields which can be used for text and numeric searching.

::: info
The data presented here is for demonstration purpose only and may not be relevant in real world.
:::

In order to set up demo index, go to the homepage of the portal and select the demo index card from the installed tools section.

![Demo Index](/assets/img/docs/setup-demo-index.png)

Alternatively, you could use a issue a `PUT` request. 

```http
PUT http://localhost:9800/setupdemo HTTP/1.1
```

### Searching data
FlexSearch uses its own query search language to provide advanced search capabilities. At the lowest level a search expression consists of a search condition. A search condition is written as:

```flexsearch
queryFunction(Field Name to be searched, 'Field Value to be searched')
```
This is similar to writing a function call in a programming language. Here query function is the name of the function to be called, the `(` `)`mark the beginning and ending of the query function.There are many query functions available with FlexSearch and new query functions can be easily written to suit individual needs. Let's explore some basic query functions.

#### Making a search request
FlexSearch exposes a search endpoint which supports both get and post requests. The reason for supporting searching on both endpoint is to allow easy calling from a web browser using JSONP or CORS.

The only field which is mandatory is the query string. Let's search the country index for country name equal to France. Here we are using allOf query and we have selected four columns from the index. In case you want to return all the columns just set `c=*`. In case of post request example we are passing the query string in the post request body. Sometimes it is easier to pass complex query strings in the body of the post request as you don't have to escape the characters. Also browsers have a maximum character limit for the URLs.

FlexSearch uses single quotes to the present a search value. This was chosen so that a user won't have to escape the field when used with JSON.


```http
GET http://localhost:9800/indices/country/search?c=countryname,countrycode,area,population&q=allof(countryname,'france') HTTP/1.1
```

```http
POST http://localhost:9800/indices/country/search?c=countryname,countrycode,area,population HTTP/1.1

{
"QueryString" : "allof(countryname, 'france')"
}
```

Response
```http
HTTP/1.1 200 OK
Date: Sun, 08 May 2016 18:02:49 GMT
Transfer-Encoding: chunked
Content-Type: application/json
Server: Kestrel

{
   "data":{
      "documents":[
         {
            "fields":{
               "countryname":"France",
               "countrycode":"fr",
               "area":"643427",
               "population":"64057792"
            },
            "id":"84",
            "indexName":"country",
            "timeStamp":20160508190041077,
            "modifyIndex":84,
            "highlights":[

            ],
            "score":5.8636808395385742
         }
      ],
      "recordsReturned":1,
      "bestScore":5.863681,
      "totalAvailable":1
   },
   "error":null
}
```

::: info
In order to understand more about the search object and the search response object, please refer to search section of the guide.
:::

#### AllOf Query function
AllOf is a very basic query function which matches all the tokens from the given input.


The following query returns all documents containing `Wheat` and `Rice` both, in the `agriproducts` field.

::: render search_result
data-file : search-alloftest2
:::

The above query is semantically similar to the below queries:

```flexsearch
allof(agriproducts, 'rice') and allof(agriproducts, 'wheat')
```

```flexsearch
allof(agriproducts, 'rice', 'wheat')
```

```flexsearch
allof(agriproducts, 'wheat rice')
```

Here we have introduced logical operations. The syntax is similar to writing a logical expression in any programming language.

#### AnyOf query function
AnyOf function is opposite of allof function in the sense that the function succeeds if any of the passed token is present in the document.

The following search query returns all documents containing `Wheat` or `Rice` or both, in the `agriproducts` field.

::: render search_result
data-file : search-anyoftest2
:::

The above query is semantically similar to the below queries:

```flexsearch
anyOf(agriproducts, 'rice') and anyOf(agriproducts, 'wheat')
```

```flexsearch
anyOf(agriproducts, 'rice', 'wheat')
```

```flexsearch
anyOf(agriproducts, 'wheat rice')
```

FlexSearch comes with many other query functions. Please refer to the query functions section to know more about advance query functionality

