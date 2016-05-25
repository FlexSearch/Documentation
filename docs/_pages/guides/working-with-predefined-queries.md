---
title : Working with predefined query
area : guides
order : 1000
seealso:
  - title: Create or update a predefined query
    link: "/docs/rest/examples#examples/create-or-update-a"
---
You can create or update *predefined queries* within a FlexSearch index in two ways:

1. Using one of the FlexSearch clients (C#, TypeScript or JavaScript)
2. By submitting the HTTP request yourself (using a tool like Fiddler, for example)

For demonstration purposes, let's use the *country* index that already has a *predefined query* named 'agriSearch'. We want to modify the query string of this *predefined query* to throw an error if the `countryname` parameter is not supplied.

Therefore we want to modify it from:

```
allof(agriproducts, 'wheat', 'corn', 'grapes') AND like(countryname, @countryName, -matchall)
```

To:

```
allof(agriproducts, 'wheat', 'corn', 'grapes') AND like(countryname, @countryName)
```


### Creating or updating a Predefined Query using the C# client

First you need to get hold of an API that has the `UpdateIndexPredefinedQuery` web service method. You can use the `IndicesApi` for it. An important thing to note about this method is that **acts as an upsert** - if the *predefined query* doesn't exist on the index, then a new one will be created. The matching is done based on the `QueryName` property.

```csharp
var indicesApi = new IndicesApi("http://localhost:9800");
```

After initializing the C# client, we need create a `FlexSearch.Api.Model.SearchQuery` instance containing the new query. Make sure you keep the old query name if you want this to be an update.

```csharp
var updatedQuery =
    new SearchQuery("country", "allof(agriproducts, 'wheat', 'corn', 'grapes') AND like(countryname, @countryName)")
    {
        QueryName = "agriSearch"
    };
```

Now we just need to call the `UpdateIndexPredefinedQuery` method to register this query against the *country* index.

```csharp
var response = indicesApi.UpdateIndexPredefinedQuery(updatedQuery, "country");

// This method doesn't return any significant data. It just reports any errors.
if (response.Error?.Message != null)
    Console.WriteLine(response.Error.Message);
```


### Creating or updating a Predefined Query by writing the HTTP request ourselves

Refer to [[api-reference]] for more information about Document Management APIs.
