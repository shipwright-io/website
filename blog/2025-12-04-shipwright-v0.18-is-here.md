---
title: "Shipwright v0.18 Is Here!"
description: "Shipwright v0.18 release announcement with new features, fixes, and deprecations."
date: 2025-12-04T16:00:00-04:00
slug: shipwright-v0.18-is-here
authors: [saschaschwarze0]
tags: [shipwright, release]
---

We are excited to announce the release of Shipwright v0.18.0! This release brings a small set of
new features.

<!-- truncate -->

## Build Updates

In this release, we have made changes under the covers to run containers as much as possible with read-only root file system. Note that those changes are only active as long as you do not overwrite the step templates for out-of-the box containers in the [configuration](/docs/build/configuration/). If you had made customizations there, make sure to merge your changes with our extensions.

Beside that, we have updated Build to utilize the Tekton v1.6 APIs. The minimum supported Kubernetes version is now v1.32.0. The minimum supported Tekton version is now v0.68.0.

Check out the full release notes on [GitHub of the v0.18.0 release](https://github.com/shipwright-io/build/releases/tag/v0.18.0) for further details. Note that there is also already a [v0.18.1 release](https://github.com/shipwright-io/build/releases/tag/v0.18.1) that is a rebuild with the new Go version released recently that fixed vulnerabilities

## CLI Maintenance Update

The CLI has no new features but updated dependencies.

See the CLI release notes on [GitHub](https://github.com/shipwright-io/cli/releases/tag/v0.18.0)

## Operator Update

The operator was upgraded to deploy Shipwright Build v0.18.0 components.

In our definition, we have removed the dependency on the cert-manager and Tekton Pipelines. The reason we looked at this was that cert-manager deprecated their operator and does not provide updates anymore. For cert-manager, you now have to use another installation method. See [their installation instructions for your options](https://cert-manager.io/docs/installation/).

To stay consistent, we also removed our other dependency on Tekton Pipelines. You may still deploy Tekton Pipelines using the operator, but you can now also chose a different installation method.

See the operator release notes on [GitHub](https://github.com/shipwright-io/operator/releases/tag/v0.18.0) for details.

## Installing Shipwright

### Build

1. Install Tekton v1.6.0:

   ```bash
   kubectl apply --filename https://infra.tekton.dev/tekton-releases/pipeline/previous/v1.6.0/release.yaml
   ```

2. Install v0.18.0 using the release YAML manifest:

   ```bash
   kubectl apply --filename https://github.com/shipwright-io/build/releases/download/v0.18.0/release.yaml --server-side

   curl --silent --location https://raw.githubusercontent.com/shipwright-io/build/v0.18.0/hack/setup-webhook-cert.sh | bash
   ```

3. (Optionally) Install the sample build strategies using the YAML manifest:

   ```bash
   kubectl apply --filename https://github.com/shipwright-io/build/releases/download/v0.18.0/sample-strategies.yaml --server-side
   ```

### CLI

#### Windows

```bash
curl --silent --fail --location https://github.com/shipwright-io/cli/releases/download/v0.18.0/shp_0.18.0_windows_x86_64.tar.gz | tar xzf - shp.exe
shp version
shp help
```

#### Mac

```bash
curl --silent --fail --location https://github.com/shipwright-io/cli/releases/download/v0.18.0/shp_0.18.0_macOS_$(uname -m).tar.gz | tar -xzf - -C /usr/local/bin shp
shp version
shp help
```

#### Linux

```bash
curl --silent --fail --location "https://github.com/shipwright-io/cli/releases/download/v0.18.0/shp_0.18.0_linux_$(uname -m | sed 's/aarch64/arm64/').tar.gz" | sudo tar -xzf - -C /usr/bin shp
shp version
shp help
```

### Operator

To deploy and manage Shipwright Builds in your cluster, first ensure the operator v0.18.0 is installed and running on your cluster. You can follow the instructions on [OperatorHub](https://operatorhub.io/operator/shipwright-operator).

Next, create the following:

```yaml
---
apiVersion: operator.shipwright.io/v1alpha1
kind: ShipwrightBuild
metadata:
  name: shipwright-operator
spec:
  targetNamespace: shipwright-build
```
