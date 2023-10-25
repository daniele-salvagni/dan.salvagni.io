---
layout: '../../layouts/CodeSnippet.astro'
title: aws
---

# Lambda

### Lambda Log Retention

```yaml
Resources:
  Function:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: .
      Runtime: python3.8
      Handler: main.handler
      Tracing: Active

  # Explicit log group that refers to the Lambda function
  LogGroup:
    Type: AWS::Logs::LogGroup
    Properties:
      LogGroupName: !Sub '/aws/lambda/${Function}'
      # Explicit retention time
      RetentionInDays: 7
```

### Typescript Lambda

```ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`only accepts GET method, you tried: ${event.httpMethod}`);
  }

  const id = event.pathParameters.id;
  const item = id; // ... get item from DynamoDB

  const response: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify(item)
  };

  // All log statements are written to CloudWatch
  console.info(
    `response from: ${event.path} 
     statusCode: ${response.statusCode}
     body: ${response.body}`
  );
  return response;
};
```

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
        External:
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
        - !Ref LayerAwsSdkJsV3
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
