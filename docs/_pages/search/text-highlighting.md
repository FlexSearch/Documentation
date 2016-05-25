---
title : Text highlighting
area : search
order : 500
layout: page
---

FlexSearch supports text highlighting across all query types provided correct highlighting options are set in the request query. Text highlighting is supported only for `Text` field types.

PreTag and PostTag can be specified and the returned result will contain the matched text between pre and post tags. This is helpful in case the results are to be expressed in a web page.

::: render example
data-file : post-indices-search-highlighting-1
:::
