---
title: "Shipwright v0.9.0 Is Here"
date: 2022-04-14T14:20:01-04:00
draft: false
author: "Matthias Diester ([@HeavyWombat](https://github.com/HeavyWombat)), Raghav Bhatnagar ([@raghavbhatnagar96](https://github.com/raghavbhatnagar96)), Sascha Schwarze ([@SaschaSchwarze0](https://github.com/SaschaSchwarze0))"
---

We are proud to have an Easter present for you: the new Shipwright v0.9.0 release with some really cool features.

## Features

Interested in what we have for you. Here are three larger items:

### Standalone BuildRuns

In Shipwright, in order to create a container image from source or a `Dockerfile`, you so far needed a `Build` and a `BuildRun`. Very simplified, it is the `Build` that contains all pieces of information required to know what to build and the `BuildRun` in this picture is the _trigger_ to kick off the actual build process. This setup allows for a good separation of concerns and is ideal for use cases in which one builds a new image from the same source repository over the course of time.

However, frequent feedback we got is that there are also use cases where users just want to have a one-off build run and in these scenarios an additional `Build` just adds unnecessary complexity.

With this release, we introduced the option to embed a build specification into a `BuildRun`. That enables standalone build runs with just one resource definition in the cluster. The build specification is exactly the same configuration one would use in a `Build` resource, so it will immediately look familiar. Instead of `buildRef` in the `BuildRun` `spec` section, use `buildSpec` to configure everything you need.

```yaml
apiVersion: shipwright.io/v1alpha1
kind: BuildRun
metadata:
  name: standalone-buildrun
spec:
  buildSpec:
    source:
      url: https://github.com/shipwright-io/sample-go.git
      contextDir: source-build
    strategy:
      kind: ClusterBuildStrategy
      name: buildpacks-v3
    output:
      image: foo/bar:latest
```

Some technical notes:

- You cannot use `buildRef` and `buildSpec` at the same time in one `BuildRun`, as this would be ambiguous. Therefore the respective `BuildRun` will reflect this with an error message in the status condition.
- The same rational applies also to the override options (e.g. `timeout`), which can only be used with the `buildRef` field. These overrides are not required, since you can define all build specific fields in the `buildSpec` directly.
- There is no preference for one or the other option, you can use `buildRef` or `buildSpec` in different build runs. It is up to your respective use case and liking.
- An embedded build specification does not count as a `Build`, it does not have a name and it does not affect the purely build related metrics (i.e. the build counter).
- Tekton `TaskRun` resources that are created by Shipwright will only have a `BuildRun` reference in their label for embedded builds, since there is no actual `Build` in the system. This is important for any label selector that might expect a `TaskRun` to have the build label.
- The `buildSpec` field and the `Build` `spec` field are technically the exact same definition. This means everything that is supported in builds is also supported as an embedded build specification. The same applies for potential field deprecation, it applies to both.

### BuildRun cleanup

In Shipwright, till now, we did not have a method to automatically delete BuildRuns. This release allows you to do that by adding a few fields to Build and BuildRun specifications. This feature can be used by adding the following fields:

- BuildRun specific time to live (TTL) fields:
  - `buildrun.spec.retention.ttlAfterFailed`: The BuildRun is deleted if the mentioned duration of time has passed after the BuildRun has failed.
  - `buildrun.spec.retention.ttlAfterSucceeded`: The BuildRun is deleted if the mentioned duration of time has passed after the BuildRun has succeeded.
- Build specific TTL fields:
  - `build.spec.retention.ttlAfterFailed`: The BuildRun is deleted if the mentioned duration of time has passed after the BuildRun has failed.
  - `build.spec.retention.ttlAfterSucceeded`: The BuildRun is deleted if the mentioned duration of time has passed after the BuildRun has succeeded.
- Build specific limit fields:
  - `build.spec.retention.succeededLimit` - Defines number of succeeded BuildRuns for a Build that can exist.
  - `build.spec.retention.failedLimit` - Defines number of failed BuildRuns for a Build that can exist.

Some technical notes:

- If both Build limits and TTL values are applied, the BuildRun will get deleted once the first criteria is met.
- In case TTL values are defined in BuildRun specification as well as Build specification, priority will be given to the values defined in the BuildRun specification.
- When changes are made to `build.spec.retention.failedLimit` and `build.spec.retention.succeededLimit` values, they become effective immediately.
- When changes are made to `build.spec.retention.ttlAfterFailed` and `build.spec.retention.ttlAfterSucceeded` values in Builds, they will only affect new BuildRuns. However, updating `buildrun.spec.retention.ttlAfterFailed` and `buildrun.spec.retention.ttlAfterSucceeded` in BuildRuns that have already been created will enforce the changes as soon as they are applied.
- If the above mentioned retention fields are not used, BuildRuns will not be deleted automatically.

Our command line interface is supporting these new fields when creating Builds, and BuildRuns:

```bash
$ shp build create my-build [...] --retention-failed-limit 10 --retention-succeeded-limit 5 --retention-ttl-after-failed 48h --retention-ttl-after-succeeded 3h

$ shp build run my-build --retention-ttl-after-failed 24h --retention-ttl-after-succeeded 1h
```

### Local sources using the bundle approach

