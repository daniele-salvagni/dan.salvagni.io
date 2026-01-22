---
title: aws-eks
---

## Add-ons

### Check Add-ons version

Check recommended EKS add-on versions and Pod Identity configuration.

```sh
#!/usr/bin/env bash
set -e

export AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION:-eu-central-1}"

K8S_VERSION="1.34"

# Addons we're using
ADDONS=(
    "vpc-cni"
    "kube-proxy"
    "coredns"
    "aws-ebs-csi-driver"
    "amazon-cloudwatch-observability"
    "eks-pod-identity-agent"
)

echo "EKS Addon Versions for Kubernetes $K8S_VERSION"

for ADDON in "${ADDONS[@]}"; do
    echo "------------------------------------------"
    echo "Addon: $ADDON"

    # Get default version
    DEFAULT=$(aws eks describe-addon-versions \
        --addon-name "$ADDON" \
        --query "addons[0].addonVersions[?compatibilities[?clusterVersion=='$K8S_VERSION' && defaultVersion==\`true\`]].addonVersion | [0]" \
        --output text 2>/dev/null || echo "None")

    # Get latest version
    LATEST=$(aws eks describe-addon-versions \
        --addon-name "$ADDON" \
        --query "addons[0].addonVersions[?compatibilities[?clusterVersion=='$K8S_VERSION']].addonVersion | [0]" \
        --output text 2>/dev/null || echo "None")

    echo "Default: $DEFAULT"
    echo "Latest:  $LATEST"

    # Check pod identity for addons that need it
    if [[ "$ADDON" == "aws-ebs-csi-driver" || "$ADDON" == "amazon-cloudwatch-observability" ]]; then
        POD_IDENTITY=$(aws eks describe-addon-configuration \
            --addon-name "$ADDON" \
            --addon-version "$DEFAULT" \
            --query "podIdentityConfiguration" \
            --output json 2>/dev/null || echo "null")

        if [[ "$POD_IDENTITY" != "null" && "$POD_IDENTITY" != "[]" ]]; then
            echo "Pod Identity: Supported"
            echo "Configuration:"
            echo "$POD_IDENTITY" | jq '.'
        else
            echo "Pod Identity: Not supported"
        fi
    fi
    echo
done

echo "DONE"
```
