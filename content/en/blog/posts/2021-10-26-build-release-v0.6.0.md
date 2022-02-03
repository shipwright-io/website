---
title: "Shipwright v0.6.0 Is Here"
date: 2021-10-26T10:30:00-04:00
draft: false
author: "Sascha Schwarze ([@SaschaSchwarze0](https://github.com/SaschaSchwarze0))"
---

It was a long journey, longer than it should have been, but we have finally reached our goal! Shipwright Build v0.6.0, our first release after joining the [Continuous Delivery Foundation](https://cd.foundation/).

The feature list is impressive. It was hard to pick a "Top 3", but here are my choices:

## Parameterization of Builds

Our API objects; the build strategy that defines the steps to turn source code into a container image, the build where a user configures their container image build, and the build run as an instance of a build; were missing a major capability: parameterization. We defined the available inputs that a user specified in a build. Those were only the minimum: the location of the source code, the name of the strategy and the destination image. Any other customization of the build was not possible, limiting the possible scenarios.

Two major enhancements bring us a huge step forward:

### Parameters

Build strategy authors can now define parameters that they can use then in their steps. Build users provide the values for those parameters. Our sample build strategies start to make use of this feature: the [BuildKit sample](https://github.com/shipwright-io/build/blob/v0.6.0/samples/buildstrategy/buildkit/buildstrategy_buildkit_cr.yaml#L14-L16) now contains a parameter to enable the usage of insecure container registry, and the [ko sample](https://github.com/shipwright-io/build/blob/v0.6.0/samples/buildstrategy/ko/buildstrategy_ko_cr.yaml#L8-L22) comes with a rich set of parameters to select Go version and flags, ko version and the main package directory. The [ko sample build](https://github.com/shipwright-io/build/blob/v0.6.0/samples/build/build_ko_cr.yaml#L10-L15) outlines how those parameters can be used to build the Shipwright Build controller image. Read more about parameters in the documentation for [build strategy authors](https://github.com/shipwright-io/build/blob/v0.6.0/docs/buildstrategies.md#strategy-parameters) and [build users](https://github.com/shipwright-io/build/blob/v0.6.0/docs/build.md#defining-paramvalues).

### Environment Variables

It is not always possible to define all of the parameters upfront in a build strategy. For those tools that control behavior through environment variables, users can now define environment variables in their builds and build runs. Environment variable values can be referenced from Kubernetes secrets to support scenarios where for example tokens for private dependency management systems are needed. Examples of builds and build runs with environment variables can be found in our [build](https://github.com/shipwright-io/build/blob/v0.6.0/docs/build.md) and [build run](https://github.com/shipwright-io/build/blob/v0.6.0/docs/buildrun.md) documentation.

## CLI

Being based on Kubernetes, all our objects are Kubernetes custom resources with their ecosystem-specific syntax and concepts. But, our users should not be required to be experts in using Kubernetes. We are therefore proud to release the first version of our CLI. Build users can use it to easily manage their builds and build runs. Some highlights:

Assuming you are connected to your Kubernetes cluster and have the credentials for your container registry in place, then creating a build for our go-sample is a single command:

```sh
$ shp build create sample-go --source-url https://github.com/shipwright-io/sample-go --source-context-dir source-build --output-image <CONTAINER_REGISTRY_LOCATION>/sample-go --output-credentials-secret <CONTAINER_REGISTRY_SECRET>
Created build "sample-go"
```

And then it is just another single command to trigger a build run and and to follow its logs. Nice. 😊

```sh
$ shp build run sample-go --follow
Pod 'sample-go-9hbpj-l9t5j-pod-fz2sp' is in state "Pending"...
Pod 'sample-go-9hbpj-l9t5j-pod-fz2sp' is in state "Pending"...
[source-default] 2021/10/08 11:43:33 Info: ssh (/usr/bin/ssh): OpenSSH_8.0p1, OpenSSL 1.1.1g FIPS  21 Apr 2020
[source-default] 2021/10/08 11:43:33 Info: git (/usr/bin/git): git version 2.27.0
[source-default] 2021/10/08 11:43:33 Info: git-lfs (/usr/bin/git-lfs): git-lfs/2.11.0 (GitHub; linux arm64; go 1.14.4)
[source-default] 2021/10/08 11:43:33 /usr/bin/git clone -h
[source-default] 2021/10/08 11:43:33 /usr/bin/git clone --quiet --no-tags --single-branch --depth 1 -- https://github.com/shipwright-io/sample-go /workspace/source
...
```

So far so good. Please keep in mind that this is our first CLI release. We know that some of the new backend features are not yet available through it, and the command layout will likely go through the subsequent iterations until we are all happy with the usability and consistency.

## Post-processing the image

So far, the images that were produced in the strategy's tools were untouched. Now we started going beyond this:

A community-provided extension for the Kaniko build strategy sample provides image scanning using the [Trivi tool](https://github.com/aquasecurity/trivy). This is an example of how a build strategy author can provide advanced capabilities. Read about [scanning with Trivy](https://github.com/shipwright-io/build/blob/v0.6.0/docs/buildstrategies.md#scanning-with-trivy) and check out how the [build strategy has been built](https://github.com/shipwright-io/build/blob/v0.6.0/samples/buildstrategy/kaniko/buildstrategy_kaniko-trivy_cr.yaml).

Another feature enables first-class support for labels and annotations provided by build users. Those are added to the image after the build strategy steps are done. Read more in [Defining the output of a build](https://github.com/shipwright-io/build/blob/v0.6.0/docs/build.md#defining-the-output).

--

A lot of nice stuff, but is that all ? No. 😊 Some other small but still nice features:

* You can now cancel a running build run which is very helpful if you just triggered it and then look back at your source code and know that you'll have to push another change making the running build useless. Learn what you need to do to cancel a build run in our [documentation](https://github.com/shipwright-io/build/blob/v0.6.0/docs/buildrun.md#canceling-a-buildrun).
* The build run status has been improved: failed build runs have an improved status. Successful build runs now contain metadata about the source (sha and author of the latest commit) and the image that was built (digest and size, depending on the build strategy author to provide them). You can find examples in our [documentation](https://github.com/shipwright-io/build/blob/v0.6.0/docs/buildrun.md#step-results-in-buildrun-status).
* We improved our build process so that we finally have release-specific sample build strategies.

For a full list of updates you can check out the release [change log](https://github.com/shipwright-io/build/releases/tag/v0.6.0).

Now, how to get started? Assuming your Kubernetes cluster is ready, it’s all done with just these three commands, which install Tekton, Shipwright, and the sample build strategies.

```sh
kubectl apply -f https://storage.googleapis.com/tekton-releases/pipeline/previous/v0.25.0/release.yaml
kubectl apply -f https://github.com/shipwright-io/build/releases/download/v0.6.0/release.yaml
kubectl apply -f https://github.com/shipwright-io/build/releases/download/v0.6.0/sample-strategies.yaml
```

Further steps to get your first build running are available in our [Try It!](https://github.com/shipwright-io/build#try-it) section.

For our CLI, our first release is only published to GitHub. We aim to support package managers with future releases. Until then, here are the commands to install the CLI:

### Windows

```sh
$ curl --silent --fail --location https://github.com/shipwright-io/cli/releases/download/v0.6.0/cli_0.6.0_windows_x86_64.tar.gz | tar xzf - shp.exe
$ shp help
```

### Mac

```sh
$ curl --silent --fail --location https://github.com/shipwright-io/cli/releases/download/v0.6.0/cli_0.6.0_macOS_x86_64.tar.gz | tar -xzf - -C /usr/local/bin shp
$ shp help
```

### Linux

```sh
$ curl --silent --fail --location "https://github.com/shipwright-io/cli/releases/download/v0.6.0/cli_0.6.0_linux_$(uname -m | sed 's/aarch64/arm64/').tar.gz" | sudo tar -xzf - -C /usr/bin shp
$ shp help
```

To get in touch with us, [join the Kubernetes slack](http://slack.kubernetes.io/), and meet us in the [#shipwright channel](https://kubernetes.slack.com/archives/C019ZRGUEJC).
