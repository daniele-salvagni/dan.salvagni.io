---
title: aws-cli
---

## Profiles

The following commands are available through the `aws` zsh plugin:

```sh
aws_profiles      # list available profiles
asp [<profile>]   # set profile (or clear it)
agp               # get current profile
asr [<region>]    # set region (or clear it)
agr               # get current region
```

To create a new profile, use the `aws configure --profile <profile>` command.

Use [Leapp](https://www.leapp.cloud/) to manage multiple AWS profiles easily
with support for browser containers.

## IAM

List users in table format

```sh
aws iam list-users –output table
```

List users by ARN

```sh
aws iam list-users –output json | jq -r .Users[].Arn
```

## API Gateway

List domain names

```sh
aws apigateway get-domain-names | jq -r ‘.items[ ] | .domainName+” “+.regionalDomainName’
```

## CloudFront

Create a new invalidation

```sh
aws cloudfront create-invalidation <distribution-id>
```

## EC2

List available EC2 Images

```sh
aws ec2 describe-images | grep ubuntu
```

SSH into an EC2 instance

```sh
chmod 0400 keypair.pe`
ssh -i keypair.pem ec2-user@<ip>
```

## S3

Create / delete a bucket

```sh
aws s3 mb s3://bucket
aws s3 rb s3://bucket --force
```

Object operations

```sh
aws s3 ls
aws s3 ls s3://bucket/folder --recursive --human-readable --summarize

aws s3 cp s3://bucket/object.json .
aws s3 cp folder s3://bucket/folder --recursive

aws s3 rm s3://bucket/object.json
aws s3 rm s3://bucket/folder --recursive

aws s3 sync s3://bucket/folder .
aws s3 sync . s3://bucket/folder --exclude *.tmp
```

Move an S3 Bucket to a different location

```sh
aws s3 sync s3://oldbucket s3://newbucket --source-region us-west-1 --region us-west-2
```

## DynamoDB

List tables

```sh
aws dynamodb list-tables | jq -r .TableNames [ ]
```

## SAM

```sh
sam init
sam validate
sam build
sam deploy [--guided]
sam delete
```

SAM Accelerate:

```sh
sam sync -t template.yaml \
    --stack-name <stack-name> \
    --resource-id <resource> \
    --region eu-central-1
```

## CloudFormation

Validate a CloudFormation template before launching it

```sh
aws cloudformation validate-template --region eu-west-1 --template-url https://s3-eu-west-1.amazonaws.com/ca/ca.cftemplate
```

## RDS

List the available db engines
(`aurora-mysql`,`aurora-postgresql`,`custom-oracle-ee`,`mariadb`,`mysql`,`oracle-ee`,`oracle-ee-cdb`,`oracle-se2`,`oracle-se2-cdb`,`postgres`,`sqlserver-ee`,`sqlserver-se`,`sqlserver-ex`,`sqlserver-web`):

```sh
aws rds describe-db-engine-versions --region eu-west-1 --output json --query 'DBEngineVersions[*].{Engine:Engine,EngineVersion:EngineVersion,DBEngineDescription:DBEngineDescription}' > db-engines.json
```

List the available db instances for a given engine:

```sh
aws rds describe-orderable-db-instance-options --region eu-west-1 --output json --engine sqlserver-ee --query 'OrderableDBInstanceOptions[*].{Engine:Engine,EngineVersion:EngineVersion, DBInstanceClass:DBInstanceClass}' > db-instances.json
```

## SQS

```sh
aws sqs list-queues | jq -r ‘.QueueUrls[ ]’
aws sqs create-queue --queue-name public-events.fifo | jq -r .queueURL
aws sqs send-message --queue-url (url) --message-body (message)
aws sqs receive-message --queue-url (url) | jq -r ‘.Messages[ ] | .Body’
aws sqs delete-message --queue url (url) --receipt-handle (receipt handle)
aws sqs purge-queue --queue-url (url)
aws sqs delete-queue --queue-url (url)
```
