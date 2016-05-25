---
title : Checking index status
area : guides
order : 100
seealso :
  - title: Getting the status of an index
    link: "/docs/rest/examples#examples/getting-the-status-of-an-index"
---
An index goes through different statuses during its lifecycle:

```
Opening --> Online --> Closing --> Offline
```

* **`Opening`** - an index will be in the `Opening` status while it loads its configuration, analyzers, queries, etc. and initializes its *index writers* and *readers*.
* **`Online`** - an index is in the `Online` status after it's finished *opening*. It will continue to stay in this status until it's manually closed (a.k.a put *offline*) or the FlexSearch server is closed.
* **`Closing`** - an index is in the `Closing` status while it's unloading, releasing and disposing all the objects used during the *opening* phase and acquired while it was *online*.
* **`Offline`** - an index is in the `Offline` status if it was manually closed. An offline index cannot receive any commands apart from activating it (using the `UpdateStatus("online")` web service)

You can check the staus of an index in FlexSearch in two ways:

1. Using one of the FlexSearch clients (C#, TypeScript or JavaScript)
2. By submitting the HTTP request yourself (using a tool like Fiddler, for example)

For demonstration purposes, let's asume we already have an active / opened index named *contact*.

### Checking the status of an index using the C# client

First you need to get hold of an API that has the `GetIndexStatus` web service method. You can use the `IndicesApi`.

```csharp
var indicesApi = new IndicesApi("http://localhost:9800");
```

Now we can call the `GetIndexStatus` method, supplying the *name of the index* as a `string`. This method returns an option from the `IndexStatus` enum, i.e. one of the lifecycle statuses.

```csharp
var response = indicesApi.GetIndexStatus("country");

if (response.Error?.Message != null)
    Console.WriteLine(response.Error.Message);
else
{
    IndexStatus status = response.Data.IndexStatus;
}
```

#### Bonus - Checking if an index exists

To check if an index exists in FlexSearch you need to use the `IndexExists` method from the `IndicesApi`. It returns `true` or `false`.

```csharp
var indicesApi = new IndicesApi("http://localhost:9800");

var response = indicesApi.IndexExists("some-index-name");

if (response.Error?.Message != null)
    Console.WriteLine(response.Error.Message);
else
{
    bool exists = response.Data.Exists;
}
```

### Checking the status of an index by writing the HTTP request ourselves

Please have a look at the REST documentation for [Index Management APIs].

[Index Management APIs]: /docs/rest/examples#examples/getting-the-status-of-an-index
