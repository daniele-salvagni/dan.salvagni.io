---
layout: '../../layouts/CodeSnippet.astro'
title: aws-cli
---

# EC2 ssh

    chmod 0400 keypair.pem
    ssh -i keypair.pem ec2-user@1.1.1.1

# S3

    aws s3 cp s3://bucket/object.json .

# SAM

    sam init
    sam validate
    sam build
    sam deploy [--guided]
    sam delete
