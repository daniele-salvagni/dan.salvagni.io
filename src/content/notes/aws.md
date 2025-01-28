---
title: aws
---

## Lambda

### Lambda Log Retention

```yaml
Resources:
  Function:
    Type: AWS::Serverless::Function
    Properties: ...

  LogGroup:
    Type: AWS::Logs::LogGroup
    Properties:
      LogGroupName: !Sub '/aws/lambda/${Function}'
      RetentionInDays: 7
```

> It looks like this won't be changed any time soon:
> [GitHub Issue](https://github.com/aws/serverless-application-model/issues/257)

### Typescript Lambda (API Gateway Proxy)

Typescript boilerplate

```ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const lambdaHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  // ...
};
```

SAM CloudFormation Template

```yaml
Resources:
  GetItemByIdFunction:
    Type: AWS::Serverless::Function
    Metadata:
      BuildMethod: esbuild
      BuildProperties:
        Minify: false
        Target: es2020
        EntryPoints:
          - app.ts
        External: # to be found in the dependency layer, will not be bundled
          - '@aws-sdk/client-dynamodb'
          - '@aws-sdk/lib-dynamodb'
    Properties:
      CodeUri: functions/getItemById
      Description: Get an item by id from a DynamoDB table
      Environment:
        Variables:
          SAMPLE_TABLE: !Ref SampleTable
      Handler: app.lambdaHandler
      Layers:
        - !Ref DependencyLayer
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref SampleTable
      Events:
        Api:
          Type: Api
          Properties:
            Path: /{id}
            Method: GET
```

### EventBridge Event type definition

Example of an EventBridge event type definition for an S3 Object Created event
(the documentation currently lacks on this topic)

```ts
import {
  EventBridgeEvent,
  S3ObjectCreatedNotificationEventDetail,
} from 'aws-lambda';

export const handler = async (
  event: EventBridgeEvent<
    'Object Created',
    S3ObjectCreatedNotificationEventDetail
  >,
): Promise<void> => {
  console.log('event: ', JSON.stringify(event, null, 2));
};
```

## CloudFront Functions

CloudFront Functions' JavaScript runtime does not support exports, here is a
simple workaround:

```js
async function handler(event) {
  // ...
}

var module = module || {};
module.exports = { handler };
```
