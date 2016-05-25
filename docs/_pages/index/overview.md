---
title : Indexing Overview
area : index
order : 100
description: Fundamental of FlexSeach indexing
keywords: indexing, documents, fields
---

::: render attribution
link: https://cwiki.apache.org/confluence/display/solr/Overview+of+Documents%2C+Fields%2C+and+Schema+Design
:::

The fundamental premise of FlexSearch is simple. You give it a lot of information, then later you can ask it questions and find the piece of information you want. The part where you feed in all the information is called indexing or updating. When you ask a question, it's called a query.

One way to understand how FlexSearch works is to think of a loose-leaf book of recipes. Every time you add a recipe to the book, you update the index at the back. You list each ingredient and the page number of the recipe you just added. Suppose you add one hundred recipes. Using the index, you can very quickly find all the recipes that use garbanzo beans, or artichokes, or coffee, as an ingredient. Using the index is much faster than looking through each recipe one by one. Imagine a book of one thousand recipes, or one million.

FlexSearch allows you to build an index with many different fields, or types of entries. The example above shows how to build an index with just one field, ingredients. You could have other fields in the index for the recipe's cooking style, like Asian, Cajun, or vegan, and you could have an index field for preparation times. FlexSearch can answer questions like "What Cajun-style recipes that have blood oranges as an ingredient can be prepared in fewer than 30 minutes?"

The schema is the place where you tell FlexSearch how it should build indexes from input documents.

### How FlexSearch Sees the World?

FlexSearch's basic unit of information is a document, which is a set of data that describes something. A recipe document would contain the ingredients, the instructions, the preparation time, the cooking time, the tools needed, and so on. A document about a person, for example, might contain the person's name, biography, favorite color, and shoe size. A document about a book could contain the title, author, year of publication, number of pages, and so on.

In the FlexSearch universe, documents are composed of fields, which are more specific pieces of information. Shoe size could be a field. First name and last name could be fields. Fields can contain different kinds of data. A name field, for example, is text (character data). A shoe size field might be a floating point number so that it could contain values like 6 and 9.5. Obviously, the definition of fields is flexible (you could define a shoe size field as a text field rather than a floating point number, for example), but if you define your fields correctly, FlexSearch will be able to interpret them correctly and your users will get better results when they perform a query. You can tell FlexSearch about the kind of data a field contains by specifying its field type. The field type tells FlexSearch how to interpret the field and how it can be queried. When you add a document, FlexSearch takes the information in the document's fields and adds that information to an index. When you perform a query, FlexSearch can quickly consult the index and return the matching documents.

### Field Analysis
Field analysis tells FlexSearch what to do with incoming data when building an index. A more accurate name for this process would be processing or even digestion, but the official name is `analysis`.

Consider, for example, a biography field in a person document. Every word of the biography must be indexed so that you can quickly find people whose lives have had anything to do with ketchup, or dragonflies, or cryptography. However, a biography will likely contains lots of words you don't care about and don't want clogging up your index—words like "the", "a", "to", and so forth. Furthermore, suppose the biography contains the word "Ketchup", capitalized at the beginning of a sentence. If a user makes a query for "ketchup", you want FlexSearch to tell you about the person even though the biography contains the capitalized word.

The solution to both these problems is field analysis. For the biography field, you can tell FlexSearch how to break apart the biography into words. You can tell FlexSearch that you want to make all the words lower case, and you can tell FlexSearch to remove accents marks.

Field analysis is an important part of a field type. [Understanding Analyzers, Tokenizers and Filters]() is a detailed description of field analysis.

### FlexSearch's Schema File
FlexSearch stores details about the field types and fields it is expected to understand in a schema file. The name of the file is `index.json` and location of this file under the `conf/indices/{indexName}` folder in the root of your FlexSearch directory. You can either modify this file directly in case you are feeling adventrous or rely on the REST webservices exposed by FlexSearch.

::: info
Every part of the schema file can be modified using the webservice.
::: 