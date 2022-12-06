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
      LogGroupName: !Sub "/aws/lambda/${Function}"
      # Explicit retention time
      RetentionInDays: 7
```

### Typescript Lambda

```ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult;
  return (response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'hello world'
    })
  });
};
```

```yaml
Metadata:
  BuildMethod: esbuild
  BuildProperties:
    Target: 'es2020'
    EntryPoints:
      - app.ts
```
