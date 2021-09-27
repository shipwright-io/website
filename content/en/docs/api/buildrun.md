---
title: "BuildRun"
draft: false
weight: 40
---

- [Overview](#overview)
- [BuildRun Controller](#buildrun-controller)
- [Configuring a BuildRun](#configuring-a-buildrun)
  - [Defining the BuildRef](#defining-the-buildref)
  - [Defining the ServiceAccount](#defining-the-serviceaccount)
- [BuildRun Status](#buildrun-status)
  - [Understanding the state of a BuildRun](#understanding-the-state-of-a-BuildRun)
  - [Understanding failed BuildRuns](#understanding-failed-buildruns)
- [Relationship with Tekton Tasks](#relationship-with-tekton-tasks)

## Overview

The resource `BuildRun` (`buildruns.dev/v1alpha1`) is the build process of a `Build` resource definition which is executed in Kubernetes.

A `BuildRun` resource allows the user to define:

- The `BuildRun` name, through which the user can monitor the status of the image construction.
- A referenced `Build` instance to use during the build construction.
- A service account for hosting all related secrets in order to build the image.

A `BuildRun` is available within a namespace.

## BuildRun Controller

The controller watches for:

- Updates on a `Build` resource (_CRD instance_)
- Updates on a `TaskRun` resource (_CRD instance_)

When the controller reconciles it:

- Looks for any existing owned `TaskRuns` and update its parent `BuildRun` status.
- Retrieves the specified `SA` and sets this with the specify output secret on the `Build` resource.
- Generates a new tekton `TaskRun` if it does not exist, and set a reference to this resource(_as a child of the controller_).
- On any subsequent updates on the `TaskRun`, the parent `BuildRun` resource instance will be updated.

## Configuring a BuildRun

The `BuildRun` definition supports the following fields:

- Required:
  - [`apiVersion`](https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/#required-fields) - Specifies the API version, for example `shipwright.io/v1alpha1`.
  - [`kind`](https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/#required-fields) - Specifies the Kind type, for example `BuildRun`.
  - [`metadata`](https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/#required-fields) - Metadata that identify the CRD instance, for example the name of the `BuildRun`.
  - `spec.buildRef` - Specifies an existing `Build` resource instance to use.

- Optional:
  - `spec.serviceAccount` - Refers to the SA to use when building the image. (_defaults to the `default` SA_)
  - `spec.timeout` - Defines a custom timeout. The value needs to be parsable by [ParseDuration](https://golang.org/pkg/time/#ParseDuration), for example `5m`. The value overwrites the value that is defined in the `Build`.
  - `spec.output.image` - Refers to a custom location where the generated image would be pushed. The value will overwrite the `output.image` value which is defined in `Build`. ( Note: other properties of the output, for example, the credentials cannot be specified in the buildRun spec. )
  - `spec.output.credentials.name` - Reference an existing secret to get access to the container registry. This secret will be added to the service account along with the ones requested by the `Build`.
  - `spec.env` - Specifies additional environment variables that should be passed to the build container. Overrides any environment variables that are specified in the `Build` resource.

### Defining the BuildRef

A `BuildRun` resource can reference a `Build` resource, that indicates what image to build. For example:

```yaml
apiVersion: shipwright.io/v1alpha1
kind: BuildRun
metadata:
  name: buildpack-nodejs-buildrun-namespaced
spec:
  buildRef:
    name: buildpack-nodejs-build-namespaced
```

### Defining the ServiceAccount

A `BuildRun` resource can define a serviceaccount to use. Usually this SA will host all related secrets referenced on the `Build` resource, for example:

```yaml
apiVersion: shipwright.io/v1alpha1
kind: BuildRun
metadata:
  name: buildpack-nodejs-buildrun-namespaced
spec:
  buildRef:
    name: buildpack-nodejs-build-namespaced
  serviceAccount:
    name: pipeline
```

### Specifying Environment Variables

A `BuildRun` resource can reference a `Build` resource, that indicates what image to build. For example:

```yaml
apiVersion: shipwright.io/v1alpha1
kind: BuildRun
metadata:
  name: buildpack-nodejs-buildrun-namespaced
spec:
  buildRef:
    name: buildpack-nodejs-build-namespaced
  env:
    - name: EXAMPLE_VAR_1
      value: "example-value-1"
    - name: EXAMPLE_VAR_2
      value: "example-value-2"
```

You can also use set the `spec.serviceAccount.generate` path to `true`. This will generate the service account during runtime for you.

_**Note**_: When the SA is not defined, the `BuildRun` will default to the `default` SA in the namespace.

## BuildRun Status

The `BuildRun` resource is updated as soon as the current image building status changes:

```sh
$ kubectl get buildrun buildpacks-v3-buildrun
NAME                    SUCCEEDED   REASON    MESSAGE   STARTTIME   COMPLETIONTIME
buildpacks-v3-buildrun  Unknown     Pending   Pending   1s
```

And finally:

```sh
$ kubectl get buildrun buildpacks-v3-buildrun
NAME                    SUCCEEDED   REASON      MESSAGE                              STARTTIME   COMPLETIONTIME
buildpacks-v3-buildrun  True        Succeeded   All Steps have completed executing   4m28s       16s
```

The above allows users to get an overview of the building mechanism state.

### Understanding the state of a BuildRun

A `BuildRun` resource stores the relevant information regarding the state of the object under `Status.Conditions`.

[Conditions](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#typical-status-properties) allow users to easily understand the resource state, without needing to understand resource-specific details.

For the `BuildRun` we use a Condition of the type `Succeeded`, which is a well-known type for resources that run to completion.

The `Status.Conditions` hosts different fields, like `Status`, `Reason` and `Message`. Users can expect this fields to be populated with relevant information.

The following table illustrates the different states a BuildRun can have under its `Status.Conditions`:

| Status | Reason | CompletionTime is set | Description |
| --- | --- | --- | --- |
| Unknown | Pending                       | No  | The BuildRun is waiting on a Pod in status Pending. |
| Unknown | Running                       | No  | The BuildRun has been validate and started to perform its work. |
| True    | Succeeded                     | Yes | The BuildRun Pod is done. |
| False    | Failed                       | Yes | The BuildRun failed in one of the steps. |
| False    | BuildRunTimeout              | Yes | The BuildRun timed out. |
| False    | UnknownStrategyKind          | Yes | The Build specified strategy Kind is unknown. (_options: ClusterBuildStrategy or BuildStrategy_) |
| False    | ClusterBuildStrategyNotFound | Yes | The referenced cluster strategy was not found in the cluster. |
| False    | BuildStrategyNotFound        | Yes | The referenced namespaced strategy was not found in the cluster. |
| False    | SetOwnerReferenceFailed      | Yes | Setting ownerreferences from the BuildRun to the related TaskRun failed.  |
| False    | TaskRunIsMissing             | Yes | The BuildRun related TaskRun was not found. |
| False    | TaskRunGenerationFailed      | Yes | The generation of a TaskRun spec failed. |
| False    | ServiceAccountNotFound       | Yes | The referenced service account was not found in the cluster. |
| False    | BuildRegistrationFailed      | Yes | The related Build in the BuildRun is on a Failed state. |
| False    | BuildNotFound                | Yes | The related Build in the BuildRun was not found. |

_Note_: We heavily rely on the Tekton TaskRun [Conditions](https://github.com/tektoncd/pipeline/blob/main/docs/taskruns.md#monitoring-execution-status) for populating the BuildRun ones, with some exceptions.

### Understanding failed BuildRuns

To make it easier for users to understand why did a BuildRun failed, users can infer from the `Status.FailedAt` field, the pod and container where the failure took place.

In addition, the `Status.Conditions` will host under the `Message` field a compacted message containing the `kubectl` command to trigger, in order to retrieve the logs.

### Build Snapshot

For every BuildRun controller reconciliation, the `buildSpec` in the Status of the `BuildRun` is updated if an existing owned `TaskRun` is present. During this update, a `Build` resource snapshot is generated and embedded into the `status.buildSpec` path of the `BuildRun`. A `buildSpec` is just a copy of the original `Build` spec, from where the `BuildRun` executed a particular image build. The snapshot approach allows developers to see the original `Build` configuration.

## Relationship with Tekton Tasks

The `BuildRun` resource abstracts the image construction by delegating this work to the Tekton Pipeline [TaskRun](https://github.com/tektoncd/pipeline/blob/main/docs/taskruns.md). Compared to a Tekton Pipeline [Task](https://github.com/tektoncd/pipeline/blob/main/docs/tasks.md), a `TaskRun` runs all `steps` until completion of the `Task` or until a failure occurs in the `Task`.

The `BuildRun` controller during the Reconcile will generate a new `TaskRun`. During the execution, the controller will embed in the `TaskRun` `Task` definition the requires `steps` to execute. These `steps` are define in the strategy defined in the `Build` resource, either a `ClusterBuildStrategy` or a `BuildStrategy`.
