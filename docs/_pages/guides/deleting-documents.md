---
title : Deleting documents
area : guides
order : 400
seealso:
  - title: Modifying an existing document
    link: "/docs/rest/examples#examples/modifying-an-existing-document"
---
You can delete documents in FlexSearch in two ways:

1. Using one of the FlexSearch clients (C#, TypeScript or JavaScript)
2. By submitting the HTTP request yourself (using a tool like Fiddler, for example)

For demonstration purposes, let's delete an existing document with ID "7" from the index named *contact*.

### Deleting documents using the C# client

First you need to get hold of an API that has the `DeleteDocument` web service method. You can use either the `CommonApi` or the `DocumentsApi`:

```csharp
var documentsApi = new DocumentsApi("http://localhost:9800");
```

After initializing the C# client, we just need to call the `DeleteDocument` method supplying the index name and the document ID that we want to delete.

The response doesn't contain any data, it just contains the `Error` part.

```csharp
var response = documentsApi.DeleteDocument("contact", "7");

// This method doesn't return any significant data. It just reports any errors.
if (response.Error?.Message != null)
    Console.WriteLine(response.Error.Message);
```

### Deleting documents by writing the HTTP request ourselves

Please have a look at the REST documentation for [Document Management APIs].

[Document Management APIs]: /docs/rest/examples#examples/modifying-an-existing-document
