---
title : Custom Analyzer
area : index
order : 400
description: Explains the process of defining a custom analyzer 
keywords: analysis, text processing, analyzer, tokenizer, filter, custom analyzer
---

::: info
Refer to [[overview#overview/text-analysis|Text analysis]] to understand the basics of text analysis. In this article we will deconstruct few analyzers.
:::

### Strip white space analyzer

Let's start with a simple analyzer which removes all the white spaces from the input. This analyzer is useful for cleaning up ID fields which should not contain any spaces. Not is that we are using keyword tokenizer as we want the input to be treated as a single token rather than being broken down into individual tokens. This is also important as filters are applied to individual tokens coming out of the tokenizer. So if you use a filter like pattern replace it is important to understand the role of the tokenizer as you may not get expected results. In our case we want the regex expression to treat the whole input as single token.

So, in below example we are chanining the output of the keyword tokenizer to a series of lowercase and pattern replace filter.

```json
{
  "AnalyzerName": "stripwhitespaceanalyzer",
  "Tokenizer": {
    "TokenizerName": "keyword"
  },
  "Filters": [
    {
      "FilterName": "lowercase"
    },
    {
      "FilterName": "patternreplace",
      "Parameters": {
        "pattern": "\\s+",
        "replacement": ""
      }
    }
  ]
}
```

### Strip to numbers analyzer

This example is similar to the previous one. Here we are using a pattern to replace all non numeric characters from the input. This type of analyzer is useful for cleaning up telephone numbers where you don't want any non-numeric character to be present in the input. This can be easily extended to mean more complex requirements like remove all the pneumatic characters, reverse the result and just take the first six significant digits. When this logic is applied to a telephone number field, you can easily cater for a lot of bad data in the input. For example telephone numbers starting with area codes or telephone numbers with spaces in them.

```json
{
  "AnalyzerName": "striptonumbersanalyzer",
  "Tokenizer": {
    "TokenizerName": "keyword"
  },
  "Filters": [
    {
      "FilterName": "standard"
    },
    {
      "FilterName": "patternreplace",
      "Parameters": {
        "pattern": "[a-z$ ]",
        "replacement": ""
      }
    }
  ]
}
```

### Address Analyzer
Let's look at a slightly more complex example, here we want ensure that the input does not contain any common stop words and we also want the search to return results when a synonym is used. For example, we want `road` to be matched to its common short form `rd`.

Again the setup is similar, we define a tokenizer followed by a set of filters. Here we are using standard tokenizer which is a general-purpose tokenizer. In our filter chain we first pass the tokens through a lowercase filter which converts the tokens into lowercase. This ensures that our searches are case insensitive. The output from the lowercase filter is passed to a stop words filter which removes common stop words like `a`, `an` etc. the list of stop words is coming from a text file called `stopwords.txt`. This file should be placed under `resources` folder inside `conf` folder.

::: info
Refer to [[configuration]] to know more about FlexSearch's folder structure.
:::

The output tokens from the stop word filter passed into synonym filter which adds additional tokens against a token which is defined in the `addresssynonyms.txt`. For example if the filter encounters a token containing `road`, it will replace the token with two tokens `road` and `rd`. List of the synonyms can be defined using a text file which should again be placed under the resources folder.

```json
{
  "AnalyzerName": "addressanalyzer",
  "Tokenizer": {
    "TokenizerName": "standard"
  },
  "Filters": [
    {
      "FilterName": "lowercase"
    },
    {
      "FilterName": "stop",
      "Parameters": {
        "words": "stopwords.txt",
        "ignoreCase": "true"
      }
    },
    {
      "FilterName": "synonym",
      "Parameters": {
        "synonyms": "addresssynonyms.txt"
      }
    }
  ]
}
```

::: info
Refer to [[analysis]] to know more about various filters and supported file formats.
:::

#### Stop words file
```
a
an
and
are
as
at
be
but
by
for
if
in
into
is
it
no
not
of
```

#### Synonyms file
```
road,rd
street,st
lane,ln
avenue,av,ave
close,cl,cls
drive,drv,dr
court,ct,crt
crescent,cres
place,pl
terrace,terr
gardens,gdns
```

