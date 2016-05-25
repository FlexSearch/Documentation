---
title : Index model
area : index
order : 450
description: Index model of FlexSearch 
keywords: document, index
---

The below table represents all the fields that are present in the FlexSearch search query object. This object is used whenever you wish to execute a search against the engine.

::: render properties
data-file: swagger.definitions.index
:::

All the functionality related to indexes is exposed on the `indices` endpoint. Some of the important endpoints are are shown in the below table. For a complete list of the endpoints please refer to the API reference guide.

Endpoint | Description
--|--
`GET \indices` | Get all indices
`GET \indices\{indexName}` | Get an index by ID
`POST \indices` | Create an index
`DELETE \indices\{indexName}` | Delete an index by ID

These not beat index endpoint as the index object cannot be updated completely but certain properties can be updated. For example you can add a new feel to the index but you can't remove an existing field from an index. This is due to design as the data is not saved in a manner which allows removal of a particular field. We would advise you to re-index in case you want to remove a field from the index.

### Index Properties
#### Fields
Field represents the fields to be added to the index. Refer to: [[field-types]] to understand more about adding fields to an index.

#### Predefined Queries

Predefined Query is an extension of normal searching capability of FlexSearch which allows central management of queries. It is also used by background duplicate matching. Think of it as a way to define a search criteria which is managed at the server and can be called from various systems without the need to specify the criteria as the as a part of the query. Refer to: [[predefined-query]] to understand more about predefined queries.

#### Shard Configuration
Shard configuration object contains all the shard related settings. Currently it only supports one property that is `shardCount` which signifies the total number of shards that an index should be split into.

#### Index Configuration
Index configuration object contains all the index related settings. 

::: warning
These are advance settings which should only be modified if are sure about the changes you are making. Changes to Index settings can have unintended effects.
:::

::: render properties
data-file: swagger.definitions.indexConfiguration
:::

FlexSearch index differentiates between updating the data on the persistent medium that is disk and refreshing the data for returning the search results. What this really means is when you index a document, the document might not be saved to the physical medium immediately but will be saved at the later point of time. This is done to improve the performance of the system. 

::: info
All the settings related to the persistence of the data contains `commit` in their names.
:::

::: info
All the settings related to refreshing/nrt of the data for searches contains `refresh` in their names.
:::


##### Commit related setting

Commit Time Seconds (`commitTimeSeconds`)
: The amount of time in seconds that FlexSearch should wait before committing changes to the disk. This setting can have massive effect on the throughput as committing too often would reduce the throughput. There is a minor chance of losing data between commits, but this is greatly minimised by using a write ahead transaction log.
 

Commit on close (`commitOnClose`)
: Determines whether to commit first before closing an index. This setting should not be changed under normal circumstances. This is only exposed for testing purposes.

Auto commit (`autoCommit`)
: Under very specific circumstances a user may want to take control of commit. In such cases it is the responsibility of the user to perform periodic commit. Failing to do so well result in large memory usage.

##### Flushing related settings
Flushing of documents happens when a threshold is reached. Flushing merely rights the documents to the physical medium but does not commit them. Flushing is done to conserve memory. A commit still needed to make the things permanent.

Maximum buffered documents (`maxBufferedDocs`)
:  The number of buffered added documents that will trigger a flush if enabled.

RAM buffer size (`ramBufferSizeMb`)
: Determines the amount of RAM that may be used for buffering added documents and deletions before they are flushed to the Directory.

Delete logs on close (`deleteLogsOnClose`)
: Determines whether to clear all transaction logs before closing an index. This setting Should not be changed under normal circumstances. Changing the setting may result in increased disk usage. This is only used for investigative purposes to see the data which was indexed.

##### NRT related setting

Auto refresh (`autoRefresh`)
: This setting is used to enable automatic refreshing of the index reader. What this really means is that the data will be available for searching after the refresh time even though the data hasn't been committed to the physical medium. This setting should not be changed unless you're working with an index with static data.

Refresh time (`refreshTimeMilliseconds`)
: The amount of time in milliseconds that FlexSearch should wait before reopening index reader. This helps in keeping writing and real time aspects of the engine separate.
