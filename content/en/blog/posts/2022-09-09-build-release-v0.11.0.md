---
title: "Shipwright v0.11.0 Is Here"
date: 2022-09-09T12:00:01-04:00
draft: false
author: "Sascha Schwarze ([@SaschaSchwarze0](https://github.com/SaschaSchwarze0))"
---

Shipwright is back with the v0.11.0 release. It is mostly a maintenance release without new features:

* We updated dependencies to mitigate security vulnerabilities.
* We updated our images to be based on the new Red Hat Universal Base Image 9 Minimal.
* We updated build strategy tools as usual. This includes a fix that re-enabled the ko build strategy. Congratulations to them for moving into the own organization. It is a great build tool that we do not just provide a sample for, but also use in our own builds.

Behind the scenes we are working on streamlining our API objects. As a first step, we deprecate the following fields:

* In Builds, `spec.sources` is deprecated. We will consolidate supporting a single source for a Build under `spec.source`. Also, HTTP sources are deprecated because we think that the focus that secure software supply chain brings, does not match with artifacts that are loaded from an HTTP endpoint.
* In Builds, `spec.dockerfile` and `spec.builder` are deprecated. Those fields were introduced at the very beginning of this project to support relevant build strategies. But, those fields only relate to specific build strategies. Since a couple of releases, we support [strategy parameters](https://shipwright.io/docs/build/buildstrategies/#strategy-parameters) for that purpose where we will move to.
* In BuildRuns, `spec.serviceAccount.generate` is deprecated. We think that the adhoc generation of service accounts does not fit very well in Kubernetes' security principals and will therefore move away from that concept.

## Installing Shipwright

### Build

1. Install Tekton v0.38.3:

   ```bash
   kubectl apply -f https://storage.googleapis.com/tekton-releases/pipeline/previous/v0.38.3/release.yaml
   ```

2. Install v0.11.0 using the release YAML manifest:

   ```bash
   kubectl apply -f https://github.com/shipwright-io/build/releases/download/v0.11.0/release.yaml
   ```

3. (Optionally) Install the sample build strategies using the YAML manifest:

   ```bash
   kubectl apply -f https://github.com/shipwright-io/build/releases/download/v0.11.0/sample-strategies.yaml
   ```

### CLI

#### Windows

```sh
curl --silent --fail --location https://github.com/shipwright-io/cli/releases/download/v0.11.0/cli_0.11.0_windows_x86_64.tar.gz | tar xzf - shp.exe
shp version
shp help
```

#### Mac

```sh
curl --silent --fail --location https://github.com/shipwright-io/cli/releases/download/v0.11.0/cli_0.11.0_macOS_$(uname -m).tar.gz | tar -xzf - -C /usr/local/bin shp
shp version
shp help
```

#### Linux

```sh
curl --silent --fail --location "https://github.com/shipwright-io/cli/releases/download/v0.11.0/cli_0.11.0_linux_$(uname -m | sed 's/aarch64/arm64/').tar.gz" | sudo tar -xzf - -C /usr/bin shp
shp version
shp help
```

### Operator

To deploy and manage Shipwright Builds in your cluster, first make sure the operator v0.11.0 is installed and running on your cluster. You can follow the instructions on [OperatorHub](https://operatorhub.io/operator/shipwright-operator).

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
