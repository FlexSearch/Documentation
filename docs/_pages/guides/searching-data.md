---
title : Searching data
area : guides
order : 800
seealso:
  - title: Query functions
    link: "/docs/search/query-functions"
  - title: Search API examples
    link: "/docs/rest/examples#examples/search-api-examples"
  - title: Predefined queries
    link: "/docs/search/predefined-query"
  - title: Setting up demo index
    link: "/docs/quick-start/getting-started#getting-started/setting-up-demo-index"
  - title: Search Data GitHub example
    link: "https://github.com/FlexSearch/Samples/blob/master/src/Samples/CSharpClient/SearchData.cs"
---
You can search data in FlexSearch in two ways:

1. Using one of the FlexSearch clients (C#, TypeScript or JavaScript)
2. By submitting the HTTP request yourself (using a tool like Fiddler, for example)

### Search using the C# Client

For demonstration purposes, let's use the *country* index that already has data in it. Please see the [Setting up the demo index] section in order to initialize the `country` index.
You can find the source code of this example in the [Samples] Github repository.

Let's say we want to get all contries that have a population greater than 100 million and have a name that contains *United*.

#### Get the Search API

For accessing the `Search` web services, you will need an instance of the `SearchApi`.

```csharp
var searchApi = new SearchApi("http://localhost:9800");
```

#### Create your SearchQuery that contains the query string

For this you simply need to create a `SearchQuery` object and pass the name of the index and the query string.
In the case of our example, the query string will be:

```
gt(population, '100000000') AND allOf(countryname, 'United')
```

By default no columns will be returned from the search, so you also need to specify which columns to bring back. For this example we will bring all columns.
This results in the following C# code:

```csharp
var queryString = "gt(population, '100000000') AND allOf(countryname, 'United')";
var query = new SearchQuery("country", queryString)
{
    Columns = new string[] { "*" }
};
```

#### Submitting the search to FlexSearch

For this you just need to call the `Search` method on the `SearchApi`:

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

### Search by writing the HTTP request ourselves

Please have a look at the REST documentation for [Search APIs].

### Query examples

Please refer to the [Query Functions] to go through search examples.

[Query Functions]: /docs/search/query-functions
[Search APIs]: /docs/rest/examples#examples/search-api-examples
[Predefined Queries]: /docs/search/predefined-query
[Setting up the demo index]: /docs/quick-start/getting-started#getting-started/setting-up-demo-index
[Samples]: https://github.com/FlexSearch/Samples/blob/master/src/Samples/CSharpClient/SearchData.cs
