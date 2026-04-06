---
title: RuntimeClass
sidebar_position: 5
description: How to use Kubernetes RuntimeClass to select an alternative container runtime for build pods.
---
{/*
Copyright The Shipwright Contributors

SPDX-License-Identifier: Apache-2.0
*/}
## Overview

[RuntimeClass](https://kubernetes.io/docs/concepts/containers/runtime-class/) is a Kubernetes feature that allows selecting the container runtime configuration used to run a pod's containers. By specifying a `runtimeClassName` in a `Build` or `BuildRun`, the build pod runs with an alternative container runtime instead of the cluster's default.

This is particularly relevant when build workloads require different isolation, performance, or security characteristics than the default runtime provides.

## Prerequisites

Before using `runtimeClassName` in builds, the following conditions must be met:

1. A `RuntimeClass` resource must exist in the cluster. For example:

    ```yaml
    apiVersion: node.k8s.io/v1
    kind: RuntimeClass
    metadata:
      name: kata-containers
    handler: kata
    ```

2. The nodes in the cluster must support the target runtime (e.g., [Kata Containers](https://katacontainers.io/) must be installed and configured).

3. If the `RuntimeClass` defines `scheduling` rules (`nodeSelector` or `tolerations`), nodes matching those constraints must be available.

## Use Cases

- **Hardware virtualization isolation** — [Kata Containers](https://katacontainers.io/) can be used to run each build pod inside a lightweight virtual machine, providing stronger isolation between build workloads.
- **Untrusted build sources** — When building images from source code that is not fully controlled, an alternative runtime can add an extra layer of security.
- **Compliance requirements** — Some environments require workloads to run in a specific runtime for regulatory or policy reasons.

## Configuring RuntimeClass

The `runtimeClassName` field can be set on a `Build`, a `BuildRun`, or both.

### Build with RuntimeClass

Setting `runtimeClassName` on a `Build` applies it to all `BuildRun`s that reference the `Build`, unless the `BuildRun` provides its own override.

```yaml
apiVersion: shipwright.io/v1beta1
kind: Build
metadata:
  name: my-build
spec:
  source:
    type: Git
    git:
      url: https://github.com/shipwright-io/sample-go
  strategy:
    name: buildkit
    kind: ClusterBuildStrategy
  output:
    image: registry.example.com/my-image:latest
  runtimeClassName: kata-containers
```

### BuildRun with RuntimeClass

A `BuildRun` resource can specify `runtimeClassName` directly.

```yaml
apiVersion: shipwright.io/v1beta1
kind: BuildRun
metadata:
  name: my-buildrun
spec:
  build:
    name: my-build
  runtimeClassName: kata-containers
```

### BuildRun overriding Build RuntimeClass

When `runtimeClassName` is specified in both a `Build` and a `BuildRun`, the `BuildRun` value takes precedence. This allows a default runtime to be defined on the `Build` while overriding it for specific runs.

```yaml
apiVersion: shipwright.io/v1beta1
kind: Build
metadata:
  name: my-build
spec:
  source:
    type: Git
    git:
      url: https://github.com/shipwright-io/sample-go
  strategy:
    name: buildkit
    kind: ClusterBuildStrategy
  output:
    image: registry.example.com/my-image:latest
  runtimeClassName: kata-containers
```

```yaml
apiVersion: shipwright.io/v1beta1
kind: BuildRun
metadata:
  name: my-buildrun
spec:
  build:
    name: my-build
  runtimeClassName: different-runtime
```

In this example, the build pod uses `different-runtime` instead of `kata-containers`.

## CLI Usage

The Shipwright CLI (`shp`) supports specifying the runtime class with the `--runtime-class` flag:

```bash
shp build run my-build --runtime-class=kata-containers
```

This is equivalent to setting `runtimeClassName` on a `BuildRun`.

## Precedence Behavior

The `runtimeClassName` follows the same precedence rules as other overridable fields like `nodeSelector`, `tolerations`, and `schedulerName`:

- If only the `Build` specifies `runtimeClassName`, that value is used.
- If only the `BuildRun` specifies `runtimeClassName`, that value is used.
- If both specify `runtimeClassName`, the `BuildRun` value takes precedence.

## Troubleshooting

### Pod scheduling failures

A `RuntimeClass` can define default [`scheduling.nodeSelector` and `scheduling.tolerations`](https://kubernetes.io/docs/concepts/containers/runtime-class/#scheduling). These are merged with any `nodeSelector` and `tolerations` set on the `Build` or `BuildRun` at pod admission time. This can cause failures in two ways:

1. **No matching nodes** — If the combined constraints don't match any available node, the build pod will remain in a `Pending` state with `FailedScheduling` events.

2. **Conflicting values** — If the RuntimeClass's `scheduling.nodeSelector` sets a label key that is also set on the `Build` or `BuildRun` with a different value, the pod will be rejected at admission. For example, if the RuntimeClass sets `kubernetes.io/arch: arm64` but the `Build` sets `nodeSelector: {"kubernetes.io/arch": "amd64"}`, the pod will fail to be created.

To diagnose, check the pod events:

```bash
kubectl describe pod <build-pod-name>
```

Look for `FailedScheduling` or admission rejection events. The RuntimeClass scheduling configuration can also be inspected:

```bash
kubectl get runtimeclass <name> -o yaml
```

### RuntimeClassNameNotValid validation error

If the specified `runtimeClassName` is not a valid name (e.g., it contains uppercase letters or special characters), the `Build` will fail registration with a `RuntimeClassNameNotValid` reason. The name must be a valid [RFC 1123 subdomain](https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#dns-subdomain-names).

Check the `Build` status for details:

```bash
kubectl get build <build-name> -o jsonpath='{.status}'
```

### Non-existent RuntimeClass

If the `runtimeClassName` is a valid name format but does not correspond to an existing `RuntimeClass` resource, the `Build` will register successfully. However, the build pod will fail at scheduling time. Verify the RuntimeClass exists:

```bash
kubectl get runtimeclass
```
