---
title: "Introducing Shipwright - Part 2"
linkTitle: "Intro to Shipwright (Part 2)"
description: "A framework for building container images on Kubernetes"
author: "Adam Kaplan ([@adambkaplan](https://github.com/adambkaplan))"
date: 2020-11-30T20:53:58
draft: false
---

What is Shipwright? Which problems does this project try to solve?

In [Part 1](/blog/2020/10/21/introducing-shipwright-part-1/) of this series, we looked back at the history of delivering software applications,
and how that has changed in the age of Kubernetes and cloud-native development.

In this post, we'll introduce Shipwright and the Build APIs that make it simple to
build container images on Kubernetes.

## Recap - From Binaries to Images

Recall in [Part 1](/blog/2020/10/21/introducing-shipwright-part-1/), developers who moved from 
VM-based deployments to [Kubernetes](https://kubernetes.io/) needed to shift their unit of delivery
from binaries to container images. Teams adopted various tools to accomplish this task, ranging
from [Docker/Moby](https://mobyproject.org/) to [Cloud-Native Buildpacks](https://buildpacks.io/).
New cloud-native applications like [Jenkins-X](https://jenkins-x.io/) and
[Tekton](https://tekton.dev/) have emerged to deliver these container images on Kubernetes.
[Jenkins](https://www.jenkins.io/) - the predecessor to Jenkins-X - has continued to play a 
prominent role in automating the building and testing of applications.

Building a container image on Kubernetes is not a simple feat. There are a wide variety of tools
available, some which require knowledge on how to write a Dockerfile, others which do not or are
tailored for specific programming languages. For CI/CD platforms like Tekton, setting up a build 
pipeline requires extensive configuration and customization. These are burdens that are difficult
to overcome for many development teams.

## Shipwright Builds - A Framework for Building Images

With Shipwright, we want to create an open and flexible framework that allows teams to easily build
container images on Kubernetes. Much of the work has been inspired by OpenShift/okd, which provides 
its own API for building images. At the heart of every build are the following core components:

1. Source code - the "what" you are trying to build
2. Output image - "where" you are trying to deliver your application
3. Build strategy - "how" your application is assembled
4. Invocation - "when" you want to build your application

Developers who use docker are familiar with this process:

1. Clone source from a git-based repository ("what")
2. Build the container image ("when" and "how")

  ```bash
  $ docker build -t registry.mycompany.com/myorg/myapp:latest .
  ```

3. Push the container image to your registry ("where")

  ```bash
  $ docker push registry.mycompany.com/myorg/myapp:latest
  ```

## The Build APIs

The Build API consists of four core Custom Resource Definitions (CRDs):

1. `BuildStrategy` and `ClusterBuildStrategy` - defines how to build an application for an image 
   building tool.
2. `Build` - defines what to build, and where the application should be delivered.
3. `BuildRun` - invokes the build, telling the Kubernetes cluster when to build your application.

### BuildStrategy and ClusterBuildStrategy

`BuildStrategy` and `ClusterBuildStrategy` are related APIs to define how a given tool should be 
used to assemble an application. They are distinguished by their scope - `BuildStrategy` objects
are namespace scoped, whereas `ClusterBuildStrategy` objects are cluster scoped.

The spec consists of a `buildSteps` object, which look and feel like Kubernetes `Container` 
specifications. Below is an example spec for Kaniko, which can build an image from a
Dockerfile within a container:

```yaml
spec:
  buildSteps:
    - name: build-and-push
      image: gcr.io/kaniko-project/executor:v1.3.0
      workingDir: /workspace/source
      securityContext:
        runAsUser: 0
        capabilities:
          add:
            - CHOWN
            - DAC_OVERRIDE
            - FOWNER
            - SETGID
            - SETUID
            - SETFCAP
      env:
        - name: DOCKER_CONFIG
          value: /tekton/home/.docker
      command:
        - /kaniko/executor
      args:
        - --skip-tls-verify=true
        - --dockerfile=$(build.dockerfile)
        - --context=/workspace/source/$(build.source.contextDir)
        - --destination=$(build.output.image)
        - --oci-layout-path=/workspace/output/image
        - --snapshotMode=redo
      resources:
        limits:
          cpu: 500m
          memory: 1Gi
        requests:
          cpu: 250m
          memory: 65Mi
```

### Build

The `Build` object provides a playbook on how to assemble your specific application. The simplest
build consists of a git source, a build strategy, and an output image:

```yaml
apiVersion: build.dev/v1alpha1
kind: Build
metadata:
  name: kaniko-golang-build
  annotations:
    build.build.dev/build-run-deletion: "true"
spec:
  source:
    url: https://github.com/sbose78/taxi
  strategy:
    name: kaniko
    kind: ClusterBuildStrategy
  output:
    image: registry.mycompany.com/my-org/taxi-app:latest
```

Builds can be extended to push to private registries, use a different Dockerfile, and more. Read the
[docs](https://github.com/shipwright-io/build/blob/main/docs/build.md) for a deeper dive on what
is possible.

### BuildRun

Each `BuildRun` object invokes a build on your cluster. You can think of these as a Kubernetes 
`Jobs` or Tekton `TaskRuns` - they represent a workload on your cluster, ultimately resulting in a
running `Pod`.

A `BuildRun` invocation can be very simple and concise:

```yaml
apiVersion: build.dev/v1alpha1
kind: BuildRun
metadata:
  name: kaniko-golang-buildrun
spec:
  buildRef:
    name: kaniko-golang-build
```

As the build runs, the status of the `BuildRun` object is updated with the current progress. Work
is in progress to standardize this status reporting with status conditions.

## Powered by Tekton

You may have noticed that the Kaniko build strategy above references two directories in the build
step:

1. `/tekton/home`
2. `/workspace`

Where do these directories come from? Shipwright is built on top of [Tekton](https://tekton.dev/), 
taking advantage of its features to simpify CI/CD workloads. Among the things that Tekton provides 
is a Linux user `$HOME` directory (`/tekton/home`) and a workspace where the application can be 
assembled (`/workspace`).

## Try it!

Shipwright can be installed in one of two ways:

1. Manually via the Shipwright [install scripts](https://github.com/shipwright-io/build#try-it).
2. As an operator via [OperatorHub](https://operatorhub.io/operator/shipwright-operator).

If your cluster has [Operator Lifecycle Manager](https://olm.operatorframework.io/) installed,
option 2 is the recommened approach. OLM will take care of installing Tekton as well as Shipwright.

The samples contain build strategies for container-based image build tools like
[Kaniko](https://github.com/GoogleContainerTools/kaniko), [Buildah](https://buildah.io/), 
[Source-to-Image](https://github.com/openshift/source-to-image) and 
[Cloud-Native Buildpacks](https://buildpacks.io/).
