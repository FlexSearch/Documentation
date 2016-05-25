---
title : Indexing documents
area : guides
order : 500
seealso:
  - title: Creating a new document
    link: "/docs/rest/examples#examples/creating-a-new-document"
---
You can index documents in FlexSearch in two ways:

1. Using one of the FlexSearch clients (C#, TypeScript or JavaScript)
2. By submitting the HTTP request yourself (using a tool like Fiddler, for example)

For demonstration purposes, let's add documents to an already existing index named *contact* that has a *name* column of type `Text` and an *age* column of type `Int`.

### Indexing documents using the C# client

First you need to get hold of an API that has the `CreateDocument` web service method. You can use either the `CommonApi` or the `DocumentsApi`:

```csharp
var documentsApi = new DocumentsApi("http://localhost:9800");
```

After initializing the C# client, we need to get hold of the `FlexSearch.Api.Model.Document` objects that we want to index. Here I'm just creating 10 sample documents with *name* and *age* columns populated.

```csharp
public IEnumerable<Document> GetSampleDocuments(int count, string indexName)
{
    for (var i = 1; i < count + 1; i++)
    {
        var documentId = i.ToString();
        var d = new Document(documentId, indexName);

        // Assume the given index has 2 fields: 'name' and 'age'
        d.Fields.Add("name", "name-number-" + i);
        d.Fields.Add("age", (i + 20).ToString());

        yield return d;
    }
}
```

Now we just need to index these documents using the `CreateDocument` method.

```csharp
foreach (var doc in GetSampleDocuments(10, "contact"))
{
    var response = documentsApi.CreateDocument(doc, doc.Id);
    Debug.Assert(response.Error?.Message == null);
    var createdDocumentId = response.Data.Id; // Should be between 1 and 10
}
```

### Indexing documents by writing the HTTP request ourselves

Please have a look at the REST documentation for [Document Management APIs].

[Document Management APIs]: /docs/rest/examples#examples/creating-a-new-document
