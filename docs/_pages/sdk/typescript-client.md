---
title : TypeScript Client
area : sdk
order : 600
seealso:
  - title: C# client
    link: "./csharp-client"
---
### Summary
The TypeScript client can be found in the `FlexSearch.Clients.*.zip` package in the `clients/ts` folder.

The client also comes with a definition file called `api.d.ts` to give you intellisense.

The TypeScript APIs are grouped by swagger tags, just like the [C# client] is. You therefore have an `AnalyzerApi`, `ServerApi`, `SearchApi` and so on.

### Initializing the APIs
Initializing an API is as easy as providing it a reference to Angular's `ng.IHttpService` service (`$http`). This would use the base path of `http://localhost:9800` by default.

```typescript
let api = new API.Client.AnalyzerApi($http);
```

There are also several other **optional** parameters that you can pass to the api constructor:

* **`$httpParamSerializer`** - Angular's [params serializer]
* **`basePath`** - the base path to use in the requests. E.g. `http://localhost:9800`
* **`bs`**, **`q`** and **`errorHandler`** -  
    <a name="errorHandling"></a>
    These 3 params need to be specified in a group. They were created specifically for Angular apps that use FlexSearch's base template (`Main`). They are used in conjuction with the API methods that have a name ending in `*Handled` (e.g. `getAnalyzerHandled`).

    Whenever a `*Handled` API method is called, if it returns an error (i.e. has the `Error` property populated) then an Angular Material [$mdBottomSheet] will be displayed with the error details. This makes for very easy error handling.

    The 3 parameters mean the following:
    - **`bs`** is the reference to the `$mdBottomSheet` that will be displayed
    - **`q`** is the reference to Angular's [$q] service that is used for rejecting a promise
    - **`errorHandler`** is the reference to FlexSearch's error handling mechanism. In order to gain access FlexSearch's instance of this function, you just need to make sure you reference `srcjs/src/common/partials/error.ts`.

#### Example

Initializing an instance of a FlexSearch TypeScript client as a service in an Angular app, that displays the errors using FlexSearch's framework can be done in the following way:

```typescript
/// <reference path="../../common/partials/main.controller.ts" />
/// <reference path="../../common/references/references.d.ts" />

angular.module('myModule', ['ngMaterial'])
    .service('indicesApi', ["$http", "$mdBottomSheet", "$q",
        function($http, $mdBottomSheet, $q) {
            return new API.Client.IndicesApi($http, null, null, $mdBottomSheet, $q, errorHandler);
        }]);
```

### Accessing the API methods

Each API method (web service) has an overload with the `Handled` suffix. The `Handled` methods handle errorred calls automatically using FlexSearch's framework. This only works if you've initialized the API with the [error handling parameters](#errorHandling).

For example, you will have the following methods in the `AnalyzerApi`:
* `getAnalyzer`
* `getAnalyzerHandled`
* `deleteAnalyzer`
* `deleteAnalyzerHandled`

The outcome of the `Handled` methods is that if an API method call returns an error, then **a window will pop up from the bottom of the screen showing the error details**. The method call will still return an error promise and you can further handle it if you want.

You can just as well call the normal methods (without `Handled`). The return object of the method will be the same. The only difference is that the error details won't be displayed on the screen.

#### Example

Let's try to get all the Analyzers registered in FlexSearch and submit an analysis request against the first of them.

We assume we have an already instantiated `analyzerApi` with the error handling arguments populated.

```typescript
/// <reference path="../../common/references/references.d.ts" />

analyzerApi.getAllAnalyzer()
    .then(response => response.data.data)
    .then(analyzers => {
        let analyzerName = analyzers[0].analyzerName;
        let request : API.Client.AnalysisRequest = {
            text : 'some text to test',
            analyzerName : analyzerName
        };
        return analyzerApi.analyzeText(request, analyzerName);
    })
    .then(response => response.data.data)
    .then(analysisResult => /* Do whatever with the result of the analysis */ ());
```

### Complex example

In order to see a complex example have a look at the FlexSearch [Dashboard] app.

In the `index.ts` file you will see how the `indices`, `server` and `documents` APIs are initialized in the error handling mode.

In the `cluser.ts` file you will see how we call different methods from the API, how we use the results in a strongly typed manner and how we handle the erorrs in order to produce a series of stats about the FlexSearch server.


[C# client]: ./csharp-client
[params serializer]: https://docs.angularjs.org/api/ng/service/$httpParamSerializer
[$mdBottomSheet]: https://material.angularjs.org/latest/demo/bottomSheet
[$q]: https://docs.angularjs.org/api/ng/service/$q
[Dashboard]: https://github.com/FlexSearch/FlexSearch/tree/master/srcjs/src/apps/dashboard
