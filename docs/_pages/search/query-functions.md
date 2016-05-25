---
title : Query Functions
area : search
order : 300
selectednavbaritem : docs
description: Information about all the query types supported by FlexSearch
keywords: query, search, allof, anyof, fuzzy, like, regex, gt, lt, gte, lte, matchall, matchnone
---


::: include data_notice.md :::

### How query works?

In order to understand how the different query types work, it would be beneficial to understand the basic processing that happens before a query is processed. The following flow chart defines the steps that a query string goes through before being submitted to the underlying Lucene engine:


<svg height="558px" style="width:790px;height:558px;" version="1.1" viewBox="0 0 790 558" width="790px"><defs><filter height="300%" id="f1" width="300%" x="-1" y="-1"><feGaussianBlur result="blurOut" stdDeviation="2.0"/><feColorMatrix in="blurOut" result="blurOut2" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .4 0"/><feOffset dx="4.0" dy="4.0" in="blurOut2" result="blurOut3"/><feBlend in="SourceGraphic" in2="blurOut3" mode="normal"/></filter></defs><g><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="241" x="185" y="10"/><text fill="#000000" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="221" x="195" y="31.1387">Parse Query String &amp; Generate AST</text><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="198" x="206.5" y="63.9688"/><text fill="#000000" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="178" x="216.5" y="85.1074">Process conditions from AST</text><rect fill="#F8F8F8" filter="url(#f1)" height="89.8438" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="198" x="206.5" y="117.9375"/><text fill="#000000" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="178" x="216.5" y="139.0762">Validate Condition including:</text><text fill="#000000" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="77" x="228.5" y="153.0449">- Field Name</text><text fill="#000000" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="70" x="228.5" y="167.0137">- Field Type</text><text fill="#000000" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="83" x="228.5" y="180.9824">- Field Values</text><text fill="#000000" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="77" x="228.5" y="194.9512">- Query Type</text><polygon fill="#F8F8F8" filter="url(#f1)" points="197,227.7813,414,227.7813,426,239.7813,414,251.7813,197,251.7813,185,239.7813,197,227.7813" style="stroke: #383838; stroke-width: 1.5;"/><text fill="#000000" font-family="sans-serif" font-size="11" lengthAdjust="spacingAndGlyphs" textLength="217" x="197" y="243.5894">Query type supports search analyzer?</text><text fill="#000000" font-family="sans-serif" font-size="11" lengthAdjust="spacingAndGlyphs" textLength="14" x="171" y="237.187">no</text><text fill="#000000" font-family="sans-serif" font-size="11" lengthAdjust="spacingAndGlyphs" textLength="20" x="426" y="237.187">yes</text><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="193" x="10" y="261.7813"/><text fill="#000000" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="173" x="20" y="282.9199">Convert value to lower case</text><polygon fill="#F8F8F8" filter="url(#f1)" points="409.5,261.7813,599.5,261.7813,611.5,273.7813,599.5,285.7813,409.5,285.7813,397.5,273.7813,409.5,261.7813" style="stroke: #383838; stroke-width: 1.5;"/><text fill="#000000" font-family="sans-serif" font-size="11" lengthAdjust="spacingAndGlyphs" textLength="190" x="409.5" y="277.5894">Does field type support analyzer?</text><text fill="#000000" font-family="sans-serif" font-size="11" lengthAdjust="spacingAndGlyphs" textLength="20" x="377.5" y="271.187">yes</text><text fill="#000000" font-family="sans-serif" font-size="11" lengthAdjust="spacingAndGlyphs" textLength="14" x="611.5" y="271.187">no</text><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="258" x="233" y="295.7813"/><text fill="#000000" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="238" x="243" y="316.9199">Parse value using the search analyzer</text><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="272" x="511" y="295.7813"/><text fill="#000000" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="252" x="521" y="316.9199">Convert value to internal representation</text><polygon fill="#F8F8F8" filter="url(#f1)" points="504.5,335.75,516.5,347.75,504.5,359.75,492.5,347.75,504.5,335.75" style="stroke: #383838; stroke-width: 1.5;"/><polygon fill="#F8F8F8" filter="url(#f1)" points="305.5,365.75,317.5,377.75,305.5,389.75,293.5,377.75,305.5,365.75" style="stroke: #383838; stroke-width: 1.5;"/><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="156" x="227.5" y="409.75"/><text fill="#000000" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="136" x="237.5" y="430.8887">Query Type Processor</text><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="168" x="221.5" y="463.7188"/><text fill="#000000" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="148" x="231.5" y="484.8574">Generate Lucene Query</text><rect fill="#F8F8F8" filter="url(#f1)" height="33.9688" rx="12.5" ry="12.5" style="stroke: #383838; stroke-width: 1.5;" width="110" x="250.5" y="517.6875"/><text fill="#000000" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="90" x="260.5" y="538.8262">Execute Query</text><line style="stroke: #383838; stroke-width: 1.5;" x1="305.5" x2="305.5" y1="43.9688" y2="63.9688"/><polygon fill="#383838" points="301.5,53.9688,305.5,63.9688,309.5,53.9688,305.5,57.9688" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="305.5" x2="305.5" y1="97.9375" y2="117.9375"/><polygon fill="#383838" points="301.5,107.9375,305.5,117.9375,309.5,107.9375,305.5,111.9375" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="397.5" x2="362" y1="273.7813" y2="273.7813"/><line style="stroke: #383838; stroke-width: 1.5;" x1="362" x2="362" y1="273.7813" y2="295.7813"/><polygon fill="#383838" points="358,285.7813,362,295.7813,366,285.7813,362,289.7813" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="611.5" x2="647" y1="273.7813" y2="273.7813"/><line style="stroke: #383838; stroke-width: 1.5;" x1="647" x2="647" y1="273.7813" y2="295.7813"/><polygon fill="#383838" points="643,285.7813,647,295.7813,651,285.7813,647,289.7813" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="362" x2="362" y1="329.75" y2="347.75"/><line style="stroke: #383838; stroke-width: 1.5;" x1="362" x2="492.5" y1="347.75" y2="347.75"/><polygon fill="#383838" points="482.5,343.75,492.5,347.75,482.5,351.75,486.5,347.75" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="647" x2="647" y1="329.75" y2="347.75"/><line style="stroke: #383838; stroke-width: 1.5;" x1="647" x2="516.5" y1="347.75" y2="347.75"/><polygon fill="#383838" points="526.5,343.75,516.5,347.75,526.5,351.75,522.5,347.75" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="185" x2="106.5" y1="239.7813" y2="239.7813"/><line style="stroke: #383838; stroke-width: 1.5;" x1="106.5" x2="106.5" y1="239.7813" y2="261.7813"/><polygon fill="#383838" points="102.5,251.7813,106.5,261.7813,110.5,251.7813,106.5,255.7813" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="426" x2="504.5" y1="239.7813" y2="239.7813"/><line style="stroke: #383838; stroke-width: 1.5;" x1="504.5" x2="504.5" y1="239.7813" y2="261.7813"/><polygon fill="#383838" points="500.5,251.7813,504.5,261.7813,508.5,251.7813,504.5,255.7813" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="106.5" x2="106.5" y1="295.75" y2="377.75"/><line style="stroke: #383838; stroke-width: 1.5;" x1="106.5" x2="293.5" y1="377.75" y2="377.75"/><polygon fill="#383838" points="283.5,373.75,293.5,377.75,283.5,381.75,287.5,377.75" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="504.5" x2="504.5" y1="359.75" y2="377.75"/><line style="stroke: #383838; stroke-width: 1.5;" x1="504.5" x2="317.5" y1="377.75" y2="377.75"/><polygon fill="#383838" points="327.5,373.75,317.5,377.75,327.5,381.75,323.5,377.75" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="305.5" x2="305.5" y1="207.7813" y2="227.7813"/><polygon fill="#383838" points="301.5,217.7813,305.5,227.7813,309.5,217.7813,305.5,221.7813" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="305.5" x2="305.5" y1="389.75" y2="409.75"/><polygon fill="#383838" points="301.5,399.75,305.5,409.75,309.5,399.75,305.5,403.75" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="305.5" x2="305.5" y1="443.7188" y2="463.7188"/><polygon fill="#383838" points="301.5,453.7188,305.5,463.7188,309.5,453.7188,305.5,457.7188" style="stroke: #383838; stroke-width: 1.0;"/><line style="stroke: #383838; stroke-width: 1.5;" x1="305.5" x2="305.5" y1="497.6875" y2="517.6875"/><polygon fill="#383838" points="301.5,507.6875,305.5,517.6875,309.5,507.6875,305.5,511.6875" style="stroke: #383838; stroke-width: 1.0;"/></g></svg>

