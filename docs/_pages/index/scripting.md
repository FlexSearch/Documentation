---
title : Scripting
area : index
order : 600
description: Scripting capabilities of Flexsearch 
keywords: analysis, text processing, analyzer, tokenizer, filter, scripting
---

FlexSearch `Scripts` are snippets of code that execute a certain logic at a specific moment in the FlexSearch event pipeline. Scripts are written in F# programming language. There are two separate pipelines where a script can be added.

- **Pre-index scripts** - Just before a document is added or modified in an index. This script lets you manipulate the data that is being indexed.

- **Pre-search scripts** - just before a search request is sent to Lucene. This script helps you control the data that is being sent for searching.

### Pre-index script

**Pre-index scripts** are F# methods that execute a piece of code just before indexing occurs. They are perfect when you want to populate or update some fields in a document and persist that change. Compared to *pre-search scripts*, in *pre-index scripts* the new values of the document fields will be stored in the index and visible each time you search for it.

<svg height="477px" style="width:296px;height:477px;" version="1.1" viewBox="0 0 296 477" width="296px"><defs><filter height="300%" id="f1" width="300%" x="-1" y="-1"><feGaussianBlur result="blurOut" stdDeviation="2.0"/><feColorMatrix in="blurOut" result="blurOut2" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .4 0"/><feOffset dx="4.0" dy="4.0" in="blurOut2" result="blurOut3"/><feBlend in="SourceGraphic" in2="blurOut3" mode="normal"/></filter></defs><g><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="182" x="58.5" y="10"/><text fill="#000000" font-family="Roboto" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="162" x="68.5" y="31.1387">Indexing request received</text><rect fill="#FFFFFF" filter="url(#f1)" height="90.2656" style="stroke: #000000; stroke-width: 2.0;" width="244" x="27.5" y="54.7705"/><path d="M93.5,55.7705 L93.5,64.0674 L83.5,74.0674 L27.5,74.0674 " fill="#FFFFFF" style="stroke: #000000; stroke-width: 2.0;"/><text fill="#000000" font-family="Roboto" font-size="14" lengthAdjust="spacingAndGlyphs" textLength="56" x="30.5" y="68.7656">Platform</text><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="224" x="37.5" y="91.0674"/><text fill="#000000" font-family="Roboto" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="204" x="47.5" y="112.2061">Document Version control check</text><rect fill="#FFFFFF" filter="url(#f1)" height="90.2656" style="stroke: #000000; stroke-width: 2.0;" width="198" x="50.5" y="155.8379"/><path d="M131.5,156.8379 L131.5,165.1348 L121.5,175.1348 L50.5,175.1348 " fill="#FFFFFF" style="stroke: #000000; stroke-width: 2.0;"/><text fill="#000000" font-family="Roboto" font-size="14" lengthAdjust="spacingAndGlyphs" textLength="71" x="53.5" y="169.833">UserMode</text><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="178" x="60.5" y="192.1348"/><text fill="#000000" font-family="Roboto" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="158" x="70.5" y="213.2734">PreIndex script execution</text><rect fill="#FFFFFF" filter="url(#f1)" height="159.2344" style="stroke: #000000; stroke-width: 2.0;" width="221" x="39" y="256.9053"/><path d="M105,257.9053 L105,266.2021 L95,276.2021 L39,276.2021 " fill="#FFFFFF" style="stroke: #000000; stroke-width: 2.0;"/><text fill="#000000" font-family="Roboto" font-size="14" lengthAdjust="spacingAndGlyphs" textLength="56" x="42" y="270.9004">Platform</text><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="150" x="74.5" y="293.2021"/><text fill="#000000" font-family="Roboto" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="130" x="84.5" y="314.3408">Document Validation</text><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="201" x="49" y="362.1709"/><text fill="#000000" font-family="Roboto" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="181" x="59" y="383.3096">Other Platform logic exection</text><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="279" x="10" y="436.1396"/><text fill="#000000" font-family="Roboto" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="259" x="20" y="457.2783">Report operation status back to the user</text><line style="stroke: #383838; stroke-width: 1.5;" x1="149.5" x2="149.5" y1="43.9688" y2="91.0674"/><polygon fill="#383838" points="145.5,81.0674,149.5,91.0674,153.5,81.0674,149.5,85.0674" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="149.5" x2="149.5" y1="125.0361" y2="192.1348"/><polygon fill="#383838" points="145.5,182.1348,149.5,192.1348,153.5,182.1348,149.5,186.1348" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="149.5" x2="149.5" y1="327.1709" y2="362.1709"/><polygon fill="#383838" points="145.5,352.1709,149.5,362.1709,153.5,352.1709,149.5,356.1709" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="149.5" x2="149.5" y1="226.1035" y2="293.2021"/><polygon fill="#383838" points="145.5,283.2021,149.5,293.2021,153.5,283.2021,149.5,287.2021" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="149.5" x2="149.5" y1="396.1396" y2="436.1396"/><polygon fill="#383838" points="145.5,426.1396,149.5,436.1396,153.5,426.1396,149.5,430.1396" style="stroke: #383838; stroke-width: 1.0;"/></g></svg>

