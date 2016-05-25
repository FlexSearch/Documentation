---
title : Predefined Query
area : search
order : 400
seealso :
    - title: Creating or Updating a Predefined Query
      link: /docs/guides/working-with-predefined-query
    - title : Searching with a predefined query
      link : /docs/guides/search-with-predefined-query
---

Predefined Query is an extension of normal searching capability of FlexSearch which allows central management of queries. It is also used by background duplicate matching. Think of it as a way to define a search criteria which is managed at the server and can be called from various systems without the need to specify the criteria as the as a part of the query. This allows easy management of queries across many systems. For example, you can define a query which can detect duplicates in your customer data, you can call this query from your various systems like data entry, point of sale etc. If you ever decide to update the criteria you don't have to redefine the criteria in all the systems.

This is an extremely powerful and useful feature present in the engine. It also allows you to define various kinds of scripts which can be executed before or after the main query is processed, this gives you an easy way to extend the search pipeline.

#### Advantages

* Centralized system to store and manage all queries.
* Easily modify queries and the changes will be instant across all references to this query.
* Test it faster using the *Search Studio* application in the FlexSearch Portal.

### Example

This is a part of the `country` index configuration, showing the predefined query `agriSearch`.

```json
"predefinedQueries": [
    {
      "queryName": "agriSearch",
      "columns": [
        "countryname",
        "agriproducts"
      ],
      "count": 10,
      "indexName": "country",
      "orderBy": "score",
      "orderByDirection": "Ascending",
      "cutOff": 0.0,
      "distinctBy": "",
      "skip": 0,
      "queryString": "allof(agriproducts, 'wheat', 'corn', 'grapes') AND like(countryname, @countryName, -matchall)",
      "returnScore": true,
      "preSearchScript": "",
      "overridePredefinedQueryOptions": false,
      "returnEmptyStringForNull": true,
      "variables": {}
    }
  ]
```

A *predefined query* is actually a saved `SearchQuery` object.
The most important (and mandatory) properties are:

* `QueryName`: this property is only mandatory in the case of *Predefined Queries*. If this isn't populated, then a `ValidationException` error will be returned. It holds the name of the *predefined query*
* `QueryString`: describes the query to submit to FlexSearch
* `IndexName`: the index to execute the query against
* `Columns`: this property isn't mandatory, though it will default to `[]`, which means no fields would be returned from a search. This property holds the list of fields that you want to be returned by the search.

<a name="plain-english"></a>
Here is how the definition would sound in plain English:

* We have a *predefined query* named **agriSearch**
* Whenever the query is invoked, we want it to return 2 columns: **countryname** and **agriproducts**
* We want the query to return at most **10** records
* The query will search against the **country** index
* The results will be ordered by their **score** in the **ascending** direction
* We will only consider the records that have a score higher than or equal to **0.0**
* We **don't** want to bring only the records that are distinct. We will take all records.
* We want to skip the first **0** records from the result, i.e. bring all records from the beginning.
* Use the following search query: **allof(agriproducts, 'wheat', 'corn', 'grapes') AND like(countryname, @countryName, -matchall)**
* **Yes**, please include the value of the score within each returned document
* We **don't** want to use any *PreSearch Script*
* We **don't** want to override the *predefined query* options that we've set here with the options that we submit in the search URL.

    E.g. calling `http://localhost:9800/indices/country?queryname=agrisearch&count=3` will not overwrite the count value of `10` with `3`.
* **Yes**, please return an empty string if a field has the `null` value.
* We **aren't** supplying any values for the variables in the query



::: warning
The name of the variable in this particular case (`countryName`) is just a coincidence it's named the same as a field in the `country` index. You can have any name you want for a variable.
:::

### Working with predefined queries
Please refer to the links in the see also section.
