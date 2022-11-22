---
layout: '../../layouts/CodeSnippet.astro'
title: aws
---

# SAM

    sam init
    sam validate
    sam build
    sam deploy [--guided]
    sam delete

# Lambda

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
