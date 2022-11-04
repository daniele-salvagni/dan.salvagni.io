---
layout: '../../layouts/BlogPost.astro'
collection: blog
issue: 7

author: Daniele Salvagni
title: 'AWS SAM and Typescript: building functions and layers'
publishDate: 2022-11-02

excerpt: >
  Addressing some issues when working with SAM using Typescript and Lambda
  Layers. By using esbuild you will need to be careful as you will be building
  different parts of your code in different ways
---

This post is to address some issues when working with SAM using Typescript and
Lambda Layers.

Recently, `esbuild` support in AWS SAM CLI was made
[generally available](https://aws.amazon.com/about-aws/whats-new/2022/09/aws-sam-cli-esbuild-support-available/),
this makes it very easy and fast to build Typescript functions. Some of the pros
of using esbuild are:

- very fast transpiling
- very quick to setup

But there are also a few cons:

- esbuild does not have type checking
- still **not supported in Layers**, they must to be built in a different way
- less control on build settings, must rely on what is exposed by SAM and its
  defaults

If you decide to use this new feature you will need to be careful as you will be
building different parts of your code in different ways (different compilers or
defaults), the following is one of the errors that prompted this post:

```json
"errorType": "Runtime.UserCodeSyntaxError",
"errorMessage": "SyntaxError: Unexpected token 'export'",
```

> The main takeaway is that currently, by using esbuild with SAM for λ
> functions, there is no way to change the
> [format option](https://esbuild.github.io/api/#format), which is forced to be
> `cjs`. When building layers, for which at the moment we must use a different
> build system, we should always remember to transpile our code to use
> `commonjs` modules.

This post will provide an example of a working configuration to avoid some of
the common pitfalls.

## Setting up the project

### SAM init

We will start from the official AWS SAM Typescript template

    sam init --runtime nodejs16.x --app-template hello-world-typescript --name sam-typescript-functions-layers --package-type Zip --dependency-manager npm --no-interactive

### Refactoring

We plan on having multiple λ functions, so let's create a new top-level folder
named `functions/` and move the `hello-world/` folder there. We plan to achieve
a folder structure similar to the following:

```
sam-typescript-functions-layers/
├── functions/
│   └── hello-world/
└── layers/
    └── commmons/
```

All of our λ functions will need a way to build a response object, so we can
export a function to then reuse this code:

```js
export const responseBuilder = (
  payload: string,
  statusCode?: number = 200,
  headers?: any = { 'Content-Type': 'application/json' }
) => {
  return {
    statusCode,
    headers,
    body: JSON.stringify({ payload })
  };
};
```

we will then move this function as a module in our first layer.

## Adding a Typescript Layer

We will now create a module in a new layer named `commons` to share some code
common to our λ functions.

```
layers/commons/
├── index.ts
├── Makefile
├── package.json
└── tsconfig.json
```

1. Put the `responseBuilder` code shown before into a new file named `index.ts`

2. Add the following configuration files:

   ```json
   // package.json
   {
     "description": "Lambda layer with common utils",
     "main": "index.ts",
     "name": "layer-commons",
     "version": "1.0.0",
     "dependencies": {
       "@types/node": "^16.18.3",
       "typescript": "^4.8.4"
     },
     "scripts": {
       "build": "node_modules/typescript/bin/tsc"
     }
   }
   ```

   we added Type Definitions for Node.js and Typescript as dependencies, and a
   build script to use tsc as the transpiler.

   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "strict": true,
       "target": "es2020",
       "preserveConstEnums": true,
       "noEmit": false,
       "sourceMap": false,
       "module": "commonjs",
       "moduleResolution": "node",
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true,
       "outDir": "./commons"
     },
     "exclude": ["node_modules", "**/*.test.ts"]
   }
   ```

   > **Important:** `"module"` should be set either to `"node16"` or
   > `"commonjs"`, otherwise it will not be compatible with the code of our
   > Lambdas built with _esbuild_. `"noEmit"` also needs to be set to `false`.

3. Create a `Makefile` to be used by SAM for transpiling the Typescript code and
   placing it inside `node_modules`:

   ```makefile
   .PHONY: build-LayerCommons

   build-LayerCommons:
     npm install
     npm run build
     mkdir -p "$(ARTIFACTS_DIR)/nodejs/node_modules"
     cp -r commons "$(ARTIFACTS_DIR)/nodejs/node_modules"
   ```

   this will put the transpiled code inside the `/nodejs/node_modules/`
   [folder of the layer](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html#configuration-layers-path),
   so we will then be able to import the code in our functions as a Node.js
   module.

4. Add the Layer inside `Resources:` in the global `template.yaml` file

   ```yaml
   # Inside Resources
   LayerCommons:
     Type: AWS::Serverless::LayerVersion
     Properties:
       ContentUri: layers/commons/
       CompatibleRuntimes:
         - nodejs16.x
       RetentionPolicy: Delete
     Metadata:
       BuildMethod: makefile
   ```

## Using the Layer inside a Lambda function

1. Reference the new layer in the λ functions that are using it:

   ```yaml
   # Inside HelloWorldFunction.Properties
   Layers:
     - !Ref LayerCommons
   ```

   And then declare the js module inside the Layer as
   [external](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-build-typescript.html),
   so it will be omitted from the final bundle of the λ function build:

   ```yaml
   # Inside HelloWorldFunction.Metadata.BuildProperties
   External:
     - commons
   ```

2. We can now import this module in our `.js` code with:

   ```js
   import { responseBuilder } from 'commons';
   ```

We are now able to use the code from the Layer in our Lambda functions.

## Further documentation:

Here are a few links worth reading about the topics of this post:

- [Building Node.js Lambda functions with esbuild](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-build-typescript.html) [AWS docs]
- [Including library dependencies in a layer](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html#configuration-layers-path) [AWS docs]
- [Building Layers](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/building-layers.html) [AWS docs]
- [esbuild Format option](https://esbuild.github.io/api/#format) [esbuild docs]
- [esbuild (and TypeScript) Beta Support Feedback](https://github.com/aws/aws-sam-cli/issues/3700) [Github issue]
- [SAM official Typescript template (no layers)](https://github.com/aws/aws-sam-cli-app-templates/tree/master/nodejs16.x/cookiecutter-aws-sam-hello-typescript-nodejs) [Github repo]
