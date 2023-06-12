---
layout: '../../layouts/CodeSnippet.astro'
title: aws-cli
---

# Profiles

The following commands are available through the `aws` zsh plugin:

```shell
aws_profiles      # list available profiles
asp [<profile>]   # set profile (or clear it)
agp               # get current profile
asr [<region>]    # set region (or clear it)
agr               # get current region
```

To create a new profile, use the `aws configure --profile <profile>` command.

# EC2 ssh

    chmod 0400 keypair.pem
    ssh -i keypair.pem ec2-user@<ip>

# S3

    aws s3 ls s3://bucket/folder --recursive --human-readable --summarize

    aws s3 cp s3://bucket/object.json .
    aws s3 cp folder s3://bucket/folder --recursive

    aws s3 rm s3://bucket/object.json
    aws s3 rm s3://bucket/folder --recursive

    aws s3 sync s3://bucket/folder .
    aws s3 sync . s3://bucket/folder --exclude *.tmp

# SAM

    sam init
    sam validate
    sam build
    sam deploy [--guided]
    sam delete

SAM Accelerate:

    sam sync -t template.yaml \
        --stack-name <stack-name> \
        --resource-id <resource> \
        --region eu-central-1

# RDS

List the available db engines
(`aurora-mysql`,`aurora-postgresql`,`custom-oracle-ee`,`mariadb`,`mysql`,`oracle-ee`,`oracle-ee-cdb`,`oracle-se2`,`oracle-se2-cdb`,`postgres`,`sqlserver-ee`,`sqlserver-se`,`sqlserver-ex`,`sqlserver-web`):

    aws rds describe-db-engine-versions --region eu-west-1 --output json --query 'DBEngineVersions[*].{Engine:Engine,EngineVersion:EngineVersion,DBEngineDescription:DBEngineDescription}' > db-engines.json

List the available db instances for a given engine:

    aws rds describe-orderable-db-instance-options --region eu-west-1 --output json --engine sqlserver-ee --query 'OrderableDBInstanceOptions[*].{Engine:Engine,EngineVersion:EngineVersion, DBInstanceClass:DBInstanceClass}' > db-instances.json
