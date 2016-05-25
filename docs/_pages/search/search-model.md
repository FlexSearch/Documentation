---
title : Search model
area : search
order : 100
---
The below table represents all the fields that are present in the FlexSearch search query object. This object is used whenever you wish to execute a search against the engine.

::: render properties
data-file: swagger.definitions.searchQuery
:::

The search functionality is exposed over both `get` and `post` request types at the below endpoints:

```http
GET \indices\{indexName}\search?q={queryParameters} HTTP/1.1
```

```http
POST \indices\{indexName}\search?q={queryParameters} HTTP/1.1

{
    "QueryString" : ""
}
```

### Model properties description
In this section we will go through some of the more important properties of the search query model. Index name and query string are the only two fields which are mandatory.

#### Columns
This property is used to define the columns which should be returned as part of search results. 

* If this property is omitted then no columns will be returned as we would like users to be explicit about the requirement.

* `*` can be passed if you need all the available columns.

::: info
#### Query string parameter
Columns can also be requested using `q` in the URI parameters. This parameter is a string and not an array.

```http
GET \indices\search?q=col1,col2 HTTP/1.1
```

```http
GET \indices\search?q=* HTTP/1.1
```
:::

### Paging Properties
#### OrderBy & OrderByDirection
`OrderBy` by and `OrderByDirection` parameters can be used to sort the results coming from the engine. By default the sort order is relevance. This means the records which are more relevant to the search query will be at the top followed by less relevant results. The `_score` property in the returned document is the quantification of the relevance.

#### Skip & Count
Skip and count provides basic paging capability to the engine. Count is used to define the number of results that should be returned by a query. When count is used in conjunction with skip, it acts as page count property. Thus defining the number of records but page.

### Filtering Properties
Filtering properties are a special set of properties which are used to filter out the results returned by the engine.This filtering happens after the main search logic has been executed and before returning the results to the user. Think of it as a way of looking at a table of result and identifying the ones which don't meet the specific criteria. So this is excluding the documents from the result was search rather then excluding them through the search criteria.

The below diagram explains the concept. In the platform box once the platform logic is finished the sequence of documents are fed into the filtering criteria engine.

<svg height="531px" style="width:365px;height:531px;" version="1.1" viewBox="0 0 365 531" width="365px"><defs><filter height="300%" id="f1" width="300%" x="-1" y="-1"><feGaussianBlur result="blurOut" stdDeviation="2.0"/><feColorMatrix in="blurOut" result="blurOut2" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .4 0"/><feOffset dx="4.0" dy="4.0" in="blurOut2" result="blurOut3"/><feBlend in="SourceGraphic" in2="blurOut3" mode="normal"/></filter></defs><g><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="174" x="97" y="10"/><text fill="#000000" font-family="Roboto" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="154" x="107" y="31.1387">Search request received</text><rect fill="#FFFFFF" filter="url(#f1)" height="90.2656" style="stroke: #000000; stroke-width: 2.0;" width="209" x="79.5" y="54.7705"/><path d="M160.5,55.7705 L160.5,64.0674 L150.5,74.0674 L79.5,74.0674 " fill="#FFFFFF" style="stroke: #000000; stroke-width: 2.0;"/><text fill="#000000" font-family="Roboto" font-size="14" lengthAdjust="spacingAndGlyphs" textLength="71" x="82.5" y="68.7656">UserMode</text><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="189" x="89.5" y="91.0674"/><text fill="#000000" font-family="Roboto" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="169" x="99.5" y="112.2061">PreSearch script execution</text><rect fill="#FFFFFF" filter="url(#f1)" height="159.2344" style="stroke: #000000; stroke-width: 2.0;" width="348" x="10" y="155.8379"/><path d="M76,156.8379 L76,165.1348 L66,175.1348 L10,175.1348 " fill="#FFFFFF" style="stroke: #000000; stroke-width: 2.0;"/><text fill="#000000" font-family="Roboto" font-size="14" lengthAdjust="spacingAndGlyphs" textLength="56" x="13" y="169.833">Platform</text><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="162" x="103" y="192.1348"/><text fill="#000000" font-family="Roboto" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="142" x="113" y="213.2734">Platform logic exection</text><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="328" x="20" y="261.1035"/><text fill="#000000" font-family="Roboto" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="308" x="30" y="282.2422">Apply search time filters like distinctBy and cutOff</text><rect fill="#FFFFFF" filter="url(#f1)" height="90.2656" style="stroke: #000000; stroke-width: 2.0;" width="219" x="74.5" y="325.874"/><path d="M155.5,326.874 L155.5,335.1709 L145.5,345.1709 L74.5,345.1709 " fill="#FFFFFF" style="stroke: #000000; stroke-width: 2.0;"/><text fill="#000000" font-family="Roboto" font-size="14" lengthAdjust="spacingAndGlyphs" textLength="71" x="77.5" y="339.8691">UserMode</text><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="199" x="84.5" y="362.1709"/><text fill="#000000" font-family="Roboto" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="179" x="94.5" y="383.3096">Post search script execution</text><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="135" x="116.5" y="436.1396"/><text fill="#000000" font-family="Roboto" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="115" x="126.5" y="457.2783">Result compilation</text><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="246" x="61" y="490.1084"/><text fill="#000000" font-family="Roboto" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="226" x="71" y="511.2471">Result is returned back to the caller</text><line style="stroke: #383838; stroke-width: 1.5;" x1="184" x2="184" y1="43.9688" y2="91.0674"/><polygon fill="#383838" points="180,81.0674,184,91.0674,188,81.0674,184,85.0674" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="184" x2="184" y1="226.1035" y2="261.1035"/><polygon fill="#383838" points="180,251.1035,184,261.1035,188,251.1035,184,255.1035" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="184" x2="184" y1="125.0361" y2="192.1348"/><polygon fill="#383838" points="180,182.1348,184,192.1348,188,182.1348,184,186.1348" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="184" x2="184" y1="295.0723" y2="362.1709"/><polygon fill="#383838" points="180,352.1709,184,362.1709,188,352.1709,184,356.1709" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="184" x2="184" y1="396.1396" y2="436.1396"/><polygon fill="#383838" points="180,426.1396,184,436.1396,188,426.1396,184,430.1396" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="184" x2="184" y1="470.1084" y2="490.1084"/><polygon fill="#383838" points="180,480.1084,184,490.1084,188,480.1084,184,484.1084" style="stroke: #383838; stroke-width: 1.0;"/></g></svg>


