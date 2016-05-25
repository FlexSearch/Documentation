---
title : Field Types
area : index
order : 200
description: The field type defines how FlexSearch should interpret data in a field and how the field can be queried. There are many field types included with FlexSearch by default, and they can also be defined locally.
keywords: indexing, documents, fields, field type
---

A field definition can include four types of information:
- The name of the field type (mandatory)
- Type of the field (defaults to `Text`)
- Information about the associated search and index time analyzers (defaults to `StandardAnalyzer`)
- Field type properties - depends on the `FieldType`.

Below is a sample Field definition from the `index.json` file.

```json
{
      "allowSort": false,
      "fieldName": "b1",
      "fieldType": "Bool",
      "indexAnalyzer": "standard",
      "searchAnalyzer": "standard",
      "similarity": "TFIDF"
}
```

Property Name | Description
--|--
`AllowSort` | Enables a field for sorting. Behind the scene a new docvalues field is created with the same name which is used for sorting.
`IndexAnalyzer` | Analyzer to be used during index time
`SearchAnalyzer` | Analyzer to be used during search time
`Similarity` | A field may optionally specify a `similarity` that will be used when scoring documents.


::: info
As Lucene index back-compatibility is only supported for the default codec. We took a conscious decision to hide codec level settings at the field level. Technically it is possible to have per field `postings format` and `docvalues format`. Currently FlexSearch only allows configuring `Bloom Filter` on the id field.
::: 


### Field Types
The field type defines how FlexSearch should interpret data in a field and how the field can be queried. There are many field types included with FlexSearch by default which should cover most of the cases.
The below table list the various field types supported by FlexSearch.

Field Type |Description
--|--
Int |Integer
Double |Double
Float | Float
Long | Long
Keyword |Field to store keywords. The entire input will be treated as a single word. This is useful for fields like `customerid`, `referenceid` etc. These fields only support complete text matching while searching and no partial word match is available.
Text |General purpose field to store normal textual data. This also supports text highlighting.
Bool |Boolean (Internally the values are saved as 'T' and 'F' to save space)
Date |Fixed format date field (Supported format: `YYYYmmdd`)
DateTime |Fixed format datetime field (Supported format: `YYYYMMDDhhmmss`)
Stored |Non-indexed field. Only used for retrieving stored text. Searching is not possible over these fields.