<div class="hidden">
http://www.planttext.com/planttext
@startuml
skinparam monochrome true
:Parse Query String & Generate AST;
:Process conditions from AST;
:Validate Condition including:
    - Field Name
    - Field Type
    - Field Values
    - Query Type;

if (Query type supports search analyzer?) then (no)
    :Convert value to lower case;
else (yes)
    if (Does field type support analyzer?) then (yes)
        :Parse value using the search analyzer;
    else (no)
        :Convert value to internal representation;
    endif
endif

:Query Type Processor;
:Generate Lucene Query;
:Execute Query;
@enduml
</div>


1. The query string is processed using a query parser which generates an abstract syntax tree from the input. Think of abstract syntax tree as a machine
understandable representation of the original query string. The AST contains information about the query types and the clauses.

2. Process each individual condition from the AST.

3. Each condition goes through multiple validation steps which includes things like checking that the field name is valid, the query type is valid and valid
field values are provided. If no valid value is specified then the query processor looks for the defined missing field behaviour.

4. Each query type has different behaviour associated with it. For example some query types are designed to work with multiple tokens, phrases, positional matching
etc. Once we have identified the correct query type for the condition then it is checked if the query type supports search analyzer. Certain query types avoid
search time analysis to avoid tampering with the input. For example `like` query type avoids search analyzer as the analyzer may remove certain special characters
like `?` and `*`.

