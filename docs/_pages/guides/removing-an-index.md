---
title : Removing an index
area : guides
order : 700
seealso:
  - title: Deleting an index
    link: "/docs/rest/examples#examples/deleting-an-index"
---
Removing an index will delete all its data and configuration files. You cannot bring back a deleted index.

You can remove an index in FlexSearch in two ways:

1. Using one of the FlexSearch clients (C#, TypeScript or JavaScript)
2. By submitting the HTTP request yourself (using a tool like Fiddler, for example)

For demonstration purposes, let's asume we already have an index named *contact*.

::: info
You might also consider just *closing* an index, as oposed to deleting it. By closing an index you keep all the data, but the index cannot be changed or searched in any way. See [closing an index] sample. You can reopen that index at any time.
:::

### Removing an index using the C# client

First you need to get hold of an API that has the `DeleteIndex` web service method. You can use either the `CommonApi` or the `IndicesApi`:

```csharp
var indicesApi = new IndicesApi("http://localhost:9800");
```

Now we can call the `DeleteIndex` method, supplying the name of the index as a parameter. The response doesn't contain any data, it just contains the `Error` part.

```csharp
var response = indicesApi.DeleteIndex("contact");

// This method doesn't return any significant data. It just reports any errors.
if (response.Error?.Message != null)
    Console.WriteLine(response.Error.Message);
```

### Removing an index by writing the HTTP request ourselves

Please have a look at the REST documentation for [Index Management APIs].

[Index Management APIs]: /docs/rest/examples#examples/deleting-an-index
[closing an index]: ./closing-an-index
