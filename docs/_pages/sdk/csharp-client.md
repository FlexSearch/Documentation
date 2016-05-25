---
title : CSharp Client
area : sdk
order : 100
---
FlexSearch comes with a C# client that is automatically generated from the [Swagger definition]. You can find the C# client dll in the `FlexSearch.Clients.*.zip` package under the name:
```
FlexSearch.Api.dll
```

All you need to do to start using it is to reference this DLL in your project.

### Namespaces

The C# client is split into three parts / namespaces:

1. **`Model`**  
    Contains all of the requests, responses, enums and helper models that you will need for working with the out-of-box FlexSearch functionality.
2. **`Api`**  
    Contains all of the necessary methods for accessing FlexSearch HTTP endpoints. The APIs are grouped by Swagger tags into:  
    * **Indices API** - has methods for working with Indices: create, update, delete, check, etc.
    * **Search API**    
    * **Documents API**
    * **Analyzer API**
    * **Common API** - has methods for working with the most populat FlexSearch endpoints such as
        creating an index, searching, getting documents, as well as accessing the FlexSearch `connectors`.
    * **Jobs API**
    * **Server API** - has methods for setting up a demo index, getting server stats, ping-ing, etc.
3. **`Client`**  
    Contains the code that handles the HTTP calls. The `Client` is used by the `Api's` during instantiation. It can be instantiated by using either a base path (e.g. `http://localhost:9800`) or an `HttpMessageHandler`.

### Request Model

All FlexSearch `Request` objects derive from `IDataTransferObject`. This forces the users to implement a validation method for each request type. The method (`Validate()`) will be called by FlexSearch at the beginning of any HTTP handler.

### Guidelines on implementing your own FlexSearch Request

#### Implementing the `Validate()` Method

The `Validate()` method should populate the `IDataTransferObject` fields in the following way:

* `Validated` - should be used to indicate if the `Validate()` method has been called at least once.
* `ErrorField` - should hold the name of the Field that was identified as having a problem.
* `ErrorDescription` - should contain an explanation of the problem.


#### Using `DataContract` and `DataMember` attributes

In order to make your request fully compatible with FlexSearch, you should use:

* `System.Runtime.Serialization.DataContract` attribute on your request
* `System.Runtime.Serialization.DataMember` attribute on the properties you want to expose. Typically, these would be the new properties you create, not the ones implemented from `IDataTransferObject`.

#### Using `JsonProperty` and `JsonIgnore` attributes

We suggest using the `JsonIgnore` attribute on the properties implemented from `IDataTransferObject`.  
The `JsonProperty` attribute should be used on the new properties you've created, being careful to use `camelCase` for the `PropertyName`.

### Response Model

All FlexSearch `Responses` have two Properties:  

- **`Data`** - this contains the actual data that you want to retrieve when making a request

    E.g. The ID of the newly created Index or the list of `Analyzer` DTOs when you're getting all Analyzers
- **`Error`** - In case there was an error when running the request, this property will be populated. It contains helpful information to help you identify what the problem is.

    These are the pieces of information present in the `Error` property:
    1. `Message` - It contains a human readable description of the error
    2. `OperationCode` - It contains a code that identifies the category of the error
    3. `Properties` - This is a list of the key pieces of data that concern this error.

    Example:
    ```json
    {
        "message": "Document ID '333' not found on index 'contact'",
        "operationCode": "DocumentIdNotFound",
        "properties": {
            "indexName": "contact",
            "id": "333"
        }
    }
    ```

### Guidelines on implementing your own `Response`

When implementing your own response you don't need to worry about the `Data` and `Error` part. FlexSearch will handle that for you.

You will just need to focus on annotating your object with the attributes `DataContract`, `DataMember` and `JsonProperty`, like instructed in the *Request Model*.


### Usage example

In this example I'm going to do a search for any of the words "most", "prosperous" and "countries" inside the field `background` of the `country` index.

```csharp
    // First initialize a client to connect to our FlexSearch URL
    var searchApi = new SearchApi("http://localhost:9800")

    // Next create the request that we want to send. In this case, the
    // request is of type `SearchQuery`
    var query = new SearchQuery("country", "anyOf(background, 'most prosperous countries')");

    // We want to get back the fields "countryname" and "background"      
    query.Columns = new string[] { "countryname"; "background" };

    // Now we submit the request using a POST
    var response = api.Search(query, query.IndexName);

    // We interpret the response
    if (response.Error?.Message != null)
        Console.WriteLine($"Got an error: {response.Error.Message}");
    else
        Console.WriteLine($"Got back {response.Data.RecordsReturned} records");
```

[Swagger definition]: https://github.com/FlexSearch/FlexSearch/tree/master/spec