5. In case the query type supports an analyzer then the provided analyzer is used or the input text is converted to the internal representation for the given field
type. For example Boolean fields are internally saved as `T` and `F` to represent true and false values. This is done to save disk space. These fields don't support
sophisticated analysis so they are configured not to use an analyzer. In case the query type does not support a search time analyzer then the input value is simply
converted into lowercase to force case insensitive matching.

6. The newly passed tokens are passed into the query type processor which generates a Lucene equivalent query from it. A query type processor is also responsible for
processing query type specific switches.

7. Once all the query types are processed then a master Lucene query is built which is executed to produce search results.

### General Query properties
These properties are specified for each query type in the information box provided at the beginning of each query documentation.

#### Search Analyzer support & Boolean generation behaviour
This property signifies if a query type supports search time analysis or not? As explained earlier some query types bypass search time analysis to avoid removal
of special characters from the input text.

To illustrate an example of search analyzer support, when the below query is executed:

```flexsearch
allof(agriproducts, 'Rice wheat', 'BARLEY')
```
It will be converted into three queries as shown below:

```flexsearch
allof(agriproducts, 'rice') AND allof(agriproducts, 'wheat') AND allof(agriproducts, 'BARLEY')
```

Here are two things have happened:

1. The original query has two tokens `Rice wheat` and `BARLEY`. After going through the search analyzer the two tokens will get converted into three tokens
(this is assuming that a standard analyzer is used at search time). The three new tokens are: `rice`,`wheat` and `barley`.

2. The second thing which happens is the Boolean behaviour. In this case the three tokens are joined using a `and`operator. Each query type has different
configured behaviour when it comes to generating Boolean query. Boolean queries are automatically generated when possible.

#### Positional match support
This property signifies if the query type supports positional matching of the tokens in the field value. Query types which do not support positional matching
will match a given token or tokens anywhere in the corpus. Usually the query types which support positional matching will associate special meaning to the
order in which the field values are specified for a given query type.

