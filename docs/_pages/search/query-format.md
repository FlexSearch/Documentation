---
title : Query Format
area : search
order : 200
description: Information about all the query format supported by FlexSearch
keywords: query, search, clause, switch
---

FlexSearch utilizes custom query format which enables advance customization with minimal effort. Score manipulation, short circuiting of clauses etc can be achieved by using simple switches.

Let's start understanding Query syntax by going through some basic stuff.

<div>
<style type="text/css">
    .line                 {fill: none; stroke: #332200;}
    .bold-line            {stroke: #140E00; shape-rendering: crispEdges; stroke-width:2; }
    .thin-line            {stroke: #1F1400; shape-rendering: crispEdges}
    .filled               {fill: #332200; stroke: none;}
    text.terminal         {font-family: Verdana, Sans-serif;font-size: 12px;fill: #140E00;font-weight: bold;}
    text.nonterminal      {font-family: Verdana, Sans-serif;font-size: 12px;fill: #1A1100;}
    text.regexp           {font-family: Verdana, Sans-serif;font-size: 12px;fill: #1F1400;}
    rect, circle, polygon {fill: #332200; stroke: #332200;}
    rect.terminal         {fill: #FFC34D; stroke: #332200;}
    rect.nonterminal      {fill: #FFDF9E; stroke: #332200;}
    rect.text             {fill: none; stroke: none;}
    polygon.regexp        {fill: #FFECC7; stroke: #332200;}
    svg                   {margin-top:10px; margin-bottom:24px}
</style>
</div>

### Identifier

An identifier is any set of alphanumeric characters without `(`, `)` and `space` characters.

<div id="Identifier">
    <svg width="470" height="52">
         <polygon points="9 33 1 29 1 37"/>
         <polygon points="17 33 9 29 9 37"/>
         <rect x="51" y="19" width="372" height="32" rx="10"/>
         <rect x="49" y="17" width="372" height="32" class="terminal" rx="10"/>
         <text class="terminal" x="59" y="37">Any ALPHANUMERIC character except ( or ) or space</text>
         <path class="line" d="m17 33 h2 m20 0 h10 m372 0 h10 m-412 0 l20 0 m-1 0 q-9 0 -9 -10 l0 -12 q0 -10 10 -10 m392 32 l20 0 m-20 0 q10 0 10 -10 l0 -12 q0 -10 -10 -10 m-392 0 h10 m0 0 h382 m23 32 h-3"/>
         <polygon points="461 33 469 29 469 37"/>
         <polygon points="461 33 453 29 453 37"/>
      </svg>
</div>

Identifiers are used to represent field names and query names in the engine.

::: info
#### Examples 
`firstname`, `allOf`, `anyOf`
:::

### Constant

A contant is any set of unicode characters between single quote. Back slash can be used to escape a single quote in the input. The reason to use Single Quote to represent constants in the engine is to allow easy embedding of the queries in JSON objects.

<div id="Constant">
    <svg width="502" height="112">
         <polygon points="9 33 1 29 1 37"/>
         <polygon points="17 33 9 29 9 37"/>
         <rect x="31" y="19" width="24" height="32" rx="10"/>
         <rect x="29" y="17" width="24" height="32" class="terminal" rx="10"/>
         <text class="terminal" x="39" y="37">'</text>
         <rect x="135" y="19" width="236" height="32" rx="10"/>
         <rect x="133" y="17" width="236" height="32" class="terminal" rx="10"/>
         <text class="terminal" x="143" y="37">Any UNICODE character except '</text>
         <rect x="135" y="63" width="28" height="32" rx="10"/>
         <rect x="133" y="61" width="28" height="32" class="terminal" rx="10"/>
         <text class="terminal" x="143" y="81">\</text>
         <rect x="183" y="63" width="108" height="32" rx="10"/>
         <rect x="181" y="61" width="108" height="32" class="terminal" rx="10"/>
         <text class="terminal" x="191" y="81">' single quote</text>
         <rect x="451" y="19" width="24" height="32" rx="10"/>
         <rect x="449" y="17" width="24" height="32" class="terminal" rx="10"/>
         <text class="terminal" x="459" y="37">'</text>
         <path class="line" d="m17 33 h2 m0 0 h10 m24 0 h10 m60 0 h10 m236 0 h10 m-276 0 h20 m256 0 h20 m-296 0 q10 0 10 10 m276 0 q0 -10 10 -10 m-286 10 v24 m276 0 v-24 m-276 24 q0 10 10 10 m256 0 q10 0 10 -10 m-266 10 h10 m28 0 h10 m0 0 h10 m108 0 h10 m0 0 h80 m-296 -44 l20 0 m-1 0 q-9 0 -9 -10 l0 -12 q0 -10 10 -10 m296 32 l20 0 m-20 0 q10 0 10 -10 l0 -12 q0 -10 -10 -10 m-296 0 h10 m0 0 h286 m-336 32 h20 m336 0 h20 m-376 0 q10 0 10 10 m356 0 q0 -10 10 -10 m-366 10 v58 m356 0 v-58 m-356 58 q0 10 10 10 m336 0 q10 0 10 -10 m-346 10 h10 m0 0 h326 m20 -78 h10 m24 0 h10 m3 0 h-3"/>
         <polygon points="493 33 501 29 501 37"/>
         <polygon points="493 33 485 29 485 37"/>
      </svg>
</div>

A constant is used to represent search values in a query.

::: info
#### Examples 
`'United Kingdom'`, `Andrew\'s Car`
:::

### Variable

A variable is an identifier preceded by a `@` character.

<div id="Variable">
    <svg width="186" height="36">
         <polygon points="9 17 1 13 1 21"/>
         <polygon points="17 17 9 13 9 21"/>
         <rect x="31" y="3" width="32" height="32" rx="10"/>
         <rect x="29" y="1" width="32" height="32" class="terminal" rx="10"/>
         <text class="terminal" x="39" y="21">@</text>
         <a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#Identifier" xlink:title="Identifier">
            <rect x="83" y="3" width="76" height="32"/>
            <rect x="81" y="1" width="76" height="32" class="nonterminal"/>
            <text class="nonterminal" x="91" y="21">Identifier</text>
         </a>
         <path class="line" d="m17 17 h2 m0 0 h10 m32 0 h10 m0 0 h10 m76 0 h10 m3 0 h-3"/>
         <polygon points="177 17 185 13 185 21"/>
         <polygon points="177 17 169 13 169 21"/>
      </svg>
</div>

Variables are used to represent dynamic values in a query. These values can be passed by user or can be calculated using scripts etc.

::: info
#### Examples 
Example: `@firstname`, `@exchangerate`
:::

### Switch

A switch is a key value pair where the value part is optional. It is used for configuring the query behaviour.

<div id="Switch">
    <svg width="318" height="68">
         <polygon points="9 17 1 13 1 21"/>
         <polygon points="17 17 9 13 9 21"/>
         <rect x="31" y="3" width="26" height="32" rx="10"/>
         <rect x="29" y="1" width="26" height="32" class="terminal" rx="10"/>
         <text class="terminal" x="39" y="21">-</text>
         <a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#Identifier" xlink:title="Identifier">
            <rect x="77" y="3" width="76" height="32"/>
            <rect x="75" y="1" width="76" height="32" class="nonterminal"/>
            <text class="nonterminal" x="85" y="21">Identifier</text>
         </a>
         <a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#Constant" xlink:title="Constant">
            <rect x="193" y="35" width="78" height="32"/>
            <rect x="191" y="33" width="78" height="32" class="nonterminal"/>
            <text class="nonterminal" x="201" y="53">Constant</text>
         </a>
         <path class="line" d="m17 17 h2 m0 0 h10 m26 0 h10 m0 0 h10 m76 0 h10 m20 0 h10 m0 0 h88 m-118 0 h20 m98 0 h20 m-138 0 q10 0 10 10 m118 0 q0 -10 10 -10 m-128 10 v12 m118 0 v-12 m-118 12 q0 10 10 10 m98 0 q10 0 10 -10 m-108 10 h10 m78 0 h10 m23 -32 h-3"/>
         <polygon points="309 17 317 13 317 21"/>
         <polygon points="309 17 301 13 301 21"/>
      </svg>
</div>

::: info
#### Examples 
`-filter`, `-matchall`, `-constantscore '2'`
:::

### Global Switch

These are global in sense that these can be applied to any query type.

#### MatchAll switch

This switch basically short circuits the query in case no value is provided for the field to be searched. This is useful if you don't want a condition to be applicable when there is no value to be searched.

```flexsearch
anyOf(lastname, 'smith', 'doe') AND anyOf(firstname, @firstname, -matchall)
```

In the above example if the user doesn't provide a value for the variable `@firstname` then the 
condition will be ignored. The query will effectively be short circuited to:

```flexsearch
anyOf(lastname, 'smith', 'doe') AND *
```

This construct is useful when preforming duplicate detection over a set of uncleansed data. So, 
the queries can easily handle missing values.

#### MatchNone switch

This switch is basically the reverse of MatchAll switch, it forces no match in case no value 
is provided for the field to be searched. This is useful if you don't want a condition to be 
match anything when there is no value to be searched.

```flexsearch
anyOf(lastname, 'smith', 'doe') AND anyOf(firstname, @firstname, -matchnone)
```

In the above example if the user doesn't provide a value for the variable `@firstname` then the 
condition will be force the clause to match no documents. The query will effectively be short 
circuited to:

```flexsearch
anyOf(lastname, 'smith', 'doe') AND anyOf(firstname, 'non existing value')
```

#### MatchFieldDefault switch

This switch uses the field's default value in case no value is provided for the field to be 
searched. This is useful if you don't want a condition to be match anything but the field's 
default value when there is no value to be searched.

```flexsearch
anyOf(lastname, 'smith', 'doe') AND anyOf(firstname, @firstname, -matchFieldDefault)
```

In the above example if the user doesn't provide a value for the variable `@firstname` then 
the condition will be force the clause to use null as the search value. The query will 
effectively transformed to:

```flexsearch
anyOf(lastname, 'smith', 'doe') AND anyOf(firstname, 'null')
```

If the field is a numeric type then the corresponding default numeric value will be used.

#### UseDefault switch

This switch uses the default value provided in the switch in case no value is provided for 
the field to be searched. This is useful if you don't want a condition to be match anything 
but the default value when there is no value to be searched.

```flexsearch
anyOf(lastname, 'smith', 'doe') AND anyOf(firstname, @firstname, -useDefault 'jimmy')
```

In the above example if the user doesn't provide a value for the variable `@firstname` then the 
condition will be force the clause to use jimmy as the search value. The query will effectively 
transformed to:

```flexsearch
anyOf(lastname, 'smith', 'doe') AND anyOf(firstname, 'jimmy')
```

#### Boost switch

This switch boosts the score of a matching condition by a factor provided as part 
of the switch.

```flexsearch
anyOf(lastname, 'smith', 'doe') AND anyOf(firstname, 'roger', -boost '2')
```

In the above example the score of the 2nd anyOf condition will be increased by a factor of 
2 if the firstname matches roger. This is useful to improve the relative priority of certain 
conditions compared to other conditions.

#### ConstantScore switch

This switch provides a constant score to a matching condition.

```flexsearch
anyOf(lastname, 'smith', 'doe') AND anyOf(firstname, 'roger', -constantScore '2')
```

In the above example the score of the 2nd anyOf condition will have a score of 2 if the 
firstname matches roger.

#### NoScore switch

This switch removes any socre associated with a matching condition. This is equivalent to forcing 
the condition to act as a filter.

```flexsearch
anyOf(lastname, 'smith', 'doe') AND anyOf(firstname, 'roger', -noScore)
```

In the above example the 2nd anyOf condition will not contribute to the overall score.

This is useful to remove filtering clauses from contributing to the overrall score. For example if you 
have a field called state which saves the state of the record. You would not like it to contribute to the 
overall score as most of the records will have it set to 'active'.

### Query specific switch

These are specific to a particular query type and are used to fine tune the query behaviour. Applying 
these to unsupported query types will not result in an error but will definately produce unexpected 
behaviour.

### Condition

A condition is the smallest unit of a query which specifies the search criteria to be applied for a 
single field. A single condition is a valid query.

A condition at minimum requires: 

- Name of the query 
- The field on which the query is to be applied 
- Atleast a single source of value for the query. This can come from a variable or constant.

<div id="Condition">
    <svg width="698" height="140">
         <polygon points="9 33 1 29 1 37"/>
         <polygon points="17 33 9 29 9 37"/>
         <rect x="51" y="51" width="48" height="32" rx="10"/>
         <rect x="49" y="49" width="48" height="32" class="terminal" rx="10"/>
         <text class="terminal" x="59" y="69">NOT</text>
         <a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#QueryOperator" xlink:title="QueryOperator">
            <rect x="139" y="19" width="114" height="32"/>
            <rect x="137" y="17" width="114" height="32" class="nonterminal"/>
            <text class="nonterminal" x="147" y="37">QueryOperator</text>
         </a>
         <rect x="273" y="19" width="26" height="32" rx="10"/>
         <rect x="271" y="17" width="26" height="32" class="terminal" rx="10"/>
         <text class="terminal" x="281" y="37">(</text>
         <a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#FieldName" xlink:title="FieldName">
            <rect x="319" y="19" width="84" height="32"/>
            <rect x="317" y="17" width="84" height="32" class="nonterminal"/>
            <text class="nonterminal" x="327" y="37">FieldName</text>
         </a>
         <rect x="443" y="19" width="24" height="32" rx="10"/>
         <rect x="441" y="17" width="24" height="32" class="terminal" rx="10"/>
         <text class="terminal" x="451" y="37">,</text>
         <a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#Variable" xlink:title="Variable">
            <rect x="507" y="19" width="70" height="32"/>
            <rect x="505" y="17" width="70" height="32" class="nonterminal"/>
            <text class="nonterminal" x="515" y="37">Variable</text>
         </a>
         <a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#Constant" xlink:title="Constant">
            <rect x="507" y="63" width="78" height="32"/>
            <rect x="505" y="61" width="78" height="32" class="nonterminal"/>
            <text class="nonterminal" x="515" y="81">Constant</text>
         </a>
         <a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#Switch" xlink:title="Switch">
            <rect x="507" y="107" width="60" height="32"/>
            <rect x="505" y="105" width="60" height="32" class="nonterminal"/>
            <text class="nonterminal" x="515" y="125">Switch</text>
         </a>
         <rect x="645" y="19" width="26" height="32" rx="10"/>
         <rect x="643" y="17" width="26" height="32" class="terminal" rx="10"/>
         <text class="terminal" x="653" y="37">)</text>
         <path class="line" d="m17 33 h2 m20 0 h10 m0 0 h58 m-88 0 h20 m68 0 h20 m-108 0 q10 0 10 10 m88 0 q0 -10 10 -10 m-98 10 v12 m88 0 v-12 m-88 12 q0 10 10 10 m68 0 q10 0 10 -10 m-78 10 h10 m48 0 h10 m20 -32 h10 m114 0 h10 m0 0 h10 m26 0 h10 m0 0 h10 m84 0 h10 m20 0 h10 m24 0 h10 m20 0 h10 m70 0 h10 m0 0 h8 m-118 0 h20 m98 0 h20 m-138 0 q10 0 10 10 m118 0 q0 -10 10 -10 m-128 10 v24 m118 0 v-24 m-118 24 q0 10 10 10 m98 0 q10 0 10 -10 m-108 10 h10 m78 0 h10 m-108 -10 v20 m118 0 v-20 m-118 20 v24 m118 0 v-24 m-118 24 q0 10 10 10 m98 0 q10 0 10 -10 m-108 10 h10 m60 0 h10 m0 0 h18 m-182 -88 l20 0 m-1 0 q-9 0 -9 -10 l0 -12 q0 -10 10 -10 m182 32 l20 0 m-20 0 q10 0 10 -10 l0 -12 q0 -10 -10 -10 m-182 0 h10 m0 0 h172 m20 32 h10 m26 0 h10 m3 0 h-3"/>
         <polygon points="689 33 697 29 697 37"/>
         <polygon points="689 33 681 29 681 37"/>
      </svg>
</div>


::: info
QueryOperator and FieldName are identifiers.
:::

::: info
#### Examples 
anyOf(firstname, 'roger', @firstname)
:::

FlexSearch supports a number of query operators, more explanation about these can be accessed from the 
Query Types section.

### Query

A query is basically a group of conditions which can be combined together with AND, OR and parentheses.

::: warning
Purely negative queries (i.e. queries with top level Not operation) are not supported.
:::

<div id="Query">
    <svg width="364" height="156">
        <polygon points="9 17 1 13 1 21"/>
        <polygon points="17 17 9 13 9 21"/>
        <a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#Condition" xlink:title="Condition">
        <rect x="51" y="3" width="80" height="32"/>
        <rect x="49" y="1" width="80" height="32" class="nonterminal"/>
        <text class="nonterminal" x="59" y="21">Condition</text>
        </a>
        <rect x="171" y="35" width="40" height="32" rx="10"/>
        <rect x="169" y="33" width="40" height="32" class="terminal" rx="10"/>
        <text class="terminal" x="179" y="53">OR</text>
        <a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#Query" xlink:title="Query">
        <rect x="231" y="35" width="58" height="32"/>
        <rect x="229" y="33" width="58" height="32" class="nonterminal"/>
        <text class="nonterminal" x="239" y="53">Query</text>
        </a>
        <rect x="171" y="79" width="48" height="32" rx="10"/>
        <rect x="169" y="77" width="48" height="32" class="terminal" rx="10"/>
        <text class="terminal" x="179" y="97">AND</text>
        <a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#Query" xlink:title="Query">
        <rect x="239" y="79" width="58" height="32"/>
        <rect x="237" y="77" width="58" height="32" class="nonterminal"/>
        <text class="nonterminal" x="247" y="97">Query</text>
        </a>
        <rect x="51" y="123" width="26" height="32" rx="10"/>
        <rect x="49" y="121" width="26" height="32" class="terminal" rx="10"/>
        <text class="terminal" x="59" y="141">(</text>
        <a xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#Query" xlink:title="Query">
        <rect x="97" y="123" width="58" height="32"/>
        <rect x="95" y="121" width="58" height="32" class="nonterminal"/>
        <text class="nonterminal" x="105" y="141">Query</text>
        </a>
        <rect x="175" y="123" width="26" height="32" rx="10"/>
        <rect x="173" y="121" width="26" height="32" class="terminal" rx="10"/>
        <text class="terminal" x="183" y="141">)</text>
        <path class="line" d="m17 17 h2 m20 0 h10 m80 0 h10 m20 0 h10 m0 0 h136 m-166 0 h20 m146 0 h20 m-186 0 q10 0 10 10 m166 0 q0 -10 10 -10 m-176 10 v12 m166 0 v-12 m-166 12 q0 10 10 10 m146 0 q10 0 10 -10 m-156 10 h10 m40 0 h10 m0 0 h10 m58 0 h10 m0 0 h8 m-156 -10 v20 m166 0 v-20 m-166 20 v24 m166 0 v-24 m-166 24 q0 10 10 10 m146 0 q10 0 10 -10 m-156 10 h10 m48 0 h10 m0 0 h10 m58 0 h10 m-286 -76 h20 m286 0 h20 m-326 0 q10 0 10 10 m306 0 q0 -10 10 -10 m-316 10 v100 m306 0 v-100 m-306 100 q0 10 10 10 m286 0 q10 0 10 -10 m-296 10 h10 m26 0 h10 m0 0 h10 m58 0 h10 m0 0 h10 m26 0 h10 m0 0 h116 m23 -120 h-3"/>
        <polygon points="355 17 363 13 363 21"/>
        <polygon points="355 17 347 13 347 21"/>
    </svg>
</div>

::: info
The parser implements operator precedence as `NOT` >> `AND` >> `OR`.
:::

### EBNF Format

Below is the Query syntax in EBNF format. Copy and paste it to [http://www.bottlecaps.de/rr/ui](http://www.bottlecaps.de/rr/ui) 
to generate the above rail road diagrams.

```
Query ::= Condition ('OR' Query | 'AND' Query)? | '(' Query ')'
Condition ::= 'NOT'? QueryOperator '(' FieldName (',' (Variable | Constant | Switch))+ ')'
Identifier ::= ("Any ALPHANUMERIC character except ( or ) or space")+
Constant ::= "'" ("Any UNICODE character except '" | "\" "' single quote")* "'"
Variable ::= '@' Identifier
Switch ::= '-' Identifier Constant?
QueryOperator ::= Identifier
FieldName ::= Identifier
```
