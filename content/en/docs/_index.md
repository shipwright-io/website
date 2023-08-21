---
title: "Welcome to Shipwright"
linkTitle: "Documentation"
draft: false
weight: 20
no_list: true
menu:
  main:
    weight: 20
---



Shipwright is an extensible framework for building container images on Kubernetes.

Shipwright supports popular tools such as Kaniko, Cloud Native Buildpacks, Buildah, and more!

Shipwright is based around four elements for each build:

1. Source code - the "what" you are trying to build
1. Output image - "where" you are trying to deliver your application
1. Build strategy - "how" your application is assembled
1. Invocation - "when" you want to build your application

## Comparison with local image builds

Developers who use Docker are familiar with this process:

1. Clone source from a git-based repository ("what")
2. Build the container image ("when" and "how")

  ```bash
  docker build -t registry.mycompany.com/myorg/myapp:latest .
  ```

3. Push the container image to your registry ("where")

  ```bash
  docker push registry.mycompany.com/myorg/myapp:latest
  ```

## Shipwright Build APIs

Shipwright's Build API consists of four core
[CustomResourceDefinitions](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#customresourcedefinitions)
(CRDs):

1. [`Build`](/docs/build/) - defines what to build, and where the application should be delivered.
1. [`BuildStrategy` and `ClusterBuildStrategy`](/docs/build/buildstrategies/) - defines how to build an application for an image
   building tool.
1. [`BuildRun`](/docs/build/buildrun/) - invokes the build.
   You create a `BuildRun` to tell Shipwright to start building your application.

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

Builds can be extended to push to private registries, use a different Dockerfile, and more.

### BuildStrategy and ClusterBuildStrategy

`BuildStrategy` and `ClusterBuildStrategy` are related APIs to define how a given tool should be
used to assemble an application. They are distinguished by their scope - `BuildStrategy` objects
are namespace scoped, whereas `ClusterBuildStrategy` objects are cluster scoped.

The spec of a `BuildStrategy` or `ClusterBuildStrategy` consists of a `buildSteps` object, which look and feel like Kubernetes container
specifications. Below is an example spec for Kaniko, which can build an image from a
Dockerfile within a container:

```yaml
# this is a fragment of a manifest
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

### BuildRun

Each `BuildRun` object invokes a build on your cluster. You can think of these as a Kubernetes
`Jobs` or Tekton `TaskRuns` - they represent a workload on your cluster, ultimately resulting in a
running `Pod`. See [`BuildRun`](/docs/build/buildrun/) for more details.

## Further reading

- [Configuration](/docs/configuration/)
- Build controller observability
  - [Metrics](/docs/metrics/)
  - [Profiling](/docs/profiling/)
