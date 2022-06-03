---
title: "Shipwright v0.10.0 Is Here"
date: 2022-06-03T14:20:01-04:00
draft: false
author: "Sascha Schwarze ([@SaschaSchwarze0](https://github.com/SaschaSchwarze0))"
---

Just before [cdCon 2022](https://cd.foundation/event/cdcon-2022/), we are releasing our v0.10 release. But before we look into it, we would like to invite you to join our cdCon sessions. We'll have two interesting presentations and a summit where you can bring every feedback and suggestion that you would like to share with us, and bring all your questions that you want to get answered. See [our blog post](../../../05/23/upcoming-shipwright-community-summit/) for more information. See you in Austin or in the virtual space.

## Features

Let's get back to v0.10. It comes with one big and long-wanted feature:

### Volume support

We extended our build strategy resource to contain volumes. Build strategy authors can "finalize" them - or make them overridable by Build users.

The most interesting scenario that this enables is the caching of build artifacts. Here is how the [ko build strategy](https://github.com/shipwright-io/build/blob/v0.10.0/samples/buildstrategy/ko/buildstrategy_ko_cr.yaml) makes use of it:

- The [build strategy defines a volume for the caching](https://github.com/shipwright-io/build/blob/v0.10.0/samples/buildstrategy/ko/buildstrategy_ko_cr.yaml#L24-L27). The volume is of type `emptyDir`. Those are ephemeral volumes for the runtime of a pod. The default behavior therefore is that no caching happens just like the strategy behaves all the time. But, the build strategy defines the volume as overridable.
- Build users can therefore override that volume in their Build (or BuildRun, but for caching scenarios, the Build makes most sense), and point to a writable persistent volume. This allows reuse across BuildRuns.
- The [ko build strategy references the volume in one of its steps](https://github.com/shipwright-io/build/blob/v0.10.0/samples/buildstrategy/ko/buildstrategy_ko_cr.yaml#L58-L60) and [uses it for the GOCACHE](https://github.com/shipwright-io/build/blob/v0.10.0/samples/buildstrategy/ko/buildstrategy_ko_cr.yaml#L68-L69).

Especially if you rebuild larger projects, the performance gain is enormous.

We will look at other sample build strategies in the future and will evolve them with volume support in the next releases.

**Note**: the feature comes with one breaking change that is relevant for Build Strategy authors. Previously, you were able to define `volumeMounts` on `buildSteps`. Shipwright then implicitly added the volumes with an emptyDir. Given we now support volumes in build strategies, we force build strategy authors to define the volume. We did that in other sample build strategies where such implicit volumes were used to share directories between `buildSteps`. For example, the [source-to-image build strategy now has explicit emptyDir volumes](https://github.com/shipwright-io/build/blob/v0.10.0/samples/buildstrategy/source-to-image/buildstrategy_source-to-image_cr.yaml#L7-L10) to share directories between the source analysis and build step.

### Smaller items

Beside that, we invested in maintenance-related items:

- Dependabot now helps us to deliver secure releases by notifying us of necessary updates in our Go modules. We already merged [its first pull requests](https://github.com/shipwright-io/build/pulls?q=is%3Apr+author%3Aapp%2Fdependabot+milestone%3Arelease-v0.10.0).
- We now build with Go 1.18
- We're now supporting up to Tekton v0.35

## Installing Shipwright

### Build

1. Install Tekton v0.35.1:

   ```bash
   kubectl apply -f https://storage.googleapis.com/tekton-releases/pipeline/previous/v0.35.1/release.yaml
   ```

2. Install v0.10.0 using the release YAML manifest:

   ```bash
   kubectl apply -f https://github.com/shipwright-io/build/releases/download/v0.10.0/release.yaml
   ```

3. (Optionally) Install the sample build strategies using the YAML manifest:

   ```bash
   kubectl apply -f https://github.com/shipwright-io/build/releases/download/v0.10.0/sample-strategies.yaml
   ```

### CLI

#### Windows

```sh
curl --silent --fail --location https://github.com/shipwright-io/cli/releases/download/v0.10.0/cli_0.10.0_windows_x86_64.tar.gz | tar xzf - shp.exe
shp version
shp help
```

#### Mac

```sh
curl --silent --fail --location https://github.com/shipwright-io/cli/releases/download/v0.10.0/cli_0.10.0_macOS_$(uname -m).tar.gz | tar -xzf - -C /usr/local/bin shp
shp version
shp help
```

#### Linux

```sh
curl --silent --fail --location "https://github.com/shipwright-io/cli/releases/download/v0.10.0/cli_0.10.0_linux_$(uname -m | sed 's/aarch64/arm64/').tar.gz" | sudo tar -xzf - -C /usr/bin shp
shp version
shp help
```

### Operator

To deploy and manage Shipwright Builds in your cluster, first make sure the operator v0.10.0 is installed and running on your cluster. You can follow the instructions on [OperatorHub](https://operatorhub.io/operator/shipwright-operator).

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
