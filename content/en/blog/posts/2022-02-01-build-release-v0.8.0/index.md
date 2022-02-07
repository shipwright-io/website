---
title: "Shipwright v0.8.0 Is Here"
date: 2022-02-01T21:36:00-04:00
draft: false
author: "Enrique Encalada ([@qu1queee](https://github.com/qu1queee))"
---

So, you have heard great things about Shipwright last year and you are ready for more? We are starting the year with our [v0.8.0](https://github.com/shipwright-io/build/releases/tag/v0.8.0), and here is a list of the most relevant things you should know.

## Features

As promised in the [v0.7.0](https://shipwright.io/blog/2021/12/20/shipwright-v0.7.0-is-here/#whats-next-) blog post, we closed last year developing three interesting features.

### Array support in Parameters

We introduced an extension to the **parameter** feature, by allowing users to define parameters in the form of a list. A list can be composed of values from secrets, configmaps or plain values.

Our main driver was the support for [ARGS](https://docs.docker.com/engine/reference/builder/#using-arg-variables) in Dockerfiles. This allows users to further [customize](https://github.com/shipwright-io/sample-go/blob/main/docker-build-with-args/Dockerfile) their builds, by specifying variables that are available to the `RUN` command.

In addition, being able to use primitive resources (_such as secrets and configmaps_) to store key-values, allows users to protect confidential data or to share data when defining parameters values in their `Builds` or `BuildRuns`.

**Note**: For more details on this, please see the [docs](https://github.com/shipwright-io/build/blob/v0.8.0/docs/buildstrategies.md#strategy-parameters).

### Surfacing Errors in the BuildRun Status

Surfacing errors from different containers can be a challenging task, not because of technicality, but rather the question of the best way to represent the state. In case of _failure_ or _success_ during execution, we surface the state under the `.status` subresource of a `BuildRun`.

```yaml
apiVersion: shipwright.io/v1alpha1
kind: BuildRun
# [...]
status:
  # [...]
  failureDetails:
    location:
      container: step-source-default
      pod: baran-build-buildrun-gzmv5-b7wbf-pod-bbpqr
    message: The source repository does not exist, or you have insufficient permission
      to access it.
    reason: GitRemotePrivate
```

In this release we concentrated on improving the state of errors that occur during the cloning of _git_ repositories, by introducing `.status.failureDetails` field. This provides further details on why `step-source-default` failed.

In addition, this feature [enables](https://github.com/shipwright-io/build/blob/v0.8.0/docs/buildstrategies.md#system-results) Build Strategy Authors to signalize what to surface under `.status.failureDetails.reason` and `.status.failureDetails.message`, in case a container terminates with a non-zero exit code. We will be gradually adopting this capability in our strategies, at the moment it is only used in the Buildkit [strategy](https://github.com/shipwright-io/build/blob/v0.8.0/samples/buildstrategy/buildkit/buildstrategy_buildkit_cr.yaml#L96-L97).

_Now you do not need to worry if you have git misconfigurations in your `Builds`, we got you covered!_

**Note**: For more details, please see the [docs](https://github.com/shipwright-io/build/blob/main/docs/buildrun.md#understanding-failed-buildruns).

### Local Source Upload

At Shipwright, we've spent a lot of time trying to figure out the best ways to simplify the experience when building container images. In this release we are introducing a new feature that dramatically improves it, we call it **Local Source Upload** .

This feature allows users to build container images from their local source code, improving the developer experience and moving them closer to the inner dev loop (_single developer workflow_).

```sh
$ shp build upload -h

Creates a new BuildRun instance and instructs the Build Controller to wait for the data streamed,
instead of executing "git clone". Therefore, you can employ Shipwright Builds from a local repository
clone.

The upload skips the ".git" directory completely, and it follows the ".gitignore" directives, when
the file is found at the root of the directory uploaded.

 $ shp buildrun upload <build-name>
 $ shp buildrun upload <build-name> /path/to/repository

Usage:
  shp build upload <build-name> [path/to/source|.] [flags]
```

Go ahead and give it a try! The feature is now available in the [v0.8.0](https://github.com/shipwright-io/cli/releases/tag/v0.8.0) cli, look for `shp build upload`!

## Installing Shipwright

### Build

1. Install Tekton v0.30.1

   ```bash
   kubectl apply -f https://storage.googleapis.com/tekton-releases/pipeline/previous/v0.30.1/release.yaml

2. Install v0.8.0 using the release YAML manifest:

   ```bash
   kubectl apply -f https://github.com/shipwright-io/build/releases/download/v0.8.0/release.yaml
   ```

3. (Optionally) Install the sample build strategies using the YAML manifest:

   ```bash
   kubectl apply -f https://github.com/shipwright-io/build/releases/download/v0.8.0/sample-strategies.yaml
   ```

### SHP CLI

#### Windows

```sh
curl --silent --fail --location https://github.com/shipwright-io/cli/releases/download/v0.8.0/cli_0.8.0_windows_x86_64.tar.gz | tar xzf - shp.exe
shp help
```

#### Mac

```sh
curl --silent --fail --location https://github.com/shipwright-io/cli/releases/download/v0.8.0/cli_0.8.0_macOS_x86_64.tar.gz | tar -xzf - -C /usr/local/bin shp
shp help
```

#### Linux

```sh
curl --silent --fail --location "https://github.com/shipwright-io/cli/releases/download/v0.8.0/cli_0.8.0_linux_$(uname -m | sed 's/aarch64/arm64/').tar.gz" | sudo tar -xzf - -C /usr/bin shp
shp help
```

### Operator

To deploy and manage Shipwright Builds in your cluster, first make sure the operator v0.8.0 is installed and running on your cluster. You can follow the instructions on [OperatorHub](https://operatorhub.io/operator/shipwright-operator).

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
