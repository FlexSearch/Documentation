---
title : Examples
area : rest
order : 300
---
### Index API Examples

#### Creating an index without any data

::: render example
data-file : post-indices-id-1
:::

#### Creating an index with two fields `firstname` and `lastname`

::: render example
data-file : post-indices-id-3
:::

#### Duplicate indices cannot be created

::: render example
data-file : post-indices-id-2
:::

#### Getting all available indices

::: render example
data-file : get-indices-1
:::

#### Getting an index by name

::: render example
data-file : get-indices-id-1
:::

#### Getting a non existing index returns an error

::: render example
data-file : get-indices-id-2
:::

#### Checking if an index exists

::: render example
data-file : get-indices-id-exists-1
:::

#### Getting the status of an index

::: render example
data-file : get-indices-id-status-1
:::

#### Updating an index configuration

::: render example
data-file : put-indices-id-4
:::

#### Deleting an index

::: render example
data-file : delete-indices-id-1
:::

#### Deleting a non existing index will return an error

::: render example
data-file : delete-indices-id-2
:::

#### Changing the status of an index

In this particular case we are going to bring an index `online`, meaning we are going to set its status to `online`

::: render example
data-file : put-indices-id-status-1
:::

### Document API examples

#### Getting top 10 documents from an index

::: render example
data-file : get-indices-id-documents-1
:::

#### Getting a document by ID

::: render example
data-file : get-indices-id-documents-id-1
:::

#### Modifying an existing document

::: render example
data-file : put-indices-id-documents-id-2
:::

#### Creating a new document

::: render example
data-file : post-indices-id-documents-id-2
:::

#### Getting a non-existing document by ID returns `Not Found`

::: render example
data-file : get-indices-id-documents-id-2
:::

### Search API Examples

#### Create or Update a `Predefined Query`

Whether you want to create or update a `predefined query`, the method is the same.

::: render example
data-file : put-indices-id-3
:::

::: render search_result
data-file : search-alloftest1
:::

::: render search_result
data-file : search-alloftest2
:::

::: render search_result
data-file : search-alloftest3
:::

::: render search_result
data-file : search-anyoftest1
:::

::: render search_result
data-file : search-anyoftest2
:::

::: render search_result
data-file : search-anyoftest3
:::

::: render search_result
data-file : search-fuzzytest1
:::

::: render search_result
data-file : search-fuzzytest2
:::

::: render search_result
data-file : search-liketest1
:::

::: render search_result
data-file : search-liketest2
:::

::: render search_result
data-file : search-liketest3
:::

::: render search_result
data-file : search-matchalltest1
:::

::: render search_result
data-file : search-matchnonetest1
:::

::: render search_result
data-file : search-numericrangetest1
:::

::: render search_result
data-file : search-numericrangetest2
:::

::: render search_result
data-file : search-numericrangetest3
:::

::: render search_result
data-file : search-numericrangetest4
:::

::: render search_result
data-file : search-phrasetest1
:::

::: render search_result
data-file : search-phrasetest2
:::

::: render search_result
data-file : search-phrasetest3
:::

::: render search_result
data-file : search-phrasetest4
:::

::: render search_result
data-file : search-phrasetest5
:::

::: render search_result
data-file : search-phrasetest6
:::

::: render search_result
data-file : search-phrasetest7
:::

::: render search_result
data-file : search-regextest1
:::
