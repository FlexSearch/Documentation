---
title : Custom Plugins
area : extending
order : 300
seealso :
  - title: "PluginLibrary Github Repo"
    link: "https://github.com/FlexSearch/PluginLibrary/"
  - title: "SQL Connector Github Repo"
    link: "https://github.com/FlexSearch/SqlConnector"
  - title: "CSV Connector Github Repo"
    link: "https://github.com/FlexSearch/CsvConnector"
  - title: "El Machina Github Repo"
    link: "https://github.com/FlexSearch/el-machina"
---
### Definition

Custom plugins are pieces of code that enrich the capabilities of what the FlexSearch engine can do. They are loaded automatically when the engine starts.

The plugin can be composed of two parts:

1. A **`*.dll`** that contains the implementation of the interface/abstract class you want to use.  
Such interfaces can be `HttpHandlerBase<'T,'U>` or `IQueryFunction`.  
Dlls are loaded automatically from FlexSearch's `./Plugins/` folder.

2. An **AngularJS app** that will be included automatically in the FlexSearch portal. Examples of such apps are the `Analyzer Testing` app, the `Search Studio` app, the `Dashboard`, etc.  
Apps are loaded automatically from FlexSearch's `./Web/apps/` folder.

Examples of already implemented plugins can be found in the FlexSearch GitHub organization:  

* [SQL Connector]
* [CSV Connector]
* [El Machina] (just for demo purposes)


### Writing your own FlexSearch Plugin

Let's assume we want to add a new HTTP endpoint (web service) that when accessed returns the machine name that's running the FlexSearch engine. We will also want to create an HTML screen to display this information. Let's name this plugin **El Machina**. You can find the source code of this sample app at <https://github.com/FlexSearch/el-machina>.

In order to kickstart your custom plugin development, the FlexSearch team has provided a template for writing custom plugins. It helps you reference `FlexSearch.Core.dll`, `FlexSearch.Api.dll` and also provides build scripts for your `F#` or `AngularJS` app.  
The template is in the form of a github repository called [PluginLibrary].

The plugin will be structured in the following way (let's assume that the root folder is `el-machina`):
```
/el-machina/
|-- lib/
|-- src/
|-- srcjs/
|-- setup.bat
|-- setup.fsx
```

The `lib` folder will contain the `PluginLibrary` repo, the `src` folder the F# project and the `srcjs` folder the AngularJS app.

In order to include the `PluginLibrary` repo as a submodule in your local git repo, you will need to run the following command from the root of your repo:

`git submodule add https://github.com/FlexSearch/PluginLibrary lib`

Next we will add the `src` and `srcjs` folders
```
mkdir src
mkdir srcjs
```

#### Implementing the HTTP endpoint

Now we need to create the C# project that will implement the new HTTP endpoint. For this I will create a Class Library project called *ElMachina* in the `src` folder. The folder structure will look like this:
```
/el-machina/src/
|
|-- ElMachina/
        |-- ElMachina.csproj
        |-- Handler.cs
|-- ElMachina.sln
```

We now need to add a reference to FlexSearch.Core and FlexSearch.Api from the `/lib/src/` folder, and then to FSharp.Core.

In the `Handler.cs` file we add the following code:

```csharp
using FlexSearch.Api.Model;
using Microsoft.FSharp.Core;
using System;
using static FlexSearch.Core.Http;

namespace ElMachina
{
    public class GetMachineName : HttpHandlerBase<NoBody, string>
    {
        public GetMachineName()
            : base(new FSharpOption<bool>(false), new FSharpOption<bool>(false))
        { }

        public override ResponseContext<string> Process(RequestContext request, FSharpOption<NoBody> body)
        {
            return ResponseContext<string>.SuccessResponse.NewSuccessResponse(Environment.MachineName, Ok);
        }
    }
}
```

From this code you can see that we've implemented the abstract base class `HttpHandlerBase`, where we've specified that we have no body (`NoBody`) for the request and the response returns a `string`.  
The function override always returns a Success response containing the Machine name and the OK HTTP status code.

We need to add a .nuget folder that holds the Nuget executable, needed by Fake to build the app. We will put this in `el-machina/src/.nuget`.

#### Creating the AngularJS app

The code needed for this should be written in TypeScript and put in the `el-machina/srcjs` folder. This code is just small part of the entire AngularJS app, representing the portal. It references code from the `el-machina/lib/srcjs/src` folder.  

When the entire app is building, the code from `el-machina/srcjs` will be copied over in `el-machina/lib/srcjs/src/apps/<name-of-your-app>`. Only then will the gulp script be ran.

We will need 4 files in total for this app:
```
/el-machina/srcjs/
|
|-- info.json
|-- index.ts
|-- elmachina.ts
|-- elmachina.html
```

* `info.json` holds the basic information needed to display this app on the FlexSearch portal homepage.
* `index.ts` holds the angular module definition with the states, services, controllers, etc.
* `elmachina.ts` is the controller that calls the newly created web service
* `elmachina.html` holds the HTML template that is rendered for that controller.

#### Adding the setup.* files

The `setup.*` files tie all these pieces of code together, build them and package them in a zip file.  
The `setup.fsx` file is an F# script that uses Fake to copy files, build the assembly and package everything.  
The `setup.bat` file downloads Fake from nuget if it's necessary, then calls `setup.fsx`.

Hopefully, the only things you would need to change in your app are the references to the name of the application. For example, if your app is called MyApp, you would just have to search for `elmachina` in `setup.fsx` and replace those occurrences appropriately.

In order to build your application you just need to run the following command from the `/el-machina` folder:

`.\setup.bat`  

You can run Fake targets individually by calling:  

`.\setup.bat target=<target-name>`

For example, you can just build the C# application by calling:

`.\setup.bat target=BuildApp`


#### Deploying your app

Just run `.\setup.bat` from the `/el-machina` folder. This will generate a .zip file in `/el-machina/deploy/`.

The .zip file has two parts in it that you will need to deploy to your FlexSearch engine folder:

1. The `*.dll` containing your server-side code. You will need to put this into:  

    `<flexsearch-engine-folder>/Plugins/`
2. A folder containing the AngularJS application. In our case the folder is called **elmachina**. Copy this folder into:  

    `<flexsearch-engine-folder>/Web/apps/`

When you restart your FlexSearch engine, the new plugin and portal app will be picked up automatically. Just navigate to your portal homepage and see for yourself.

### Installing a FlexSearch Plugin

In order to install a plugin you just need to take the `*.dll` file from your package and put it in the `Plugins` folder.
The plugin will be picked up the next time FlexSearch starts.

For example, for the `CSV Connector`, you would take the `CsvConnector.dll` file from the generated `zip` and put it in the `Plugins` folder.

[PluginLibrary]: https://github.com/FlexSearch/PluginLibrary/
[SQL Connector]: https://github.com/FlexSearch/SqlConnector
[CSV Connector]: https://github.com/FlexSearch/CsvConnector
[El Machina]: https://github.com/FlexSearch/el-machina