#### Field Values Order
This property signifies if the query type gives any special emphasis to the order in which multiple field values are specified. This is usually associated
with the positional match support.

For example, the AllOf query supports multiple field values per clause and the order in which the field values are specified does not matter.

```flexsearch
allof(agriproducts, 'rice', 'wheat')
```

is same as

```flexsearch
allof(agriproducts, 'wheat', 'rice')
```

#### Multiple field values per clause
This property signifies if a user can pass multiple search values but clause. This is helpful in simplifying the query in case the same query type is to be
used for multiple values.

```flexsearch
allof(agriproducts, 'rice', 'wheat')
```
In the above example the query type has support for multiple field values per clause. Here we have passed rice and wheat as two separate field values in the
same query clause.

### AllOf

`AllOf` query is the simplest of the term related queries which forces all the specified terms to match in a given input. This query does not take position in
consideration and will match terms out of order.

::: render info_box
Search Analyzer : Supported
Boolean behaviour: And
Positional match : Unsupported
Field Value order : Does not matter
Multiple field values per clause: Yes
:::

#### Query Examples
The following search query returns all documents containing `Wheat` and `Rice` both, in the `agriproducts` field.

::: render search_result
data-file : search-alloftest2
:::

The above query is semantically similar to the below queries:

```flexsearch
allof(agriproducts, 'rice') and allof(agriproducts, 'wheat')
```

```flexsearch
allof(agriproducts, 'rice', 'wheat')
```

```flexsearch
allof(agriproducts, 'wheat rice')
```

### AnyOf

`AnyOf` query is the simplest of the term related queries which forces one of the specified term to match in a given input. This query does not take position
in consideration and will match terms out of order.

::: render info_box
Search Analyzer : Supported
Boolean behaviour: Or
Positional match : Unsupported
Field Value order : Does not matter
Multiple field values per clause: Yes
:::

#### Query Examples
The following search query returns all documents containing `Wheat` or `Rice` or both, in the `agriproducts` field.

::: render search_result
data-file : search-anyoftest2
:::

The above query is semantically similar to the below queries:

```flexsearch
anyOf(agriproducts, 'rice') and anyOf(agriproducts, 'wheat')
```

```flexsearch
anyOf(agriproducts, 'rice', 'wheat')
```

```flexsearch
anyOf(agriproducts, 'wheat rice')
```

### Phrase match

A Query that matches documents containing a particular sequence of terms.

::: render info_box
Search Analyzer : Supported
Boolean behaviour: Or
Positional match : Supported
Field Value order : Matters
Multiple field values per clause: Yes
:::

#### Query Examples

The following search query returns all documents containing the 3 words `federal parliamentary democracy` is exactly the same order.

::: render search_result
data-file : search-phrasetest1
:::

Unlike the previous query types, phrase match input has positional relevance. Here instead of passing a single token as `fedral parliamentary democracy`, if we
pass them as three tokens the overall result will be different as the query will be treated as 3 phrase match queries and will be joined using an `OR` operator.

::: warning
Be careful with phrase matches as the order of token and the number of tokens can affect the search results drastically.
:::


::: render search_result
data-file : search-phrasetest2
:::

Phrase query also supports `slop` parameter. By default the slop is set to 0 which means match in exact order. A minimum slop of 2 is required to change the
order of the terms.

::: warning
Specifying `slop` in phrase query does not maintain the order of the terms. The query is reduced to a term query with the terms being in the specified range of each other.
:::


::: render search_result
data-file : search-phrasetest3
:::

Below query demonstrated the behaviour when slop is used to match the same words from the above query but in reverse order.

::: render search_result
data-file : search-phrasetest4
:::

Phrase match query also supports an additional switch: `multiphrase`. This switch can be used to enforce additional positional matching at the same position. For
example let's say we want to match word `parliamentary` followed by either `democracy` or `system`. This can be easily accomplished by using multiphrase
switch.

::: render search_result
data-file : search-phrasetest5
:::

