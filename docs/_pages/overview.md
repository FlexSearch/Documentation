---
title : Overview
area : quick-start
order : 100
---

### What is FlexSearch?

FlexSearch is a high performance REST based full-text searching platform built on top of the popular Lucene search library. At its core it is about extensibility and maintainability with minimum overhead. FlexSearch is written in F# & C# 5.0 (.net framework 4.6.1).

It has an extensive plug-in architecture with ability to customize most of the functionality with minimum amount of efforts. It also supports scripting which can be used at both search and index time to fine tune the data. One area where FlexSearch particularly excel, is providing easy extensible connector model which allows a developer to tap directly into core's indexing engine, thus avoiding the reliance on web services. This results in a greatly improved indexing performance when indexing over millions of records.

Some ideal use cases for the engine would be:

- Searching across unstructured text data on intranet and websites.
- Searching across structured data coming from SQL, CSV and other sources.
- Duplicate detection over large volume of structured data like customer information de-duplication, address matching etc.

### Basic Concepts

::: render attribution
link: https://cwiki.apache.org/confluence/display/solr/Overview+of+Documents%2C+Fields%2C+and+Schema+Design
:::

The fundamental premise of FlexSearch is simple. You give it a lot of information, then later you can ask it questions and find the piece of information you want. The part where you feed in all the information is called indexing or updating. When you ask a question, it's called a query.

One way to understand how FlexSearch works is to think of a loose-leaf book of recipes. Every time you add a recipe to the book, you update the index at the back. You list each ingredient and the page number of the recipe you just added. Suppose you add one hundred recipes. Using the index, you can very quickly find all the recipes that use garbanzo beans, or artichokes, or coffee, as an ingredient. Using the index is much faster than looking through each recipe one by one. Imagine a book of one thousand recipes, or one million.

FlexSearch allows you to build an index with many different fields, or types of entries. The example above shows how to build an index with just one field, ingredients. You could have other fields in the index for the recipe's cooking style, like Asian, Cajun, or vegan, and you could have an index field for preparation times. FlexSearch can answer questions like "What Cajun-style recipes that have blood oranges as an ingredient can be prepared in fewer than 30 minutes?"

##### Index hierarchy
<svg height="232px" style="width:232px;height:232px;" version="1.1" viewBox="0 0 232 232" width="232px"><defs><filter height="300%" id="f1" width="300%" x="-1" y="-1"><feGaussianBlur result="blurOut" stdDeviation="2.0"/><feColorMatrix in="blurOut" result="blurOut2" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .4 0"/><feOffset dx="4.0" dy="4.0" in="blurOut2" result="blurOut3"/><feBlend in="SourceGraphic" in2="blurOut3" mode="normal"/></filter></defs><g><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="152" x="38.5" y="8"/><text fill="#000000" font-family="Roboto" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="132" x="48.5" y="29.1387">Index (Recipe Book)</text><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="155" x="37" y="99"/><text fill="#000000" font-family="Roboto" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="135" x="47" y="120.1387">Documents (Recipe)</text><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="217" x="6" y="190"/><text fill="#000000" font-family="Roboto" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="197" x="16" y="211.1387">Fields (Name, Ingridients, Type)</text><path d="M114.5,42.324 C114.5,56.751 114.5,77.892 114.5,93.657 " fill="none" style="stroke: #383838; stroke-width: 1.0;"/><polygon fill="#383838" points="114.5,98.78,118.5,89.78,114.5,93.78,110.5,89.78,114.5,98.78" style="stroke: #383838; stroke-width: 1.0;"/><text fill="#000000" font-family="Roboto" font-size="13" lengthAdjust="spacingAndGlyphs" textLength="56" x="115.5" y="75.0669">Contains</text><path d="M114.5,133.324 C114.5,147.7515 114.5,168.8916 114.5,184.6566 " fill="none" style="stroke: #383838; stroke-width: 1.0;"/><polygon fill="#383838" points="114.5,189.7795,118.5,180.7795,114.5,184.7795,110.5,180.7795,114.5,189.7795" style="stroke: #383838; stroke-width: 1.0;"/><text fill="#000000" font-family="Roboto" font-size="13" lengthAdjust="spacingAndGlyphs" textLength="56" x="115.5" y="166.0669">Contains</text></g></svg>

<div class="hidden">
@startuml
skinparam monochrome true
skinparam defaultFontName Roboto

"Index (Recipe Book)" -->[Contains] "Documents (Recipe)"
-->[Contains] "Fields (Name, Ingridients, Type)"
@enduml
</div>

The schema is the place where you tell FlexSearch how it should build indexes from input documents.

::: info
In case of database analogy think of Index as a Database table which has fixed schema and requires the schema definition before creation of the table.
:::

### How FlexSearch Sees the World?

FlexSearch's basic unit of information is a document, which is a set of data that describes something. A recipe document would contain the ingredients, the instructions, the preparation time, the cooking time, the tools needed, and so on. A document about a person, for example, might contain the person's name, biography, favorite color, and shoe size. A document about a book could contain the title, author, year of publication, number of pages, and so on.

In the FlexSearch universe, documents are composed of fields, which are more specific pieces of information. Shoe size could be a field. First name and last name could be fields. Fields can contain different kinds of data. A name field, for example, is text (character data). A shoe size field might be a floating point number so that it could contain values like 6 and 9.5. Obviously, the definition of fields is flexible (you could define a shoe size field as a text field rather than a floating point number, for example), but if you define your fields correctly, FlexSearch will be able to interpret them correctly and your users will get better results when they perform a query. You can tell FlexSearch about the kind of data a field contains by specifying its field type. The field type tells FlexSearch how to interpret the field and how it can be queried. When you add a document, FlexSearch takes the information in the document's fields and adds that information to an index. When you perform a query, FlexSearch can quickly consult the index and return the matching documents.

::: info
In case of database analogy think of Document as the row of table.
:::


::: include text-analysis.md :::


### Some more jargon

#### Near Realtime (NRT)

Near Real Time (NRT) search means that documents are available for search almost immediately (usually 1 second) after being indexed: additions and updates to documents are seen in 'near' real time. FlexSearch does not block updates while a commit is in progress. Nor does it wait for background merges to complete before opening a new search of indexes and returning.

#### Shards

When your data is too large for a single index, you can break it up and store it in smaller indices by creating one or more shards. Each shard is a self contained Lucene index capable of functioning alone. When you create an index, you can define the number of shards that you want. 

::: warning
#### Maximum size of Shard
The maximum number of documents that a single shard can hold is  2,147,483,519. Refer: [LUCENE-5843](https://issues.apache.org/jira/browse/LUCENE-5843) for more information.
:::