---
title : Creating an index
area : guides
order : 300
seealso:
  - title: Creating an index with two fields
    link: "/docs/rest/examples#examples/creating-an-index-with-two-fields-and"
---
You can create an index in FlexSearch in two ways:

1. Using one of the FlexSearch clients (C#, TypeScript or JavaScript)
2. By submitting the HTTP request yourself (using a tool like Fiddler, for example)

For demonstration purposes, let's create an index named *contact* that has a *name* column of type `Text` and an *age* column of type `Int`.

### Creating an index using the C# client

First you need to get hold of an API that has the `CreateIndex` web service method. You can use either the `CommonApi` or the `IndicesApi`:

```csharp
var indicesApi = new IndicesApi("http://localhost:9800");
```

After initializing the C# client, we need to create a `FlexSearch.Api.Model.Index` object that contains all the configuration needed to create the index.

```csharp
var index = new Index("contact")
{
    Fields = new Field[]
    {
        new Field("name", FieldType.Text),
        new Field("age", FieldType.Int)
    }
};
```

Now we can call the `CreateIndex` method, supplying the index object as a parameter. The response should return `true` in the `Data` part if everything went ok.

```csharp
var response = indicesApi.CreateIndex(index);
Debug.Assert(response.Error?.Message == null);
Debug.Assert(response.Data == true);
```

### Creating an index by writing the HTTP request ourselves

Please have a look at the REST documentation for [Index Management APIs].

[Index Management APIs]: /docs/rest/examples#examples/creating-an-index-with-two-fields-and
