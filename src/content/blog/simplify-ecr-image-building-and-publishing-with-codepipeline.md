---
issue: 17

author: Daniele Salvagni
title: 'Simplify ECR image building and publishing with CodePipeline V2'
pubDate: 'Jan 8, 2025'
emoji: ☁️

description: >
  AWS recently announced two new actions for CodePipeline: `ECRBuildAndPublish`
  and `InspectorScan`, let's see how the first one can simplify the process of
  building and publishing Docker images to Amazon ECR.
---

AWS recently
[announced](https://aws.amazon.com/about-aws/whats-new/2024/11/aws-codepipeline-publishing-ecr-image-aws-inspectorscan-actions/)
two new actions for CodePipeline: `ECRBuildAndPublish` and `InspectorScan`,
let's see how the first one can simplify the process of building and publishing
Docker images to Amazon ECR.

> 🚨 **Need a full example?** I published a complete Terraform template here:
> **[daniele-salvagni/codepipeline-ecr-build-and-publish-tf](https://github.com/daniele-salvagni/codepipeline-ecr-build-and-publish-tf)**

## Before the update

Before this update, the process of building and publishing a Docker image to
Amazon ECR involved using **CodeBuild** with a custom `buildspec.yml` which
looked something like this:

```yaml
version: 0.2

phases:
  pre_build:
    commands:
      - echo Logging in to Amazon ECR...
      - aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login
        --username AWS --password-stdin
        $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com
  build:
    commands:
      - echo Build started on `date`
      - echo Building the Docker image...
      - docker build -t $IMAGE_REPO_NAME:$IMAGE_TAG .
      - docker tag $IMAGE_REPO_NAME:$IMAGE_TAG
        $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_REPO_NAME:$IMAGE_TAG
  post_build:
    commands:
      - echo Build completed on `date`
      - echo Pushing the Docker image...
      - docker push
        $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_REPO_NAME:$IMAGE_TAG
```

I am sure you also had to copy-paste this boilerplate more than once from the
[AWS documentation](https://docs.aws.amazon.com/codebuild/latest/userguide/sample-docker.html).
Moreover, you had to write infrastructure code to also create the CodeBuild
resources.

## The new ECRBuildAndPublish action

With the introduction of the `ECRBuildAndPublish` action for **CodePipeline**
(v2), it is no longer necessary to write a buildspec, as everything is managed
by AWS which still uses CodeBuild under the hood.

Here is an example within a **CloudFormation** template for building the image,
and publishing it with the "latest" and commit ID tags to an ECR repository (the
relevant part is the `Build` stage):

```yaml
Resources:
  CodePipeline:
    Type: AWS::CodePipeline::Pipeline
    Properties:
      # ...
      Stages:
        # Get the source code from a repository
        - Name: Source
          Actions:
            - Name: Source
              ActionTypeId:
                Category: Source
                Owner: AWS
                Provider: CodeStarSourceConnection
                Version: '1'
              Configuration:
                ConnectionArn: !Sub MyCodeStarConnectionArn
                FullRepositoryId: !Sub MyFullRepositoryId
                BranchName: !Sub MyBranchName
              Namespace: SourceVars
              OutputArtifacts:
                - Name: source_output
              RunOrder: 1

        # Build and publish the Docker image to ECR
        - Name: Build
          Actions:
            - Name: Build
              ActionTypeId:
                Category: Build
                Owner: AWS
                Provider: ECRBuildAndPublish
                Version: '1'
              Configuration:
                ECRRepositoryName: !Sub MyECRRepositoryName
                DockerFilePath: ./
                ImageTags: '#{SourceVars.CommitId},latest'
              Namespace: BuildVars
              InputArtifacts:
                - Name: source_output
              RunOrder: 1
```

Or, the equivalent in **Terraform**:

```hcl
resource "aws_codepipeline" "codepipeline" {
  name          = "${var.resource_prefix}-pipeline"
  pipeline_type = "V2"

  role_arn = aws_iam_role.codepipeline_role.arn

  artifact_store {
    location = aws_s3_bucket.artifact_store.bucket
    type     = "S3"
  }

  stage {
    name = "Source"
    action {
      name             = "Source"
      category         = "Source"
      namespace        = "SourceVars"
      owner            = "AWS"
      provider         = "CodeStarSourceConnection"
      version          = 1
      output_artifacts = ["source_output"]
      configuration = {
        ConnectionArn    = var.source_codestar_arn
        FullRepositoryId = var.source_full_repo_id
        BranchName       = var.source_branch_name
      }
    }
  }

  stage {
    name = "Build"
    action {
      name            = "Build"
      category        = "Build"
      namespace       = "BuildVars"
      owner           = "AWS"
      provider        = "ECRBuildAndPublish"
      version         = 1
      input_artifacts = ["source_output"]

      configuration = {
        ECRRepositoryName = var.ecr_repo_name
        DockerFilePath    = var.dockerfile_path
        ImageTags         = "#{SourceVars.CommitId},latest"
      }
    }
  }
}
```

Also note how, in both examples, it is possible to use Namespaces to pass
[action variables](https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-variables.html)
between stages with the `#{...}` syntax (e.g., the commit ID).
