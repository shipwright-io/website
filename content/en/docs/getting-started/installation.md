---
title: "Installation"
description: "Install Shipwright on your Kubernetes cluster."
draft: false
weight: 10
---

The Shipwright Build APIs and controllers can be installed directly with our release deployment, or
with our operator.

## Prerequsites

- [Kubernetes](https://kubernetes.io/) 1.21 or later.
- [Tekton pipelines](https://tekton.dev/docs/installation/) v0.41 or later. 

  ```bash
  kubectl apply --filename https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml
  ```

## Installing Shipwright Builds with the Operator

The Shipwright operator is designed to be installed with the [Operator Lifecycle Manager](https://olm.operatorframework.io/) ("OLM").
Before installation, ensure that OLM has been deployed on your cluster by following the [OLM installation instructions](https://olm.operatorframework.io/docs/getting-started/#installing-olm-in-your-cluster).

### Installation

Once OLM has been deployed, use the following command to install the latest operator release from [operatorhub.io](https://operatorhub.io/operator/shipwright-operator):

```sh
$ kubectl apply -f https://operatorhub.io/install/shipwright-operator.yaml
```

### Usage

To deploy and manage [Shipwright Builds](https://github.com/shipwright-io/build) in your cluster,
first make sure this operator is installed and running.

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

The operator will deploy Shipwright Builds in the provided `targetNamespace`.
When `.spec.targetNamespace` is not set, the namespace will default to `shipwright-build`.
Refer to the [ShipwrightBuild documentation](docs/shipwrightbuild.md) for more information about this custom resource.

## Installing Shipwright Builds Directly

We also publish a Kubernetes manifest that installs Shipwright directly into the `shipwright-build` namespace.
Applying this manifest requires cluster administrator permissions:

```bash
$ kubectl apply -f https://github.com/shipwright-io/build/releases/latest/download/release.yaml
```

## Installing Sample Build Strategies

The Shipwright community maintains a curated set of build strategies for popular build tools.
These can be optionally installed after Shipwright Builds has been deployed:

```bash
$ kubectl apply -f https://github.com/shipwright-io/build/releases/latest/download/sample-strategies.yaml
```
