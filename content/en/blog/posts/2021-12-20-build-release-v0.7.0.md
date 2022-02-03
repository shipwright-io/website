---
title: "Shipwright v0.7.0 Is Here"
date: 2021-12-20T10:00:00-04:00
draft: false
author: "Sascha Schwarze ([@SaschaSchwarze0](https://github.com/SaschaSchwarze0)) and Adam Kaplan ([@adambkaplan](https://github.com/adambkaplan))"
---

Ready for Christmas? We are, and our v0.7.0 release just made it!

Is it a big thing just like our [previous v0.6.0 release](/blog/2021/10/26/shipwright-v0.6.0-is-here/)? No, but we have still done a couple of nice things:

## What's New

### Signed Images on ghcr.io

We decided to go away from Quay as container registry for the images that we produce, and instead to consolidate things in GitHub. The new images can therefore be found in the [Packages section of our repository](https://github.com/orgs/shipwright-io/packages?repo_name=build). No worry, nothing that you need to bother so much. You can continue to install Shipwright through the Kubernetes manifest and that has the right image location in it.

What else has changed with our images? We now sign them with [cosign](https://github.com/sigstore/cosign)! You can verify our controller image with the following command:

```txt
COSIGN_EXPERIMENTAL=1 cosign verify ghcr.io/shipwright-io/build/shipwright-build-controller:v0.7.0

Verification for ghcr.io/shipwright-io/build/shipwright-build-controller:v0.7.0 --
The following checks were performed on each of these signatures:
  - The cosign claims were validated
  - Existence of the claims in the transparency log was verified offline
  - Any certificates were verified against the Fulcio roots.

[{"critical":{"identity":{"docker-reference":"ghcr.io/shipwright-io/build/shipwright-build-controller"},"image":{"docker-manifest-digest":"sha256:887b76092d0e6f3c4f4c7b781589f41fde1c967ae9ae62f3a6bdbb18251a562f"},"type":"cosign container image signature"}...
```

Our signing process takes advantage of the new [keyless mode](https://github.com/sigstore/cosign/blob/main/KEYLESS.md) for cosign and support for [OIDC tokens in GitHub actions](https://chainguard.dev/posts/2021-12-01-zero-friction-keyless-signing).

### shp - New `buildrun delete` Command

In v0.7.0 we fixed a bug that prevented the `shp buildrun delete` command from being exposed to users.
Thanks to new [static analysis tooling](https://github.com/golangci/golangci-lint), we were able to catch this bug and make this command available.
This will be useful for clusters that rebuild their applications regularly with Shipwright, as pruning old `BuildRun` objects is essential to keeping your cluster healthy.

### Revamped Operator Experience

We have completely overhauled the operator for those who use [Operator Lifecycle Manager](https://olm.operatorframework.io/) (OLM) to install Shipwright.
The operator now comes with its own Custom Resource - `ShipwrightBuild` - that allows administrators to control where the Shipwright build controller is installed.
It also has the ability to automatically install Tekton Pipelines if Tekton's operator is present in one of OLM's catalogs.

### Other Features

So far, everything was mostly internal. No new features for our users at all? Of course not. :-) But smaller this time:

* We lifted the limit to specify image annotations and labels just on the Build. You can now also define them on the BuildRun. Our CLI finally knows them as well. You can specify them both when creating Builds and BuildRuns.
* We introduced a new [configuration option on the build controller](https://github.com/shipwright-io/build/blob/v0.7.0/docs/configuration.md): `GIT_ENABLE_REWRITE_RULE`. This is `false` by default, but you can set it to `true` in the deployment. It addresses a problem that many of our users faced downstream when using Shipwright in IBM Cloud Code Engine: to access private code repositories, they managed to get their SSH key into the system and referenced it in the Build. But, they failed to specify the SSH URL but instead used the HTTPS one. The magic flag advises our Git step to setup an [insteadOf](https://git-scm.com/docs/git-config#Documentation/git-config.txt-urlltbasegtinsteadOf) configuration so that the HTTPS URL is internally rewritten to the SSH URL automatically when applicable. The same setting also helps if you have submodules configured using HTTPS in your `.gitmodules` file, but need to pull them with authentication.
* We worked further on our environment variable support: the Buildpacks sample build strategy now performs the necessary logic to propagate them to the Buildpacks build so that you can customize the behavior of your build using one of the many configurations that the Buildpacks support.
* We also further enhanced the BuildRun status: for your Git source, we now include the branch name in case you have not specified any revision in your Build. That way you have better insights on what was built.

## Important Notes

### Dependency updates

* We updated our projects to be current: we now build with Go 1.17.
* With [Kubernetes 1.19 being out of support](https://endoflife.date/kubernetes), we changed our minimum version to 1.20 and internally build with the libraries of 1.21.
* We now want you to use [Tekton Pipelines](https://github.com/tektoncd/pipeline) 0.27 at a minimum but recommend to use the latest 0.30 version.
  The Shipwright team contributed a [fix](https://github.com/tektoncd/pipeline/pull/4372) that optimizes reconciliations for TaskRuns that are similar to those created by Shipwright BuildRuns.

### Deprecations and Breaking Changes

* As previously noted, the minimum supported version of Kubernetes for Shipwright is now v1.20, and the minimum supported version of Tekton Pipelines is 0.27.
* In Shipwright build strategies, an `emptyDir` volume is implicitly created if the strategy uses volume mounts in the build stpes.
  This implicit behavior is now deprecated, and will be replaced with explicit support for volumes in an upcoming release.


## How to install

### Shipwright Builds

Nothing has changed on the installation. Assuming your Kubernetes cluster is ready, it's all done with just these three commands, which install Tekton, Shipwright, and the sample build strategies.

```sh
kubectl apply -f https://storage.googleapis.com/tekton-releases/pipeline/previous/v0.30.0/release.yaml
kubectl apply -f https://github.com/shipwright-io/build/releases/download/v0.7.0/release.yaml
kubectl apply -f https://github.com/shipwright-io/build/releases/download/v0.7.0/sample-strategies.yaml
```

### shp Command Line

For the CLI, we still have no package manager support. :-( You therefore need to get the release again from GitHub:

#### Windows

```sh
$ curl --silent --fail --location https://github.com/shipwright-io/cli/releases/download/v0.7.0/cli_0.7.0_windows_x86_64.tar.gz | tar xzf - shp.exe
$ shp help
```

#### Mac

```sh
$ curl --silent --fail --location https://github.com/shipwright-io/cli/releases/download/v0.7.0/cli_0.7.0_macOS_x86_64.tar.gz | tar -xzf - -C /usr/local/bin shp
$ shp help
```

#### Linux

```sh
$ curl --silent --fail --location "https://github.com/shipwright-io/cli/releases/download/v0.7.0/cli_0.7.0_linux_$(uname -m | sed 's/aarch64/arm64/').tar.gz" | sudo tar -xzf - -C /usr/bin shp
$ shp help
```

### Operator

Coming soon! We are in the process of adding the new version of the Shipwright operator to [OperatorHub](https://operatorhub.io).
Once the new version has been added, you can follow the provided instructions on OperatorHub to install the operator with OLM.
If you previously installed v0.1.0 of the Shipwright operator, you must remove it first.

Once the operator has been installed, you will be able to deploy the Build controller and APIs by creating an instance of the `ShipwrightBuild` custom resource:

```yaml
apiVersion: operator.shipwright.io/v1alpha1
kind: ShipwrightBuild
metadata:
  name: shipwright-build
spec:
  targetNamespace: shipwright-build
```

## What's next ?

We have cool stuff being under development. So, let me list four items that are all cool and are in the makings.

Soon you should be able to see an evolution of parameters: build strategy authors will be able to define array parameters which is required for scenarios such as build-args for Dockerfile-based builds, and Build users will be able to define that the value should be retrieved from a ConfigMap or Secret.

We work on the next evolution of error reporting inside BuildRuns. Where you today just see a BuildRun being failed and must look at the Pod logs to determine the root cause, you will see further error reasons and messages in the BuildRun status directly – with those details provided internally in our Shipwright-managed steps (like the Git step, for example when a revision does not exist), but also by the build strategy author (for example if Buildpacks fail to detect any source code, or a Dockerfile-based strategy when the Dockerfile does not exist).

We are also looking to add support for volumes (such as `PersistenVolumeClaims`) in future releases.
Our first pass will help build strategy authors add volumes in their build steps, enabling capabilities such as artifact and image layer caching.

Finally, we investigated and spiked on different approaches to support building from source code from your local disk rather than from a Git repository. Part of the code is even in the product already, but we need more time to get it done end-to-end.

Stay tuned!
