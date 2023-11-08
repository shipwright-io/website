---
title: "Shipwright v0.12.0 Is Here"
date: 2023-11-05T12:00:01-04:00
draft: false
author: "Enrique Encalada ([@qu1queee](https://github.com/qu1queee))"
---

Shipwright is back with the v0.12.0 release, moving our API from _alpha_ to _beta_.

Some key points to consider:

- Starting with the _v0.12.0_ release, a conversion webhook is deployed to provide support for both _v1alpha1_ and _v1beta1_ API versions.
- Users are encouraged to adopt the _v1beta1_ API.
- Support for _v1alpha1_ will continue for some additional releases. Part of the _v1alpha1_ API is already deprecated and not available in _v1beta1_.


Please take a look at the following blog [post](https://shipwright.io/blog/2023/11/07/introducing-shipwright-beta-api/) to see some of our guidelines on moving your Shipwright Custom Resources from _alpha_ to _beta_.

## Installing Shipwright

### Build

1. Install Tekton v0.47.4:

   ```bash
   kubectl apply --filename https://storage.googleapis.com/tekton-releases/pipeline/previous/v0.47.4/release.yaml
   ```

2. Install v0.12.0 using the release YAML manifest:

   ```bash
   kubectl apply --filename https://github.com/shipwright-io/build/releases/download/v0.12.0/release.yaml --server-side

   curl --silent --location https://raw.githubusercontent.com/shipwright-io/build/v0.12.0/hack/setup-webhook-cert.sh | bash
   ```

3. (Optionally) Install the sample build strategies using the YAML manifest:

   ```bash
   kubectl apply --filename https://github.com/shipwright-io/build/releases/download/v0.12.0/sample-strategies.yaml --server-side
   ```

### CLI

#### Windows

```sh
curl --silent --fail --location https://github.com/shipwright-io/cli/releases/download/v0.12.0/cli_0.12.0_windows_x86_64.tar.gz | tar xzf - shp.exe
shp version
shp help
```

#### Mac

```sh
curl --silent --fail --location https://github.com/shipwright-io/cli/releases/download/v0.12.0/cli_0.12.0_macOS_$(uname -m).tar.gz | tar -xzf - -C /usr/local/bin shp
shp version
shp help
```

#### Linux

```sh
curl --silent --fail --location "https://github.com/shipwright-io/cli/releases/download/v0.12.0/cli_0.12.0_linux_$(uname -m | sed 's/aarch64/arm64/').tar.gz" | sudo tar -xzf - -C /usr/bin shp
shp version
shp help
```

### Operator

To deploy and manage Shipwright Builds in your cluster, first ensure the operator v0.12.0 is installed and running on your cluster. You can follow the instructions on [OperatorHub](https://operatorhub.io/operator/shipwright-operator).

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
