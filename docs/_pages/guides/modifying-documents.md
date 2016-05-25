---
title : Modifying documents
area : guides
order : 600
seealso:
  - title: Modifying an existing document
    link: "/docs/rest/examples#examples/modifying-an-existing-document"
---
You can modify documents in FlexSearch in two ways:

1. Using one of the FlexSearch clients (C#, TypeScript or JavaScript)
2. By submitting the HTTP request yourself (using a tool like Fiddler, for example)

For demonstration purposes, let's assume we already have an index named *contact* that has a *name* column of type `Text` and an *age* column of type `Int`. This index contains the following document:

```json
{
    _id: 7,
    name: 'Vladamir',
    age: 26
}
```

We want to modify this document in order to correct the name to 'Vladimir'.

### Modifying documents using the C# client

First you need to get hold of an API that has the `ModifyDocument` web service method. You can use either the `CommonApi` or the `DocumentsApi`:

```csharp
var documentsApi = new DocumentsApi("http://localhost:9800");
```

After initializing the C# client, we need create a `FlexSearch.Api.Model.Document` instance containing **ALL** the fields that we want the document to contain, not just the fields that we want to modify. **FlexSearch updates all fields**. If you only supply one field, then FlexSearch will update that field to the new value and set all the other fields (apart from the system fields, ofc) to their default value.

```csharp
var correctedDocument = new Document("7", "contact");
// We need to supply *ALL* fields, even if we're not changing them
correctedDocument.Fields.Add("name", "Vladimir");
correctedDocument.Fields.Add("age", "26");
```

Now we just need to update the index with the corrected document using the `CreateOrUpdateDocument` method.

```csharp
var response = documentsApi.CreateOrUpdateDocument(correctedDocument, "contact", "7");

// This method doesn't return any significant data. It just reports any errors.
if (response.Error?.Message != null)
    Console.WriteLine(response.Error.Message);
```

::: warning
FlexSearch's document *update* method is actually an *upsert* - if the document with the specified ID doesn't exist, a new one will be created.
:::

### Modifying documents by writing the HTTP request ourselves

Please have a look at the REST documentation for [Document Management APIs].

[Document Management APIs]: /docs/rest/examples#examples/modifying-an-existing-document