<div class="hidden">
@startuml
skinparam monochrome true
skinparam defaultFontName Roboto
:Search request received;
partition UserMode {
:PreSearch script execution;
}
partition Platform {
    :Platform logic exection;
    :Apply search time filters like distinctBy and cutOff;
}
partition UserMode {
    :Post search script execution;
}
:Result compilation;
:Result is returned back to the caller;
@enduml
</div>

#### CutOff
Cut off criteria is used to filter out all the documents which score below a certain percentage. Due to the nature of Lucene it is not possible to have deterministic scores. So, here the percentages are calculated in respect of the highest scoring document. Thus keeping the cut-off relevant to the particular search query.

This feature is especially useful for duplicate detection. For example you want to identify duplicates of a given document. You already know that this particular document exist in the index. You can execute a search where this document should come out at the top of the search results. Then you can simply define that any other document which is within 10% range of this document can be deemed as duplicate. The formula used for cut-off is:

```
Current Document Score/Max score * 100
```

Cut-off value should be defined between 1 to 100.

#### DistinctBy
Think of distant by filter as the distinct by clause of SQL. Like other filters it runs post search and removes all the documents where the value of a particular field is not unique.

For example, you want to get a list of customers who purchase from you more than once but, you only want to get one customer per postcode. In such a situation distinct by will filter out all records where the value of postcode is not unique. The order by clause will dictate which records are filtered out.

### Control properties
#### ReturnScore
This property signifies if the scored associated with the document should be returned as part of the search result.

#### PreSearchScript
This property can be used to define the name of the script which should be executed before executing the core logic. The script should be present on the server in order to be picked up. Refer to predefined query section to know more about this feature.

#### Variables
Variables are a way to provide dynamic values to the search query. You can simply define variables in your input query using `@` symbol. For example the below query has  a variable called `fname`.

```flexsearch
allOf(firstname, @fname)
```
The advantages of this approach is that you can provide dynamic values to a query.

#### ReturnEmptyStringForNull
This property is useful when you don't want to return null objects as part of your JSON response. In case of null values the engine will simply return blank strings.

#### OverridePredefinedQueryOptions
Predefined query's are essentially a search query which has an associated name. Just like a normal query a predefined query can be configured using all the properties available on a normal search query object. There are times when you may want to override the values defined in the predefined query with the query object that you are passed to the server to execute the search.

For example, let's say in a predefined query called `findcustomer` you have set the number of results to be returned to be 5. In a particular case you want to get more than 5 results back, in such a case you can set `overridePredefinedQuery` option to true and set the `count` property of the query to 10.