<div class="hidden">
@startuml
skinparam monochrome true
skinparam defaultFontName Roboto
:Indexing request received;
partition Platform {
:Document Version control check;
}
partition UserMode {
:PreIndex script execution;
}
partition Platform {
    :Document Validation;
    :Other Platform logic exection;
}
:Report operation status back to the user;
@enduml
</div>

Pre-index scripts are declared in the same file as the *pre-search scripts* are, namely `scripts.fsx` in the index configuration folder. 

Just like any other script, pre-index scripts are loaded when FlexSearch server starts or when an index is reloaded.

#### Usage

Pre-index scripts are used when you want to modify the data that will end up in the index during indexing time (when adding or updating documents).

The name of the F# method that holds the pre-index script logic is `preIndex`.

The signature of the method is:

```fsharp
val preIndex : Document -> unit

e.g.
let preIndex (document : Document) = ()
```

This translates to a method that takes a `Document` as a parameter and returns nothing (`void`).

The `preIndex` method needs to be placed in the `script.fsx` file located in the index configuration folder. For example, if you have an index named `contact`, the `script.fsx` file would need to be in:

```
/conf/indices/contact/script.fsx
```

The way the *pre-index scripts* are designed to work is:

- A `Document` is received for indexing. Its fields are either empty or prepopulated with some data.

- The `preIndex` function runs against the received `Document`. This function will either modify, populate or empty some fields in the document.

- The modified `Document` is then passed to *Lucene* to index, store the data and make it available for searching.

#### Example

Let's then imagine we want to populate the `gender` field from the `employee` index according to the `title` field - if it's *Mr.*,  then it's *Male*, otherwise *Female*. Here is part of the definition of the `employee` index:

```json
{
  "indexName": "employee",
  "fields": [
    {
      "allowSort": false,
      "fieldName": "gender",
      "fieldType": "Text",
      "indexAnalyzer": "standard",
      "searchAnalyzer": "standard",
      "similarity": "TFIDF"
    },{
      "allowSort": false,
      "fieldName": "title",
      "fieldType": "Text",
      "indexAnalyzer": "standard",
      "searchAnalyzer": "standard",
      "similarity": "TFIDF"
    },
    ...
  ],
  ...  
}
```

We would then write the following code in the `scripts.fsx` file.

```fsharp
module Script

open FlexSearch.Api.Model
open Helpers
open System

let preIndex (document : Document) = 
    // Get the title field value from the document and make it lowercase
    match document.Get("title").ToLower() with
    // If it's `Mr.` then set the gender to Male
    | "mr." -> document.Set("gender", "Male")   
    // If it's empty then don't set the gender
    | "" -> ()
    // Anything else is Female                                  
    | _ -> document.Set("gender", "Female")      
```