::: render search_result
data-file : search-phrasetest6
:::

::: render search_result
data-file : search-phrasetest7
:::


### Fuzzy

Implements the fuzzy search query. The similarity measurement is based on the Damerau-Levenshtein (optimal string alignment) algorithm. At most, this query
will match terms up to 2 edits. Higher distances, are generally not useful and will match a significant amount of the term dictionary.

::: render info_box
Search Analyzer : Supported
Boolean behaviour: Or
Positional match : Unsupported
Field Value order : Does not matter
Multiple field values per clause: Yes
:::


Parameter |Default |Type |Description
--- | --- | --- | ---
`prefixlength` |0 |int |Length of common (non-fuzzy) prefix.
`slop` |1 |int |The number of allowed edits

#### Query Examples
The following search query returns all documents containing `Iran` and all documents containing `Iran` with 1 character difference, in the `countryname`
field.

::: render search_result
data-file : search-fuzzytest1
:::

The following search query demonstrates the use of `slop` operator. It returns all countries similar to `China` with a difference of two characters.

::: render search_result
data-file : search-fuzzytest2
:::

### Like

Implements the wildcard search query. Supported wildcards are `*`, which matches any character sequence (including the empty one), and `?`, which matches any
single character. Note this query can be slow, as it needs to iterate over many terms.

::: render info_box
Search Analyzer : Unsupported
Boolean behaviour: Or
Positional match : Unsupported
Field Value order : Does not matter
Multiple field values per clause: Yes
:::

::: info
In order to prevent extremely slow Wildcard Queries, a Wildcard term should not start with the wildcard *.
:::

#### Query Examples

The following search query returns all documents with `uni` coming anywhere in the word.

::: render search_result
data-file : search-liketest1
:::

The following query will match any word where it starts with `Unit` followed by any single character and ends with `d`.

::: render search_result
data-file : search-liketest2
:::

### Regex

A fast regular expression query based on the `org.apache.lucene.util.automaton` package. Comparisons are fast.

::: render info_box
Search Analyzer : Unsupported
Boolean behaviour: Or
Positional match : Unsupported
Field Value order : Does not matter
Multiple field values per clause: Yes
:::

The term dictionary is enumerated in an intelligent way, to avoid comparisons.
The supported syntax is documented in the Java RegExp class.

::: warning
This query can be slow, as it needs to iterate over many terms. In order to
prevent extremely slow RegexpQueries, a Regexp term should not start with the
expression `*`.
:::

#### Query Examples

The following search query matches all the documents containing `silk` and `milk`.

::: render search_result
data-file : search-regextest1
:::

### Numeric range operator

A Query that matches numeric values within a specified range. To use this, you must first index the numeric values using `Int`, `Long`, `DateTime`, `Date` or `Double`.

::: render info_box
Search Analyzer : Unsupported
Boolean behaviour: Unsupported
Positional match : Unsupported
Field Value order : Should be the first token
Multiple field values per clause: No
:::

::: info
Range supports `gt` (greater than), `ge` (greater or equal), `lt` (less than) and
`le` (less or equal) functions.
:::

#### Query Examples

```flexsearch
gt(population, '1000000')
```

```flexsearch
ge(population, '1000000')
```

```flexsearch
lt(population, '1000000')
```

```flexsearch
le(population, '1000000')
```

### Match all

A query that matches all documents. It is a useful query to iterate over all documents in an index.

::: render info_box
Search Analyzer : Unsupported
Boolean behaviour: Unsupported
Positional match : Unsupported
Field Value order : Unsupported
Multiple field values per clause: Unsupported
:::

#### Query Examples
The following search query matches all the documents in the index.

```flexsearch
matchall(countryname, '*')
```

### Match None
A query that matches no documents. It is a useful query to ensure that a clause never matched anything under specific conditions.

::: render info_box
Search Analyzer : Unsupported
Boolean behaviour: Unsupported
Positional match : Unsupported
Field Value order : Unsupported
Multiple field values per clause: Unsupported
:::
