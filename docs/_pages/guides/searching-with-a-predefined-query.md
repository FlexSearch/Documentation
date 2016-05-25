---
title : Search with predefined query
area : guides
order : 900
seealso:
  - title: Predefined queries
    link: "/docs/search/predefined-query"
  - title: Search API examples
    link: "/docs/rest/examples#examples/search-api-examples"
---

You can search using *predefined queries* in FlexSearch in two ways:

1. Using one of the FlexSearch clients (C#, TypeScript or JavaScript)
2. By submitting the HTTP request yourself (using a tool like Fiddler, for example)

For demonstration purposes, let's use the *country* index that already has a *predefined query* named 'agriSearch'. Here is the 'agriSearch' predefined query definition:

```json
"predefinedQueries": [
    {
      "queryName": "agriSearch",
      "columns": [
        "countryname",
        "agriproducts"
      ],
      "count": 10,
      "indexName": "country",
      "orderBy": "score",
      "orderByDirection": "Ascending",
      "cutOff": 0.0,
      "distinctBy": "",
      "skip": 0,
      "queryString": "allof(agriproducts, 'wheat', 'corn', 'grapes') AND like(countryname, @countryName, -matchall)",
      "returnScore": true,
      "preSearchScript": "",
      "overridePredefinedQueryOptions": false,
      "returnEmptyStringForNull": true,
      "variables": {}
    }
  ]
```

To see how this definition would sound in plain English, see the [Predefined Queries] documentation.

### Get the Search API

For accessing the `Search` web services, you will need an instance of the `SearchApi`.

```csharp
var searchApi = new SearchApi("http://localhost:9800");
```

### Create your SearchQuery that calls the Predefined Query

For this you simply need to create a `SearchQuery` object and pass the name of the index and the name of the Predefined Query.

```csharp
var query = new SearchQuery()
{
    IndexName = "country",
    QueryName = "agrisearch"
};
```

### Calling the predefined query without any Variables using the C# client

What will happen in this particular case is that the *countryName* variable (the one referenced by `@countryName` in the `QueryString`) will be blank. The `-matchall` switch will see that the variable is blank and simply *ignore* the `like()` clause (by replacing it with a `matchall` query, hence the name of the switch). We will expect a query equivalent to:

```
(a) allof(agriproducts, 'wheat', 'corn', 'grapes')
```

Here is how we call the `Search` method:

```csharp
var response = searchApi.Search("country", query);
InterpretResponse(response);
```

The `InterpretResponse` function is defined here:
```csharp
private void InterpretResponse(SearchResponse response)
{
    if (response.Error?.Message != null)
    {
        Console.WriteLine(response.Error.Message);
    }
    else
    {
        var records = response.Data.Documents;
        var countryNameOfFirstRecord = records[0].Fields["countryname"];
        var totalAvailableNumberOfRecords = response.Data.TotalAvailable;
    }
}
```

### Calling the predefined query while passing a variable using the C# client

We will use *romania* as the value for the *countryName* variable. Variable names are case insensitive. Since the `@countryName` variable has a value, the `-matchall` switch won't kick in anymore. We would therefore expect a query equivalent to:

```
(b) allof(agriproducts, 'wheat', 'corn', 'grapes') AND like(countryname, 'romania')
```

Here is how we initialize the variable and call the `PostSearch` method:

```csharp
query.Variables.Add("countryname", "romania");
var response = searchApi.Search("country", query);
InterpretResponse(response);
```


### Searching using a Predefined Query by writing the HTTP request ourselves

When searching you have two options:

1. Do a `GET` request on the `search` endpoint, specifying URL parameters.
2. Do a `POST` request on the `search` endpoint, putting all parameters in the body as a `SearchQuery` object.

#### 1. Doing a `GET` request

In order to call the `agriSearch` predefined query without specifying any parameters, you can just call:

```
http://localhost:9800/indices/country/search?queryname=agrisearch
```

This would be the equivalent of calling query `(a)` defined earlier.

If you want to specify variables, then your only option is to use the `POST` request.

#### 2. Doing a `POST` request

In order to do the `POST` request you need to build your `SearchQuery` in JSON and submit it as the body of the request. Let's first build it without specifying any variables.

```
$ http POST http://localhost:9800/indices/country/search -d
{
    queryName: "agrisearch"
}
```

The above would be the equivalent of calling query `(a)` defined earlier. Now let's add the `countryName` variable with the value of *romania*.

```
$ http POST http://localhost:9800/indices/country/search -d
{
    queryName: "agrisearch",
    variables: {
        countryname: "romania"
    }
}
```

The above would be the equivalent of calling query `(b)` defined earlier. As you can see from the JSON, **you don't need to specify all the properties of the `SearchQuery` object**.

For more examples, please have a look at the REST documentation for [Search APIs].

[Search APIs]: /docs/rest/examples#examples/search-api-examples
[Predefined Queries]: /docs/search/predefined-query