The new piece of functionality will be loaded the next time FlexSearch is restarted or when the `employee` index is reloaded (`closed` then `opened` back).

### Search execution pipeline

Let's examine the search execution pipeline from scripting perspective. There are various places where a user can insert custom logic to modify the search behaviour. The first logical places Pre-search script. This can be used to perform operations like:

* Modify the input search data. This is helpful in cases where a user wants to enforce certain results. For example when a user searches for a specific input you may only want to return a specific result. In these cases you can investigate the incoming data and set the right parameters so that the platform always returns the right result. This stage can also be used to set default values for fields in case no data is provided. Another example would be to normalize an incoming telephone number to a certain format before submitting the search..

* Modify the search query parameters.

* Update the search profile name based on some dynamic condition.

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

### Pre-search script

A FlexSearch *pre-search script* is a snippet of F# code that gets executed before the search is run.

The source code of the script is loaded from the `script.fsx` file from the index configuration folder. A *PreSearch script* is a method within the `script.fsx` file that has a name starting with `preSearch` (e.g. `preSearchTest`).

Search scripts are loaded automatically on startup or when an index is opened. To add a new script you need to either restart the system or reload the index (`close`, then `open` it back again).

#### Usage

Pre-search scripts are stored in a `script.fsx` file located in the index configuration folder. For example, if you have an index named `contact`, you would write the `script.fsx` file at:

```
/conf/indices/contact/script.fsx
```  

Pre-search script methods have the following naming convention:

```
preSearch<script_name>

e.g. preSearchTest
```

And the following signature:

```fsharp
val preSearch<script_name> : SearchQuery -> unit

e.g. 
let preSearchTest (query: SearchQuery) = ()
```

The above signature means that we should have a function that takes a `SearchQuery` and returns nothing (`void`).

Having a `FlexSearch.Api.Model.SearchQuery` as a parameter gives you access to get or even set any of its properties. For example you can modify the columns to retrieve, or execute some code conditionally based on the query name, or modify the query string, etc.

Probably the most powerful feature is the access to the `Variables` (the `@variable_name` pieces from the query string) property from the `Search Query`. This means you can modify the values that get passed into the query string.


#### Example

Let's say you want to bring all the employees that have been in the company for more than 10 years. We assume that we have an `employee` index with the following fields:

* `yearJoined`
* `name`

You can initially write the following query on the `employee` index:

```flexsearch
gt(yearJoined, '2006')
```

And it will work just fine. But next year you'll realize you have to change the query from `2006` to `2007`. So here comes the variable to the rescue:

```flexsearch
gt(yearJoined, @tenYearsAgo)
```

In this case you would add an entry in the `SearchQuery.Variables` dictionary for:

```csharp
searchQuery.Variables.Add("tenyearsago", DateTime.Now.AddYears(-10).Year)
```

And then you would submit this search query to FlexSearch. This would work as well, but maybe it would be easier if you would just pass the current year and then substract 10 from it before submitting the search. You could reuse this piece of functionality for other queries as well. You can do this using a pre-search script!

You modify the search query string like so:

```
gt(yearJoined, @year)
```

And you create a new file in the `Conf/Indices/employee` folder called `script.fsx` in which you add the following code:

```csharp
module Script

open FlexSearch.Api.Model
open Helpers
open System

let preSearchTenYearsAgo (query : SearchQuery) =
    // Get the variable called "year". Take care of upper vs lower case.
    let kvp = query.Variables
              |> Seq.find (fun kv -> kv.Key.ToLower() = "year")

    // Modify / populate its value
    kvp.Value <- DateTime.Now.AddYears(-10).Year
```

Lastly, before submitting the `SearchQuery` you just need to specify that you want to use the newly created pre-search query:

```
searchQuery.PreSearchScript = "TenYearsAgo";
```

### Post-search script
Post-search script is still in development stage and we will add relevant documentation once the feature is finalized.