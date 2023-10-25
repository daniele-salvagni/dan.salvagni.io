---
layout: '../../layouts/BlogPost.astro'
collection: blog
issue: 11

author: Daniele Salvagni
title:
  Paginators in the AWS SDK for Javascript V3
publishDate: 2023-10-26

excerpt: >
  How many times have you found yourself implementing pagination manually while
  retrieving data from the AWS SDK for Javascript? Let's see how we can use paginators
  with an example using DynamoDB queries.
softDraft: true
---

How many times have you found yourself implementing pagination manually while
retrieving data from the AWS SDK for Javascript? Although the version 3 of the
SDK has introduced numerous built-in pagination utilities for many of its
clients, many users are still not aware of these features. As a result, most
still implement pagination manually, which is more time-consuming and prone to
errors.

In this post, we’ll discuss how to use the **paginate\*** utilities found
throughout the SDK by looking at a specific example about paginating DynamoDB
queries with **paginateQuery**.

**tl;dr:** it will be simple as this:

```typescript
const paginator = paginateQuery(paginatorConfig, params);

const items: any[] = [];
for await (const page of paginator) {
  items.push(...page.Items);
}
```

# Manual pagination

Let's take the example of a DynamoDB query. When doing things manually, you
would need to make a first query, check if there is a _LastEvaluatedKey_ in the
response, and if so, keep making queries with the _ExclusiveStartKey_ set to the
_LastEvaluatedKey_ of the previous response until it is undefined.

By using the **paginateQuery** method instead, you can get rid of most of this
boilerplate code. This same pattern can be applied to any other clients in the
SDK that support paginators.

# Using Paginators

Many AWS operations return paginated results when the response object is too big
to be returned in a single response. For these operations, the AWS SDK for
JavaScript usually exposes utility methods all named with the
**paginate\<OperationName\>** pattern.

These methods are written using
[Async Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator)
and return
[Async Iterators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator)
that can be used with a `for await...of` loop.

## A DynamoDB example using the **paginateQuery** method

Let's see an example using _paginateQuery_ to paginate over a query operation
with the DynamoDB Document client.

Here is the signature of the relevant paginator from the
[documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-dynamodb/Function/paginateQuery/):

```typescript
export declare function paginateQuery(
  config: DynamoDBPaginationConfiguration,
  input: QueryCommandInput,
  ...additionalArguments: any
): Paginator<QueryCommandOutput>;
```

As you can see, it takes as inputs:

- [DynamoDBPaginationConfiguration](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-dynamodb/Interface/DynamoDBPaginationConfiguration/)
  (extends
  [PaginationConfiguration ](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-smithy-types/Interface/PaginationConfiguration/))
  containing the client to be used and other configurations
- [QueryCommandInput](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-lib-dynamodb/TypeAlias/QueryCommandInput/)
  that defines the query to be made

The return type is a **Paginator** object which can be iterated over, where each
iteration returns a
[QueryCommandOutput](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-lib-dynamodb/TypeAlias/QueryCommandOutput/)
object containing the results of the query.

The following is a fully typed example showing its usage with TypeScript:

```typescript
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocument,
  QueryCommandInput,
  paginateQuery,
  DynamoDBDocumentPaginationConfiguration
} from '@aws-sdk/lib-dynamodb';

const REGION = 'eu-west-1';
const TABLE_NAME = 'my-table';
const PK_QUERY_VALUE = 'my-pk';

// Create a DynamoDB Document client
const docClient = DynamoDBDocument.from(
  new DynamoDBClient({
    region: REGION
  })
);

// Create a paginator configuration
const paginatorConfig: DynamoDBDocumentPaginationConfiguration = {
  client: docClient,
  pageSize: 25
};

// Query parameters
const params: QueryCommandInput = {
  TableName: TABLE_NAME,
  KeyConditionExpression: 'pk = :pk',
  ExpressionAttributeValues: {
    ':pk': PK_QUERY_VALUE
  }
};

// Create a paginator
const paginator = paginateQuery(paginatorConfig, params);

// Paginate until there are no more results
const items: any[] = [];
for await (const page of paginator) {
  items.push(...page.Items);
}
```

As you can see, by using paginator methods, you don't need to worry anymore
about the underlying pagination logic which is translated into a simple for
(await) loop. The same example could be used for the _paginateScan_ method or
any other SDK paginated operation with minimal changes.

In conclusion, if you are using the AWS SDK for Javascript, it's worth taking
the time to learn how to use paginators effectively to make your code easier to
read and maintain, as they are available for many clients throughout the SDK.

# References

- [AWS SDK for Javascript v3 - Documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
- [AWS SDK for Javascript v3 - Github](https://github.com/aws/aws-sdk-js-v3)
- [MDN - Async Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator)
- [MDN - Async Iterators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncIterator)
- [MDN - for await...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of)
