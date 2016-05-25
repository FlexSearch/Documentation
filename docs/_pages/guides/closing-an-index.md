---
title : Closing an index
area : guides
order : 200
seealso:
  - title: Changing the status of an index
    link: /docs/rest/examples#examples/changing-the-status-of-an-index
---
Closing an index will just make the index unavailable for any changes or searches. It will not delete or modify any data. You can *reopen* / *activate* an index at any time.

You can close an index in FlexSearch in two ways:

1. Using one of the FlexSearch clients (C#, TypeScript or JavaScript)
2. By submitting the HTTP request yourself (using a tool like Fiddler, for example)

For demonstration purposes, let's asume we already have an active / opened index named *contact*.

### Closing an index using the C# client

First you need to get hold of an API that has the `UpdateIndexStatus` web service method. You can use the `IndicesApi`:

```csharp
var indicesApi = new IndicesApi("http://localhost:9800");
```

Now we can call the `UpdateIndexStatus` method, supplying the *name of the index* and the *status* as a `string`. The *status* can have one of the following values: `online` or `offline`. We are, of course, going to set the status to `offline`.

The response doesn't contain any data, it just contains the `Error` part.

```csharp
var response = indicesApi.UpdateIndexStatus("contact", "offline");

// This method doesn't return any significant data. It just reports any errors.
if (response.Error?.Message != null)
    Console.WriteLine(response.Error.Message);
```

### Closing an index by writing the HTTP request ourselves

Please have a look at the REST documentation for [Index Management APIs].

[Index Management APIs]: /docs/rest/examples#examples/changing-the-status-of-an-index
