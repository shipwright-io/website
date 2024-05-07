---
title: "Shipwright v0.13.0 Is Here"
date: 2024-05-16T12:00:01-04:00
draft: false
author: "Enrique Encalada ([@qu1queee](https://github.com/qu1queee))"
---

After months of diligent work, just in time for [cdCon 2024](https://cd.foundation/event/cdcon-2024/), we are releasing our `v0.13.0` release. This significant milestone incorporates a bunch of enhancements, features and bug fixes. Here are the key highlights:

## Action Required

> After upgrading from v0.12.0 to v0.13.0, you can run the following two commands to remove unnecessary permissions on the
  shipwright-build-webhook: `kubectl delete crb shipwright-build-webhook && kubectl delete cr shipwright-build-webhook`

> We switched our CRDs storage version to `v1beta1`. We strongly advise users to migrate to our `v1beta1` API, as we intend to
  deprecate `v1alpha1` in a future release. Note that the `v1alpha1` still served for all CRD's.

## Features

### Build Output Timestamp

SHIP [0037](https://github.com/shipwright-io/community/blob/main/ships/0037-build-output-timestamp.md) is now implemented. Users can make use of the Build `.spec.output.timestamp` to explicitly set the resulting container image timestamp.

### Tekton v1 API Adoption

Our Shipwright controllers now use the Tekton v1 API when working with `TaskRuns`. See [PR](https://github.com/shipwright-io/build/pull/1435).

## API Changes

### Switch Storage Version to v1beta1

The storage version for all CRD's has been switched to `v1beta1`. Concurrently, our Shipwright controllers have been updated to use this updated API version. The `v1alpha1` version continues to be supported.

### Beta API Changes

We've implemented minor adjustments to the existing `v1beta1` API for the sake of consistency, incorporating feedback gathered from the `v0.12.0` release. These are:

- Renaming certain Go Types, such as `build.Spec.Source.GitSource` to `build.Spec.Source.Git`, aligning them with their respective JSON tags.
- Designating `build.Spec.Source.Type` and `buildRun.Spec.Source.Type` as mandatory, addressing usability concerns raised by users.
- We made `build.Spec.Source` optional. Enabling the definition of a Build without any source. This feature proves valuable
  particularly when executing a Build only with local source.
- Requiring `build.spec.source.git.url` upon the specification of `build.spec.source.git`.

Further details can be found in [PR 1504](https://github.com/shipwright-io/build/pull/1504) and [PR 1441](https://github.com/shipwright-io/build/pull/1441).

## Bugs

### Conversion Webhook

As the usage of the webhook increased over the last months, we've made enhancements to address certain gaps:

- Previously, there was an issue with the proper conversion of BuildRuns from v1alpha1 to v1beta1 when a generated service account was utilized. This has been resolved.
- Additionally, a bug was identified where patching a completed v1beta1 BuildRun would inadvertently remove its status. This issue has been resolved.

### OCIArtifacts

When implementing prevention measures against path traversal during the extraction of an OCI artifact, we were too strict. We only needed to prevent /../ because this means to go one directory up. We still must allow `..` because a directory or file can contain two subsequent dots in its name. You can now use files and directories with two subsequent dots in its name when using an OCI artifact as source.

### Builds

When a Build with an unknown strategy kind is defined, the Build validation triggers. However, it was failing to update the Build status to `Failed`, resulting in an endless loop during reconciliation. This issue has been resolved.

## Miscellaneous

Dependabot updates play a crucial role in keeping our go dependencies current with CVE's. Building upon this, we've recently implemented a similar automation to streamline the process of updating our CI Github actions, see [PR 1516](https://github.com/shipwright-io/build/pull/1516).

Furthermore, we have been consistently updating all of our Build tools, such as `ko` and `buildpacks`, using our custom automation, ensuring that our Strategies remain on the latest versions.

It's worth noting that our minimum supported Kubernetes version is now 1.27, while the minimum Tekton version is 0.50.*. 

Additionally, Shipwright Build is now compiled with Go 1.21

## Docs

Our general [Roadmap](https://github.com/shipwright-io/build/blob/main/ROADMAP.md) and [Adopters](https://github.com/shipwright-io/build/blob/main/ADOPTERS.md) doc has been updated.


## Installing Shipwright

### Build

1. Install Tekton v0.50.5:

   ```bash
   kubectl apply --filename https://storage.googleapis.com/tekton-releases/pipeline/previous/v0.50.5/release.yaml
   ```

2. Install v0.13.0 using the release YAML manifest:

   ```bash
   kubectl apply --filename https://github.com/shipwright-io/build/releases/download/v0.13.0/release.yaml --server-side

   curl --silent --location https://raw.githubusercontent.com/shipwright-io/build/v0.13.0/hack/setup-webhook-cert.sh | bash
   ```

3. (Optionally) Install the sample build strategies using the YAML manifest:

   ```bash
   kubectl apply --filename https://github.com/shipwright-io/build/releases/download/v0.13.0/sample-strategies.yaml --server-side
   ```

### CLI

#### Windows

```sh
curl --silent --fail --location https://github.com/shipwright-io/cli/releases/download/v0.13.0/cli_0.13.0_windows_x86_64.tar.gz | tar xzf - shp.exe
shp version
shp help
```

#### Mac

```sh
curl --silent --fail --location https://github.com/shipwright-io/cli/releases/download/v0.13.0/cli_0.13.0_macOS_$(uname -m).tar.gz | tar -xzf - -C /usr/local/bin shp
shp version
shp help
```

#### Linux

```sh
curl --silent --fail --location "https://github.com/shipwright-io/cli/releases/download/v0.13.0/cli_0.13.0_linux_$(uname -m | sed 's/aarch64/arm64/').tar.gz" | sudo tar -xzf - -C /usr/bin shp
shp version
shp help
```