In our v0.8.0 release, we enabled local source for builds using the streaming approach. A BuildRun is then waiting to get sources which the CLI streams using `kubectl exec` capabilities. This is an amazing feature that enables you to build container images without being required to commit and push your sources into a Git repository.

With v0.9.0, we support an alternative approach to transport sources into the BuildRun: using a container image, we call it the source bundle. You setup your build with some additional flags:

```bash
$ shp build create my-build [...] --source-bundle-image my-registry/some-image --source-bundle-prune Never|AfterPull --source-credentials-secret registry-credentials
```

And then you run it in the same way as with the streaming approach:

```bash
$ cd directory-with-my-sources
$ shp build upload my-build
```

The CLI will package the sources and upload it to the container registry. The BuildRun will download them from there. The `--source-bundle-prune` argument enables you to specify whether sources should be kept, or deleted after the BuildRun pulled them.

Why do we need two approaches? And which one should you use? Here are some criteria to decide:

- You want to use local sources without much configuration? Use the streaming approach.
- Your Kubernetes cluster does not permit you to perform a `kubectl exec` operation? Use the bundle approach.
- You want to keep the sources of your build to later access it? Use the bundle approach. The BuildRun status captures the digest of the source bundle image that was pulled:

  ```yaml
  kind: BuildRun
  status:
    sources:
      - name: default
        bundle:
          digest: sha256:ecba65abd0f49ed60b1ed40b7fca8c25e34949429ab3c6c963655e16ba324170
  ```

You can read more about this in our [CLI documentation](https://github.com/shipwright-io/cli/blob/v0.9.0/docs/local_source_upload.md).

### Smaller items

And that's not all, we have some smaller items that are worth to explore:

- We improved our sample build strategies to expose more parameters:
  - Buildpacks now has a [`platform-api-version` parameter that allows to configure the `CNB_PLATFORM_API` version](https://github.com/shipwright-io/build/blob/v0.9.0/samples/buildstrategy/buildpacks-v3/buildstrategy_buildpacks-v3_cr.yaml#L8-L10) which is relevant to use features of newer Buildpacks implementations
  - The BuildAh sample strategy now exposes its [parameters to configure default, blocked, and insecure registries as arrays](https://github.com/shipwright-io/build/blob/v0.9.0/samples/buildstrategy/buildah/buildstrategy_buildah_cr.yaml#L180-L193). It also supports [build-args](https://github.com/shipwright-io/build/blob/v0.9.0/samples/buildstrategy/buildah/buildstrategy_buildah_cr.yaml#L176-L179) in the same way as the BuildKit strategy.
  - The BuildKit strategy now supports to build multi-platform images.
- We added [documentation about how to securely reference build strategy parameters in steps without allowing users to inject code in inline scripts](https://github.com/shipwright-io/build/blob/v0.9.0/docs/buildstrategies.md#securely-referencing-string-parameters). All sample build strategies are now secure.
- We added the `shp version` command to easily figure out which version of the command line interface is installed.
- Finally, we have now [documentation for all command line interface commands](https://github.com/shipwright-io/cli/blob/v0.9.0/docs/shp.md) which is automatically generated based on our commands, the flags and their description.

## Installing Shipwright

### Build

1. Install Tekton v0.34.1

   ```bash
   kubectl apply -f https://storage.googleapis.com/tekton-releases/pipeline/previous/v0.34.1/release.yaml
   ```

2. Install v0.9.0 using the release YAML manifest:

   ```bash
   kubectl apply -f https://github.com/shipwright-io/build/releases/download/v0.9.0/release.yaml
   ```

3. (Optionally) Install the sample build strategies using the YAML manifest:

   ```bash
   kubectl apply -f https://github.com/shipwright-io/build/releases/download/v0.9.0/sample-strategies.yaml
   ```

### CLI

#### Windows

```sh
curl --silent --fail --location https://github.com/shipwright-io/cli/releases/download/v0.9.0/cli_0.9.0_windows_x86_64.tar.gz | tar xzf - shp.exe
shp version
shp help
```

#### Mac

```sh
curl --silent --fail --location https://github.com/shipwright-io/cli/releases/download/v0.9.0/cli_0.9.0_macOS_x86_64.tar.gz | tar -xzf - -C /usr/local/bin shp
shp version
shp help
```

#### Linux

```sh
curl --silent --fail --location "https://github.com/shipwright-io/cli/releases/download/v0.9.0/cli_0.9.0_linux_$(uname -m | sed 's/aarch64/arm64/').tar.gz" | sudo tar -xzf - -C /usr/bin shp
shp version
shp help
```

### Operator

To deploy and manage Shipwright Builds in your cluster, first make sure the operator v0.9.0 is installed and running on your cluster. You can follow the instructions on [OperatorHub](https://operatorhub.io/operator/shipwright-operator).

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

## What's next ?

Some really cool features are under development these days:

- Volume support will make it in the v0.10 release. Much wanted to support for example layer caching.
- We will enable Shipwright to take care if the image push operation. This will at the beginning make build strategies simpler as they don't need to take care of that anymore, including capturing the digest and size of the image. In the future this enables more scenarios that we today cannot easily implement, such as SBOM creation, or vulnerability scanning.
- We work on trigger support which will enable you to configure your Builds to start right when you push changes to your Git repository.

You want to hear from us? Join us a [cdCon in June in Austin where we speak about our project](https://sched.co/10UYU).
