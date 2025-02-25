---
title: Build Resources
weight: 10
---

# Packages
- [shipwright.io/v1beta1](#shipwrightiov1beta1)


# shipwright.io/v1beta1

Package v1beta1 contains API Schema definitions for the build v1beta1 API group

## Resource Types
- [Build](#build)
- [BuildList](#buildlist)
- [BuildRun](#buildrun)
- [BuildRunList](#buildrunlist)
- [BuildStrategy](#buildstrategy)
- [BuildStrategyList](#buildstrategylist)
- [ClusterBuildStrategy](#clusterbuildstrategy)
- [ClusterBuildStrategyList](#clusterbuildstrategylist)



### Build



Build is the Schema representing a Build definition



_Appears in:_
- [BuildList](#buildlist)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `apiVersion` _string_ | `shipwright.io/v1beta1` | | |
| `kind` _string_ | `Build` | | |
| `metadata` _[ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#objectmeta-v1-meta)_ | Refer to Kubernetes API documentation for fields of `metadata`. |  |  |
| `spec` _[BuildSpec](#buildspec)_ |  |  |  |
| `status` _[BuildStatus](#buildstatus)_ |  |  |  |


### BuildList



BuildList contains a list of Build





| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `apiVersion` _string_ | `shipwright.io/v1beta1` | | |
| `kind` _string_ | `BuildList` | | |
| `metadata` _[ListMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#listmeta-v1-meta)_ | Refer to Kubernetes API documentation for fields of `metadata`. |  |  |
| `items` _[Build](#build) array_ |  |  |  |


### BuildReason

_Underlying type:_ _string_

BuildReason is a type used for populating the
Build Status.Reason field



_Appears in:_
- [BuildStatus](#buildstatus)

| Field | Description |
| --- | --- |
| `Succeeded` | SucceedStatus indicates that all validations Succeeded<br /> |
| `UnknownBuildStrategyKind` | UnknownBuildStrategyKind indicates that neither namespace-scope or cluster-scope strategy kind was used<br /> |
| `BuildStrategyNotFound` | BuildStrategyNotFound indicates that a namespaced-scope strategy was not found in the namespace<br /> |
| `ClusterBuildStrategyNotFound` | ClusterBuildStrategyNotFound indicates that a cluster-scope strategy was not found<br /> |
| `SetOwnerReferenceFailed` | SetOwnerReferenceFailed indicates that setting ownerReferences between a Build and a BuildRun failed<br /> |
| `SpecSourceSecretRefNotFound` | SpecSourceSecretRefNotFound indicates the referenced secret in source is missing<br /> |
| `SpecOutputSecretRefNotFound` | SpecOutputSecretRefNotFound indicates the referenced secret in output is missing<br /> |
| `SpecBuilderSecretRefNotFound` | SpecBuilderSecretRefNotFound indicates the referenced secret in builder is missing<br /> |
| `MultipleSecretRefNotFound` | MultipleSecretRefNotFound indicates that multiple secrets are missing<br /> |
| `SpecEnvNameCanNotBeBlank` | SpecEnvNameCanNotBeBlank indicates that the name for an environment variable is blank<br /> |
| `SpecEnvOnlyOneOfValueOrValueFromMustBeSpecified` | SpecEnvOnlyOneOfValueOrValueFromMustBeSpecified indicates that both value and valueFrom were specified<br /> |
| `RuntimePathsCanNotBeEmpty` | RuntimePathsCanNotBeEmpty indicates that the spec.runtime feature is used but the paths were not specified<br /> |
| `RestrictedParametersInUse` | RestrictedParametersInUse indicates the definition of reserved shipwright parameters<br /> |
| `WrongParameterValueType` | WrongParameterValueType indicates that a single value was provided for an array parameter, or vice-versa<br /> |
| `UndefinedParameter` | UndefinedParameter indicates the definition of param that was not defined in the strategy parameters<br /> |
| `InconsistentParameterValues` | InconsistentParameterValues indicates that parameter values have more than one of configMapValue, secretValue, or value set<br /> |
| `EmptyArrayItemParameterValues` | EmptyArrayItemParameterValues indicates that array parameters contain an item where none of configMapValue, secretValue, or value is set<br /> |
| `IncompleteConfigMapValueParameterValues` | IncompleteConfigMapValueParameterValues indicates that a configMapValue is specified where the name or the key is empty<br /> |
| `IncompleteSecretValueParameterValues` | IncompleteSecretValueParameterValues indicates that a secretValue is specified where the name or the key is empty<br /> |
| `RemoteRepositoryUnreachable` | RemoteRepositoryUnreachable indicates the referenced repository is unreachable<br /> |
| `BuildNameInvalid` | BuildNameInvalid indicates the build name is invalid<br /> |
| `VolumeDoesNotExist` | VolumeDoesNotExist indicates that volume referenced by the Build does not exist, therefore Build cannot be run<br /> |
| `VolumeNotOverridable` | VolumeNotOverridable indicates that volume defined by build is not set as overridable in the strategy<br /> |
| `UndefinedVolume` | UndefinedVolume indicates that volume defined by build is not found in the strategy<br /> |
| `TriggerNameCanNotBeBlank` | TriggerNameCanNotBeBlank indicates the trigger condition does not have a name<br /> |
| `TriggerInvalidType` | TriggerInvalidType indicates the trigger type is invalid<br /> |
| `TriggerInvalidGitHubWebHook` | TriggerInvalidGitHubWebHook indicates the trigger type GitHub is invalid<br /> |
| `TriggerInvalidImage` | TriggerInvalidImage indicates the trigger type Image is invalid<br /> |
| `TriggerInvalidPipeline` | TriggerInvalidPipeline indicates the trigger type Pipeline is invalid<br /> |
| `OutputTimestampNotSupported` | OutputTimestampNotSupported indicates that an unsupported output timestamp setting was used<br /> |
| `OutputTimestampNotValid` | OutputTimestampNotValid indicates that the output timestamp value is not valid<br /> |
| `NodeSelectorNotValid` | NodeSelectorNotValid indicates that the nodeSelector value is not valid<br /> |
| `TolerationNotValid` | TolerationNotValid indicates that the Toleration value is not valid<br /> |
| `SchedulerNameNotValid` | SchedulerNameNotValid indicates that the Scheduler name is not valid<br /> |


### BuildRetention



BuildRetention struct for buildrun cleanup



_Appears in:_
- [BuildSpec](#buildspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `failedLimit` _integer_ | FailedLimit defines the maximum number of failed buildruns that should exist. |  | Maximum: 10000 <br />Minimum: 1 <br /> |
| `succeededLimit` _integer_ | SucceededLimit defines the maximum number of succeeded buildruns that should exist. |  | Maximum: 10000 <br />Minimum: 1 <br /> |
| `ttlAfterFailed` _[Duration](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#duration-v1-meta)_ | TTLAfterFailed defines the maximum duration of time the failed buildrun should exist. |  | Format: duration <br /> |
| `ttlAfterSucceeded` _[Duration](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#duration-v1-meta)_ | TTLAfterSucceeded defines the maximum duration of time the succeeded buildrun should exist. |  | Format: duration <br /> |
| `atBuildDeletion` _boolean_ | AtBuildDeletion defines if related BuildRuns should be deleted when deleting the Build. |  |  |


### BuildRun



BuildRun is the Schema representing an instance of build execution



_Appears in:_
- [BuildRunList](#buildrunlist)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `apiVersion` _string_ | `shipwright.io/v1beta1` | | |
| `kind` _string_ | `BuildRun` | | |
| `metadata` _[ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#objectmeta-v1-meta)_ | Refer to Kubernetes API documentation for fields of `metadata`. |  |  |
| `spec` _[BuildRunSpec](#buildrunspec)_ |  |  |  |
| `status` _[BuildRunStatus](#buildrunstatus)_ |  |  |  |


### BuildRunList



BuildRunList contains a list of BuildRun





| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `apiVersion` _string_ | `shipwright.io/v1beta1` | | |
| `kind` _string_ | `BuildRunList` | | |
| `metadata` _[ListMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#listmeta-v1-meta)_ | Refer to Kubernetes API documentation for fields of `metadata`. |  |  |
| `items` _[BuildRun](#buildrun) array_ |  |  |  |


### BuildRunRequestedState

_Underlying type:_ _string_

BuildRunRequestedState defines the buildrun state the user can provide to override whatever is the current state.



_Appears in:_
- [BuildRunSpec](#buildrunspec)



### BuildRunRetention



BuildRunRetention struct for buildrun cleanup



_Appears in:_
- [BuildRunSpec](#buildrunspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `ttlAfterFailed` _[Duration](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#duration-v1-meta)_ | TTLAfterFailed defines the maximum duration of time the failed buildrun should exist. |  | Format: duration <br /> |
| `ttlAfterSucceeded` _[Duration](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#duration-v1-meta)_ | TTLAfterSucceeded defines the maximum duration of time the succeeded buildrun should exist. |  | Format: duration <br /> |


### BuildRunSource



BuildRunSource describes the local source to use



_Appears in:_
- [BuildRunSpec](#buildrunspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `type` _[BuildSourceType](#buildsourcetype)_ | Type is the BuildRunSource qualifier, the type of the source.<br />Only Local is supported. |  |  |
| `local` _[Local](#local)_ | Local contains the details for the source of type Local |  |  |


### BuildRunSpec



BuildRunSpec defines the desired state of BuildRun



_Appears in:_
- [BuildRun](#buildrun)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `build` _[ReferencedBuild](#referencedbuild)_ | Build refers to an embedded build specification<br />This field is mandatory |  |  |
| `source` _[BuildRunSource](#buildrunsource)_ | Source refers to the location where the source code is,<br />this could only be a local source |  |  |
| `serviceAccount` _string_ | ServiceAccount refers to the kubernetes serviceaccount<br />which is used for resource control.<br />Default serviceaccount will be set if it is empty |  |  |
| `timeout` _[Duration](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#duration-v1-meta)_ | Timeout defines the maximum run time of this BuildRun. |  | Format: duration <br /> |
| `paramValues` _[ParamValue](#paramvalue) array_ | Params is a list of key/value that could be used<br />to set strategy parameters |  |  |
| `output` _[Image](#image)_ | Output refers to the location where the generated<br />image would be pushed to. It will overwrite the output image in build spec |  |  |
| `state` _[BuildRunRequestedState](#buildrunrequestedstate)_ | State is used for canceling a buildrun (and maybe more later on). |  |  |
| `env` _[EnvVar](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#envvar-v1-core) array_ | Env contains additional environment variables that should be passed to the build container |  |  |
| `retention` _[BuildRunRetention](#buildrunretention)_ | Contains information about retention params |  |  |
| `volumes` _[BuildVolume](#buildvolume) array_ | Volumes contains volume Overrides of the BuildStrategy volumes in case those are allowed<br />to be overridden. Must only contain volumes that exist in the corresponding BuildStrategy |  |  |
| `nodeSelector` _object (keys:string, values:string)_ | NodeSelector is a selector which must be true for the pod to fit on a node.<br />Selector which must match a node's labels for the pod to be scheduled on that node.<br />More info: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/ |  |  |
| `tolerations` _[Toleration](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#toleration-v1-core) array_ | If specified, the pod's tolerations. |  |  |
| `schedulerName` _string_ | SchedulerName specifies the scheduler to be used to dispatch the Pod |  |  |


### BuildRunStatus



BuildRunStatus defines the observed state of BuildRun



_Appears in:_
- [BuildRun](#buildrun)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `source` _[SourceResult](#sourceresult)_ | Source holds the results emitted from the source step |  |  |
| `output` _[Output](#output)_ | Output holds the results emitted from step definition of an output |  |  |
| `conditions` _[Conditions](#conditions)_ | Conditions holds the latest available observations of a resource's current state. |  |  |
| `taskRunName` _string_ | TaskRunName is the name of the TaskRun responsible for executing this BuildRun. |  |  |
| `startTime` _[Time](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#time-v1-meta)_ | StartTime is the time the build is actually started. |  |  |
| `completionTime` _[Time](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#time-v1-meta)_ | CompletionTime is the time the build completed. |  |  |
| `buildSpec` _[BuildSpec](#buildspec)_ | BuildSpec is the Build Spec of this BuildRun. |  |  |
| `failureDetails` _[FailureDetails](#failuredetails)_ | FailureDetails contains error details that are collected and surfaced from TaskRun |  |  |


### BuildSourceType

_Underlying type:_ _string_

BuildSourceType enumerates build source type names.



_Appears in:_
- [BuildRunSource](#buildrunsource)
- [Source](#source)

| Field | Description |
| --- | --- |
| `Local` |  |
| `Git` |  |
| `OCI` |  |


### BuildSpec



BuildSpec defines the desired state of Build



_Appears in:_
- [Build](#build)
- [BuildRunStatus](#buildrunstatus)
- [ReferencedBuild](#referencedbuild)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `source` _[Source](#source)_ | Source refers to the location where the source code is,<br />this could be a git repository, a local source or an oci<br />artifact |  |  |
| `trigger` _[Trigger](#trigger)_ | Trigger defines the scenarios where a new build should be triggered. |  |  |
| `strategy` _[Strategy](#strategy)_ | Strategy references the BuildStrategy to use to build the container<br />image. |  |  |
| `paramValues` _[ParamValue](#paramvalue) array_ | Params is a list of key/value that could be used<br />to set strategy parameters |  |  |
| `output` _[Image](#image)_ | Output refers to the location where the built image would be pushed. |  |  |
| `timeout` _[Duration](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#duration-v1-meta)_ | Timeout defines the maximum amount of time the Build should take to execute. |  | Format: duration <br /> |
| `env` _[EnvVar](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#envvar-v1-core) array_ | Env contains additional environment variables that should be passed to the build container |  |  |
| `retention` _[BuildRetention](#buildretention)_ | Contains information about retention params |  |  |
| `volumes` _[BuildVolume](#buildvolume) array_ | Volumes contains volume Overrides of the BuildStrategy volumes in case those are allowed<br />to be overridden. Must only contain volumes that exist in the corresponding BuildStrategy |  |  |
| `nodeSelector` _object (keys:string, values:string)_ | NodeSelector is a selector which must be true for the pod to fit on a node.<br />Selector which must match a node's labels for the pod to be scheduled on that node.<br />More info: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/ |  |  |
| `tolerations` _[Toleration](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#toleration-v1-core) array_ | If specified, the pod's tolerations. |  |  |
| `schedulerName` _string_ | SchedulerName specifies the scheduler to be used to dispatch the Pod |  |  |


### BuildStatus



BuildStatus defines the observed state of Build


NOTICE: This is deprecated and will be removed in a future release.



_Appears in:_
- [Build](#build)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `registered` _[ConditionStatus](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#conditionstatus-v1-core)_ | The Register status of the Build |  |  |
| `reason` _[BuildReason](#buildreason)_ | The reason of the registered Build, it's an one-word camelcase |  |  |
| `message` _string_ | The message of the registered Build, either an error or succeed message |  |  |


### BuildStrategy



BuildStrategy is the Schema representing a strategy in the namespace scope to build images from source code.



_Appears in:_
- [BuildStrategyList](#buildstrategylist)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `apiVersion` _string_ | `shipwright.io/v1beta1` | | |
| `kind` _string_ | `BuildStrategy` | | |
| `metadata` _[ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#objectmeta-v1-meta)_ | Refer to Kubernetes API documentation for fields of `metadata`. |  |  |
| `spec` _[BuildStrategySpec](#buildstrategyspec)_ |  |  |  |
| `status` _[BuildStrategyStatus](#buildstrategystatus)_ |  |  |  |


### BuildStrategyKind

_Underlying type:_ _string_

BuildStrategyKind defines the type of BuildStrategy used by the build.



_Appears in:_
- [Strategy](#strategy)

| Field | Description |
| --- | --- |
| `BuildStrategy` | NamespacedBuildStrategyKind indicates that the buildstrategy type has a namespaced scope.<br /> |
| `ClusterBuildStrategy` | ClusterBuildStrategyKind indicates that buildstrategy type has a cluster scope.<br /> |


### BuildStrategyList



BuildStrategyList contains a list of BuildStrategy





| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `apiVersion` _string_ | `shipwright.io/v1beta1` | | |
| `kind` _string_ | `BuildStrategyList` | | |
| `metadata` _[ListMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#listmeta-v1-meta)_ | Refer to Kubernetes API documentation for fields of `metadata`. |  |  |
| `items` _[BuildStrategy](#buildstrategy) array_ |  |  |  |


### BuildStrategySecurityContext



BuildStrategySecurityContext defines a UID and GID for the build that is to be used for the build strategy steps as
well as for shipwright-managed steps such as the source retrieval, or the image processing.
The value can be overwritten on the steps for the strategy steps.
If omitted, then UID and GID from the Shipwright configuration will be used for the shipwright-managed steps.



_Appears in:_
- [BuildStrategySpec](#buildstrategyspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `runAsUser` _integer_ | The UID to run the entrypoint of the container process.<br />Defaults to user specified in image metadata if unspecified.<br />Can be overwritten by the security context on the step level. |  |  |
| `runAsGroup` _integer_ | The GID to run the entrypoint of the container process.<br />Defaults to group specified in image metadata if unspecified.<br />Can be overwritten by the security context on the step level. |  |  |


### BuildStrategySpec



BuildStrategySpec defines the desired state of BuildStrategy



_Appears in:_
- [BuildStrategy](#buildstrategy)
- [ClusterBuildStrategy](#clusterbuildstrategy)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `steps` _[Step](#step) array_ |  |  |  |
| `parameters` _[Parameter](#parameter) array_ |  |  |  |
| `securityContext` _[BuildStrategySecurityContext](#buildstrategysecuritycontext)_ |  |  |  |
| `volumes` _[BuildStrategyVolume](#buildstrategyvolume) array_ |  |  |  |


### BuildStrategyStatus



BuildStrategyStatus defines the observed state of BuildStrategy



_Appears in:_
- [BuildStrategy](#buildstrategy)
- [ClusterBuildStrategy](#clusterbuildstrategy)



### BuildStrategyVolume



BuildStrategyVolume is a volume that will be mounted in build pod during build step
of the Build Strategy



_Appears in:_
- [BuildStrategySpec](#buildstrategyspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `overridable` _boolean_ | Indicates that this Volume can be overridden in a Build or BuildRun.<br />Defaults to false |  |  |
| `name` _string_ | Name of the Build Volume |  |  |
| `description` _string_ | Description of the Build Volume |  |  |
| `hostPath` _[HostPathVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#hostpathvolumesource-v1-core)_ | hostPath represents a pre-existing file or directory on the host<br />machine that is directly exposed to the container. This is generally<br />used for system agents or other privileged things that are allowed<br />to see the host machine. Most containers will NOT need this.<br />More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath<br />---<br />TODO(jonesdl) We need to restrict who can use host directory mounts and who can/can not<br />mount host directories as read/write. |  |  |
| `emptyDir` _[EmptyDirVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#emptydirvolumesource-v1-core)_ | emptyDir represents a temporary directory that shares a pod's lifetime.<br />More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir |  |  |
| `gcePersistentDisk` _[GCEPersistentDiskVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#gcepersistentdiskvolumesource-v1-core)_ | gcePersistentDisk represents a GCE Disk resource that is attached to a<br />kubelet's host machine and then exposed to the pod.<br />More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk |  |  |
| `awsElasticBlockStore` _[AWSElasticBlockStoreVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#awselasticblockstorevolumesource-v1-core)_ | awsElasticBlockStore represents an AWS Disk resource that is attached to a<br />kubelet's host machine and then exposed to the pod.<br />More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore |  |  |
| `gitRepo` _[GitRepoVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#gitrepovolumesource-v1-core)_ | gitRepo represents a git repository at a particular revision.<br />DEPRECATED: GitRepo is deprecated. To provision a container with a git repo, mount an<br />EmptyDir into an InitContainer that clones the repo using git, then mount the EmptyDir<br />into the Pod's container. |  |  |
| `secret` _[SecretVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#secretvolumesource-v1-core)_ | secret represents a secret that should populate this volume.<br />More info: https://kubernetes.io/docs/concepts/storage/volumes#secret |  |  |
| `nfs` _[NFSVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#nfsvolumesource-v1-core)_ | nfs represents an NFS mount on the host that shares a pod's lifetime<br />More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs |  |  |
| `iscsi` _[ISCSIVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#iscsivolumesource-v1-core)_ | iscsi represents an ISCSI Disk resource that is attached to a<br />kubelet's host machine and then exposed to the pod.<br />More info: https://examples.k8s.io/volumes/iscsi/README.md |  |  |
| `glusterfs` _[GlusterfsVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#glusterfsvolumesource-v1-core)_ | glusterfs represents a Glusterfs mount on the host that shares a pod's lifetime.<br />More info: https://examples.k8s.io/volumes/glusterfs/README.md |  |  |
| `persistentVolumeClaim` _[PersistentVolumeClaimVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#persistentvolumeclaimvolumesource-v1-core)_ | persistentVolumeClaimVolumeSource represents a reference to a<br />PersistentVolumeClaim in the same namespace.<br />More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims |  |  |
| `rbd` _[RBDVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#rbdvolumesource-v1-core)_ | rbd represents a Rados Block Device mount on the host that shares a pod's lifetime.<br />More info: https://examples.k8s.io/volumes/rbd/README.md |  |  |
| `flexVolume` _[FlexVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#flexvolumesource-v1-core)_ | flexVolume represents a generic volume resource that is<br />provisioned/attached using an exec based plugin. |  |  |
| `cinder` _[CinderVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#cindervolumesource-v1-core)_ | cinder represents a cinder volume attached and mounted on kubelets host machine.<br />More info: https://examples.k8s.io/mysql-cinder-pd/README.md |  |  |
| `cephfs` _[CephFSVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#cephfsvolumesource-v1-core)_ | cephFS represents a Ceph FS mount on the host that shares a pod's lifetime |  |  |
| `flocker` _[FlockerVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#flockervolumesource-v1-core)_ | flocker represents a Flocker volume attached to a kubelet's host machine. This depends on the Flocker control service being running |  |  |
| `downwardAPI` _[DownwardAPIVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#downwardapivolumesource-v1-core)_ | downwardAPI represents downward API about the pod that should populate this volume |  |  |
| `fc` _[FCVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#fcvolumesource-v1-core)_ | fc represents a Fibre Channel resource that is attached to a kubelet's host machine and then exposed to the pod. |  |  |
| `azureFile` _[AzureFileVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#azurefilevolumesource-v1-core)_ | azureFile represents an Azure File Service mount on the host and bind mount to the pod. |  |  |
| `configMap` _[ConfigMapVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#configmapvolumesource-v1-core)_ | configMap represents a configMap that should populate this volume |  |  |
| `vsphereVolume` _[VsphereVirtualDiskVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#vspherevirtualdiskvolumesource-v1-core)_ | vsphereVolume represents a vSphere volume attached and mounted on kubelets host machine |  |  |
| `quobyte` _[QuobyteVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#quobytevolumesource-v1-core)_ | quobyte represents a Quobyte mount on the host that shares a pod's lifetime |  |  |
| `azureDisk` _[AzureDiskVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#azurediskvolumesource-v1-core)_ | azureDisk represents an Azure Data Disk mount on the host and bind mount to the pod. |  |  |
| `photonPersistentDisk` _[PhotonPersistentDiskVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#photonpersistentdiskvolumesource-v1-core)_ | photonPersistentDisk represents a PhotonController persistent disk attached and mounted on kubelets host machine |  |  |
| `projected` _[ProjectedVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#projectedvolumesource-v1-core)_ | projected items for all in one resources secrets, configmaps, and downward API |  |  |
| `portworxVolume` _[PortworxVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#portworxvolumesource-v1-core)_ | portworxVolume represents a portworx volume attached and mounted on kubelets host machine |  |  |
| `scaleIO` _[ScaleIOVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#scaleiovolumesource-v1-core)_ | scaleIO represents a ScaleIO persistent volume attached and mounted on Kubernetes nodes. |  |  |
| `storageos` _[StorageOSVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#storageosvolumesource-v1-core)_ | storageOS represents a StorageOS volume attached and mounted on Kubernetes nodes. |  |  |
| `csi` _[CSIVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#csivolumesource-v1-core)_ | csi (Container Storage Interface) represents ephemeral storage that is handled by certain external CSI drivers (Beta feature). |  |  |
| `ephemeral` _[EphemeralVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#ephemeralvolumesource-v1-core)_ | ephemeral represents a volume that is handled by a cluster storage driver.<br />The volume's lifecycle is tied to the pod that defines it - it will be created before the pod starts,<br />and deleted when the pod is removed.<br /><br />Use this if:<br />a) the volume is only needed while the pod runs,<br />b) features of normal volumes like restoring from snapshot or capacity<br />   tracking are needed,<br />c) the storage driver is specified through a storage class, and<br />d) the storage driver supports dynamic volume provisioning through<br />   a PersistentVolumeClaim (see EphemeralVolumeSource for more<br />   information on the connection between this volume type<br />   and PersistentVolumeClaim).<br /><br />Use PersistentVolumeClaim or one of the vendor-specific<br />APIs for volumes that persist for longer than the lifecycle<br />of an individual pod.<br /><br />Use CSI for light-weight local ephemeral volumes if the CSI driver is meant to<br />be used that way - see the documentation of the driver for<br />more information.<br /><br />A pod can use both types of ephemeral volumes and<br />persistent volumes at the same time. |  |  |


### BuildVolume



BuildVolume is a volume that will be mounted in build pod during build step



_Appears in:_
- [BuildRunSpec](#buildrunspec)
- [BuildSpec](#buildspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `name` _string_ | Name of the Build Volume |  |  |
| `hostPath` _[HostPathVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#hostpathvolumesource-v1-core)_ | hostPath represents a pre-existing file or directory on the host<br />machine that is directly exposed to the container. This is generally<br />used for system agents or other privileged things that are allowed<br />to see the host machine. Most containers will NOT need this.<br />More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath<br />---<br />TODO(jonesdl) We need to restrict who can use host directory mounts and who can/can not<br />mount host directories as read/write. |  |  |
| `emptyDir` _[EmptyDirVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#emptydirvolumesource-v1-core)_ | emptyDir represents a temporary directory that shares a pod's lifetime.<br />More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir |  |  |
| `gcePersistentDisk` _[GCEPersistentDiskVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#gcepersistentdiskvolumesource-v1-core)_ | gcePersistentDisk represents a GCE Disk resource that is attached to a<br />kubelet's host machine and then exposed to the pod.<br />More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk |  |  |
| `awsElasticBlockStore` _[AWSElasticBlockStoreVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#awselasticblockstorevolumesource-v1-core)_ | awsElasticBlockStore represents an AWS Disk resource that is attached to a<br />kubelet's host machine and then exposed to the pod.<br />More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore |  |  |
| `gitRepo` _[GitRepoVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#gitrepovolumesource-v1-core)_ | gitRepo represents a git repository at a particular revision.<br />DEPRECATED: GitRepo is deprecated. To provision a container with a git repo, mount an<br />EmptyDir into an InitContainer that clones the repo using git, then mount the EmptyDir<br />into the Pod's container. |  |  |
| `secret` _[SecretVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#secretvolumesource-v1-core)_ | secret represents a secret that should populate this volume.<br />More info: https://kubernetes.io/docs/concepts/storage/volumes#secret |  |  |
| `nfs` _[NFSVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#nfsvolumesource-v1-core)_ | nfs represents an NFS mount on the host that shares a pod's lifetime<br />More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs |  |  |
| `iscsi` _[ISCSIVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#iscsivolumesource-v1-core)_ | iscsi represents an ISCSI Disk resource that is attached to a<br />kubelet's host machine and then exposed to the pod.<br />More info: https://examples.k8s.io/volumes/iscsi/README.md |  |  |
| `glusterfs` _[GlusterfsVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#glusterfsvolumesource-v1-core)_ | glusterfs represents a Glusterfs mount on the host that shares a pod's lifetime.<br />More info: https://examples.k8s.io/volumes/glusterfs/README.md |  |  |
| `persistentVolumeClaim` _[PersistentVolumeClaimVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#persistentvolumeclaimvolumesource-v1-core)_ | persistentVolumeClaimVolumeSource represents a reference to a<br />PersistentVolumeClaim in the same namespace.<br />More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims |  |  |
| `rbd` _[RBDVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#rbdvolumesource-v1-core)_ | rbd represents a Rados Block Device mount on the host that shares a pod's lifetime.<br />More info: https://examples.k8s.io/volumes/rbd/README.md |  |  |
| `flexVolume` _[FlexVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#flexvolumesource-v1-core)_ | flexVolume represents a generic volume resource that is<br />provisioned/attached using an exec based plugin. |  |  |
| `cinder` _[CinderVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#cindervolumesource-v1-core)_ | cinder represents a cinder volume attached and mounted on kubelets host machine.<br />More info: https://examples.k8s.io/mysql-cinder-pd/README.md |  |  |
| `cephfs` _[CephFSVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#cephfsvolumesource-v1-core)_ | cephFS represents a Ceph FS mount on the host that shares a pod's lifetime |  |  |
| `flocker` _[FlockerVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#flockervolumesource-v1-core)_ | flocker represents a Flocker volume attached to a kubelet's host machine. This depends on the Flocker control service being running |  |  |
| `downwardAPI` _[DownwardAPIVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#downwardapivolumesource-v1-core)_ | downwardAPI represents downward API about the pod that should populate this volume |  |  |
| `fc` _[FCVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#fcvolumesource-v1-core)_ | fc represents a Fibre Channel resource that is attached to a kubelet's host machine and then exposed to the pod. |  |  |
| `azureFile` _[AzureFileVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#azurefilevolumesource-v1-core)_ | azureFile represents an Azure File Service mount on the host and bind mount to the pod. |  |  |
| `configMap` _[ConfigMapVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#configmapvolumesource-v1-core)_ | configMap represents a configMap that should populate this volume |  |  |
| `vsphereVolume` _[VsphereVirtualDiskVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#vspherevirtualdiskvolumesource-v1-core)_ | vsphereVolume represents a vSphere volume attached and mounted on kubelets host machine |  |  |
| `quobyte` _[QuobyteVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#quobytevolumesource-v1-core)_ | quobyte represents a Quobyte mount on the host that shares a pod's lifetime |  |  |
| `azureDisk` _[AzureDiskVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#azurediskvolumesource-v1-core)_ | azureDisk represents an Azure Data Disk mount on the host and bind mount to the pod. |  |  |
| `photonPersistentDisk` _[PhotonPersistentDiskVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#photonpersistentdiskvolumesource-v1-core)_ | photonPersistentDisk represents a PhotonController persistent disk attached and mounted on kubelets host machine |  |  |
| `projected` _[ProjectedVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#projectedvolumesource-v1-core)_ | projected items for all in one resources secrets, configmaps, and downward API |  |  |
| `portworxVolume` _[PortworxVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#portworxvolumesource-v1-core)_ | portworxVolume represents a portworx volume attached and mounted on kubelets host machine |  |  |
| `scaleIO` _[ScaleIOVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#scaleiovolumesource-v1-core)_ | scaleIO represents a ScaleIO persistent volume attached and mounted on Kubernetes nodes. |  |  |
| `storageos` _[StorageOSVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#storageosvolumesource-v1-core)_ | storageOS represents a StorageOS volume attached and mounted on Kubernetes nodes. |  |  |
| `csi` _[CSIVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#csivolumesource-v1-core)_ | csi (Container Storage Interface) represents ephemeral storage that is handled by certain external CSI drivers (Beta feature). |  |  |
| `ephemeral` _[EphemeralVolumeSource](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#ephemeralvolumesource-v1-core)_ | ephemeral represents a volume that is handled by a cluster storage driver.<br />The volume's lifecycle is tied to the pod that defines it - it will be created before the pod starts,<br />and deleted when the pod is removed.<br /><br />Use this if:<br />a) the volume is only needed while the pod runs,<br />b) features of normal volumes like restoring from snapshot or capacity<br />   tracking are needed,<br />c) the storage driver is specified through a storage class, and<br />d) the storage driver supports dynamic volume provisioning through<br />   a PersistentVolumeClaim (see EphemeralVolumeSource for more<br />   information on the connection between this volume type<br />   and PersistentVolumeClaim).<br /><br />Use PersistentVolumeClaim or one of the vendor-specific<br />APIs for volumes that persist for longer than the lifecycle<br />of an individual pod.<br /><br />Use CSI for light-weight local ephemeral volumes if the CSI driver is meant to<br />be used that way - see the documentation of the driver for<br />more information.<br /><br />A pod can use both types of ephemeral volumes and<br />persistent volumes at the same time. |  |  |




### ClusterBuildStrategy



ClusterBuildStrategy is the Schema representing a strategy in the cluster scope to build images from source code.



_Appears in:_
- [ClusterBuildStrategyList](#clusterbuildstrategylist)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `apiVersion` _string_ | `shipwright.io/v1beta1` | | |
| `kind` _string_ | `ClusterBuildStrategy` | | |
| `metadata` _[ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#objectmeta-v1-meta)_ | Refer to Kubernetes API documentation for fields of `metadata`. |  |  |
| `spec` _[BuildStrategySpec](#buildstrategyspec)_ |  |  |  |
| `status` _[BuildStrategyStatus](#buildstrategystatus)_ |  |  |  |


### ClusterBuildStrategyList



ClusterBuildStrategyList contains a list of ClusterBuildStrategy





| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `apiVersion` _string_ | `shipwright.io/v1beta1` | | |
| `kind` _string_ | `ClusterBuildStrategyList` | | |
| `metadata` _[ListMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#listmeta-v1-meta)_ | Refer to Kubernetes API documentation for fields of `metadata`. |  |  |
| `items` _[ClusterBuildStrategy](#clusterbuildstrategy) array_ |  |  |  |


### Condition



Condition defines the required fields for populating
Build controllers Conditions



_Appears in:_
- [Conditions](#conditions)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `type` _[Type](#type)_ | Type of condition |  |  |
| `status` _[ConditionStatus](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#conditionstatus-v1-core)_ | Status of the condition, one of True, False, Unknown. |  |  |
| `lastTransitionTime` _[Time](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#time-v1-meta)_ | LastTransitionTime last time the condition transit from one status to another. |  |  |
| `reason` _string_ | The reason for the condition last transition. |  |  |
| `message` _string_ | A human readable message indicating details about the transition. |  |  |


### Conditions

_Underlying type:_ _[Condition](#condition)_

Conditions defines a list of Condition



_Appears in:_
- [BuildRunStatus](#buildrunstatus)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `type` _[Type](#type)_ | Type of condition |  |  |
| `status` _[ConditionStatus](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#conditionstatus-v1-core)_ | Status of the condition, one of True, False, Unknown. |  |  |
| `lastTransitionTime` _[Time](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#time-v1-meta)_ | LastTransitionTime last time the condition transit from one status to another. |  |  |
| `reason` _string_ | The reason for the condition last transition. |  |  |
| `message` _string_ | A human readable message indicating details about the transition. |  |  |


### FailureDetails



FailureDetails describes an error while building images



_Appears in:_
- [BuildRunStatus](#buildrunstatus)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `reason` _string_ |  |  |  |
| `message` _string_ |  |  |  |
| `location` _[Location](#location)_ |  |  |  |


### Git



Git describes the git repository to pull



_Appears in:_
- [Source](#source)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `url` _string_ | URL describes the URL of the Git repository. |  |  |
| `revision` _string_ | Revision describes the Git revision (e.g., branch, tag, commit SHA,<br />etc.) to fetch.<br /><br />If not defined, it will fallback to the repository's default branch. |  |  |
| `cloneSecret` _string_ | CloneSecret references a Secret that contains credentials to access<br />the repository. |  |  |


### GitHubEventName

_Underlying type:_ _string_

GitHubEventName set of WhenGitHub valid event names.



_Appears in:_
- [WhenGitHub](#whengithub)

| Field | Description |
| --- | --- |
| `PullRequest` | GitHubPullRequestEvent github pull-request event name.<br /> |
| `Push` | GitHubPushEvent git push webhook event name.<br /> |


### GitSourceResult



GitSourceResult holds the results emitted from the git source



_Appears in:_
- [SourceResult](#sourceresult)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `commitSha` _string_ | CommitSha holds the commit sha of git source |  |  |
| `commitAuthor` _string_ | CommitAuthor holds the commit author of a git source |  |  |
| `branchName` _string_ | BranchName holds the default branch name of the git source<br />this will be set only when revision is not specified in Build object |  |  |


### IgnoredVulnerabilitySeverity

_Underlying type:_ _string_

IgnoredVulnerabilitySeverity is an enum for the possible values for the ignored severity



_Appears in:_
- [VulnerabilityIgnoreOptions](#vulnerabilityignoreoptions)

| Field | Description |
| --- | --- |
| `high` | High indicates that high, medium, and low severity vulnerabilities should be ignored<br /> |
| `medium` | Medium indicates that medium, and low severity vulnerabilities should be ignored<br /> |
| `low` | High indicates that low severity vulnerabilities should be ignored<br /> |


### Image



Image refers to an container image with credentials



_Appears in:_
- [BuildRunSpec](#buildrunspec)
- [BuildSpec](#buildspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `image` _string_ | Image is the reference of the image. |  |  |
| `insecure` _boolean_ | Insecure defines whether the registry is not secure |  |  |
| `pushSecret` _string_ | Describes the secret name for pushing a container image. |  |  |
| `annotations` _object (keys:string, values:string)_ | Annotations references the additional annotations to be applied on the image |  |  |
| `labels` _object (keys:string, values:string)_ | Labels references the additional labels to be applied on the image |  |  |
| `vulnerabilityScan` _[VulnerabilityScanOptions](#vulnerabilityscanoptions)_ | VulnerabilityScan provides configurations about running a scan for your generated image |  |  |
| `timestamp` _string_ | Timestamp references the optional image timestamp to be set, valid values are:<br />- "Zero", to set 00:00:00 UTC on 1 January 1970<br />- "SourceTimestamp", to set the source timestamp dereived from the input source<br />- "BuildTimestamp", to set the timestamp of the current build itself<br />- Parsable integer number defined as the epoch seconds<br />- or nil/empty to not set any specific timestamp |  |  |


### Local







_Appears in:_
- [BuildRunSource](#buildrunsource)
- [Source](#source)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `timeout` _[Duration](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#duration-v1-meta)_ | Timeout how long the BuildSource execution must take. |  |  |
| `name` _string_ | Name of the local step |  |  |


### Location



Location describes the location where the failure happened



_Appears in:_
- [FailureDetails](#failuredetails)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `pod` _string_ |  |  |  |
| `container` _string_ |  |  |  |


### OCIArtifact



OCIArtifact describes the source code bundle container to pull



_Appears in:_
- [Source](#source)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `image` _string_ | Image reference, i.e. quay.io/org/image:tag |  |  |
| `prune` _[PruneOption](#pruneoption)_ | Prune specifies whether the image is suppose to be deleted. Allowed<br />values are 'Never' (no deletion) and `AfterPull` (removal after the<br />image was successfully pulled from the registry).<br /><br />If not defined, it defaults to 'Never'. |  |  |
| `pullSecret` _string_ | PullSecret references a Secret that contains credentials to access<br />the repository. |  |  |


### ObjectKeyRef







_Appears in:_
- [SingleValue](#singlevalue)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `name` _string_ | Name of the object |  |  |
| `key` _string_ | Key inside the object |  |  |
| `format` _string_ | An optional format to add pre- or suffix to the object value. For example 'KEY=$\{SECRET_VALUE\}' or 'KEY=$\{CONFIGMAP_VALUE\}' depending on the context. |  |  |


### OciArtifactSourceResult



OciArtifactSourceResult holds the results emitted from the bundle source



_Appears in:_
- [SourceResult](#sourceresult)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `digest` _string_ | Digest hold the image digest result |  |  |


### Output



Output holds the information about the container image that the BuildRun built



_Appears in:_
- [BuildRunStatus](#buildrunstatus)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `digest` _string_ | Digest holds the digest of output image |  |  |
| `size` _integer_ | Size holds the compressed size of output image |  |  |
| `vulnerabilities` _[Vulnerability](#vulnerability) array_ | Vulnerabilities holds the list of vulnerabilities detected in the image |  |  |


### ParamValue



ParamValue is a key/value that populates a strategy parameter
used in the execution of the strategy steps



_Appears in:_
- [BuildRunSpec](#buildrunspec)
- [BuildSpec](#buildspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `name` _string_ | Name of the parameter |  |  |
| `values` _[SingleValue](#singlevalue) array_ | Values of an array parameter |  |  |


### Parameter



Parameter holds a name-description with a default value
that allows strategy steps to be parameterize.
Build users can set a value for parameter via the Build
or BuildRun spec.paramValues object.



_Appears in:_
- [BuildStrategySpec](#buildstrategyspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `name` _string_ | Name of the parameter |  |  |
| `description` _string_ | Description on the parameter purpose |  |  |
| `type` _[ParameterType](#parametertype)_ | Type of the parameter. The possible types are "string" and "array",<br />and "string" is the default. |  |  |
| `default` _string_ | Default value for a string parameter |  |  |
| `defaults` _string_ | Default values for an array parameter |  |  |


### ParameterType

_Underlying type:_ _string_

ParameterType indicates the type of a parameter



_Appears in:_
- [Parameter](#parameter)

| Field | Description |
| --- | --- |
| `string` |  |
| `array` |  |


### PruneOption

_Underlying type:_ _string_

PruneOption defines the supported options for image pruning



_Appears in:_
- [OCIArtifact](#ociartifact)

| Field | Description |
| --- | --- |
| `Never` | Do not delete image after it was pulled<br /> |
| `AfterPull` | Delete image after it was successfully pulled<br /> |


### ReferencedBuild







_Appears in:_
- [BuildRunSpec](#buildrunspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `spec` _[BuildSpec](#buildspec)_ | Spec refers to an embedded build specification |  |  |
| `name` _string_ | Name of the referent; More info: http://kubernetes.io/docs/user-guide/identifiers#names |  |  |


### SingleValue



The value type contains the properties for a value, this allows for an
easy extension in the future to support more kinds



_Appears in:_
- [ParamValue](#paramvalue)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `value` _string_ | The value of the parameter |  |  |
| `configMapValue` _[ObjectKeyRef](#objectkeyref)_ | The ConfigMap value of the parameter |  |  |
| `secretValue` _[ObjectKeyRef](#objectkeyref)_ | The secret value of the parameter |  |  |


### Source



Source describes the build source type to fetch.



_Appears in:_
- [BuildSpec](#buildspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `type` _[BuildSourceType](#buildsourcetype)_ | Type is the BuildSource qualifier, the type of the source. |  |  |
| `contextDir` _string_ | ContextDir is a path to subfolder in the repo. Optional. |  |  |
| `ociArtifact` _[OCIArtifact](#ociartifact)_ | OCIArtifact contains the details for the source of type OCIArtifact |  |  |
| `git` _[Git](#git)_ | Git contains the details for the source of type Git |  |  |
| `local` _[Local](#local)_ | Local contains the details for the source of type Local |  |  |


### SourceResult



SourceResult holds the results emitted from the different sources



_Appears in:_
- [BuildRunStatus](#buildrunstatus)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `git` _[GitSourceResult](#gitsourceresult)_ | Git holds the results emitted from the<br />source step of type git |  |  |
| `ociArtifact` _[OciArtifactSourceResult](#ociartifactsourceresult)_ | OciArtifact holds the results emitted from<br />the source step of type ociArtifact |  |  |
| `timestamp` _[Time](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#time-v1-meta)_ | Timestamp holds the timestamp of the source, which<br />depends on the actual source type and could range from<br />being the commit timestamp or the fileystem timestamp<br />of the most recent source file in the working directory |  |  |


### Step



BuildStep defines a partial step that needs to run in container for building the image.
If the build step declares a volumeMount, Shipwright will create an emptyDir volume mount for the named volume.
Build steps which share the same named volume in the volumeMount will share the same underlying emptyDir volume.
This behavior is deprecated, and will be removed when full volume support is added to build strategies as specified
in SHIP-0022.



_Appears in:_
- [BuildStrategySpec](#buildstrategyspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `name` _string_ | Name of the container specified as a DNS_LABEL.<br />Each container in a pod must have a unique name (DNS_LABEL).<br />Cannot be updated. |  |  |
| `image` _string_ | Container image name.<br />More info: https://kubernetes.io/docs/concepts/containers/images<br />This field is optional to allow higher level config management to default or override<br />container images in workload controllers like Deployments and StatefulSets. |  |  |
| `command` _string array_ | Entrypoint array. Not executed within a shell.<br />The container image's ENTRYPOINT is used if this is not provided.<br />Variable references $(VAR_NAME) are expanded using the container's environment. If a variable<br />cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced<br />to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will<br />produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless<br />of whether the variable exists or not. Cannot be updated.<br />More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell |  |  |
| `args` _string array_ | Arguments to the entrypoint.<br />The container image's CMD is used if this is not provided.<br />Variable references $(VAR_NAME) are expanded using the container's environment. If a variable<br />cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced<br />to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will<br />produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless<br />of whether the variable exists or not. Cannot be updated.<br />More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell |  |  |
| `workingDir` _string_ | Container's working directory.<br />If not specified, the container runtime's default will be used, which<br />might be configured in the container image.<br />Cannot be updated. |  |  |
| `env` _[EnvVar](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#envvar-v1-core) array_ | List of environment variables to set in the container.<br />Cannot be updated. |  |  |
| `resources` _[ResourceRequirements](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#resourcerequirements-v1-core)_ | Compute Resources required by this container.<br />Cannot be updated.<br />More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/ |  |  |
| `volumeMounts` _[VolumeMount](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#volumemount-v1-core) array_ | Pod volumes to mount into the container's filesystem.<br />Cannot be updated. |  |  |
| `imagePullPolicy` _[PullPolicy](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#pullpolicy-v1-core)_ | Image pull policy.<br />One of Always, Never, IfNotPresent.<br />Defaults to Always if :latest tag is specified, or IfNotPresent otherwise.<br />Cannot be updated.<br />More info: https://kubernetes.io/docs/concepts/containers/images#updating-images |  |  |
| `securityContext` _[SecurityContext](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.3/#securitycontext-v1-core)_ | SecurityContext defines the security options the container should be run with.<br />If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext.<br />More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/ |  |  |


### Strategy



Strategy can be used to refer to a specific instance of a buildstrategy.
Copied from CrossVersionObjectReference: https://github.com/kubernetes/kubernetes/blob/169df7434155cbbc22f1532cba8e0a9588e29ad8/pkg/apis/autoscaling/types.go#L64



_Appears in:_
- [BuildSpec](#buildspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `name` _string_ | Name of the referent; More info: http://kubernetes.io/docs/user-guide/identifiers#names |  |  |
| `kind` _[BuildStrategyKind](#buildstrategykind)_ | BuildStrategyKind indicates the kind of the buildstrategy, namespaced or cluster scoped. |  |  |


### Trigger



Trigger represents the webhook trigger configuration for a Build.



_Appears in:_
- [BuildSpec](#buildspec)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `when` _[TriggerWhen](#triggerwhen) array_ | When the list of scenarios when a new build should take place. |  |  |
| `triggerSecret` _string_ | TriggerSecret points to a local object carrying the secret token to validate webhook request. |  |  |


### TriggerType

_Underlying type:_ _string_

TriggerType set of TriggerWhen valid names.



_Appears in:_
- [TriggerWhen](#triggerwhen)

| Field | Description |
| --- | --- |
| `GitHub` | GitHubWebHookTrigger GitHubWebHookTrigger trigger type name.<br /> |
| `Image` | ImageTrigger Image trigger type name.<br /> |
| `Pipeline` | PipelineTrigger Tekton Pipeline trigger type name.<br /> |


### TriggerWhen



TriggerWhen a given scenario where the webhook trigger is applicable.



_Appears in:_
- [Trigger](#trigger)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `name` _string_ | Name name or the short description of the trigger condition. |  |  |
| `type` _[TriggerType](#triggertype)_ | Type the event type |  |  |
| `github` _[WhenGitHub](#whengithub)_ | GitHub describes how to trigger builds based on GitHub (SCM) events. |  |  |
| `image` _[WhenImage](#whenimage)_ | Image slice of image names where the event applies. |  |  |
| `objectRef` _[WhenObjectRef](#whenobjectref)_ | ObjectRef describes how to match a foreign resource, either using the name or the label<br />selector, plus the current resource status. |  |  |


### Type

_Underlying type:_ _string_

Type used for defining the conditiont Type field flavour



_Appears in:_
- [Condition](#condition)

| Field | Description |
| --- | --- |
| `Succeeded` | Succeeded specifies that the resource has finished.<br />For resources that run to completion.<br /> |


### Vulnerability



Vulnerability defines a vulnerability by its ID and severity



_Appears in:_
- [Output](#output)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `id` _string_ |  |  |  |
| `severity` _[VulnerabilitySeverity](#vulnerabilityseverity)_ |  |  |  |


### VulnerabilityIgnoreOptions



VulnerabilityIgnoreOptions refers to ignore options for vulnerability scan



_Appears in:_
- [VulnerabilityScanOptions](#vulnerabilityscanoptions)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `id` _string array_ | ID references the security issues to be ignored in vulnerability scan |  |  |
| `severity` _[IgnoredVulnerabilitySeverity](#ignoredvulnerabilityseverity)_ | Severity denotes the severity levels of security issues to be ignored, valid values are:<br />- "low": it will exclude low severity vulnerabilities, displaying only medium, high and critical vulnerabilities<br />- "medium": it will exclude low and medium severity vulnerabilities, displaying only high and critical vulnerabilities<br />- "high": it will exclude low, medium and high severity vulnerabilities, displaying only the critical vulnerabilities |  | Enum: [low medium high] <br /> |
| `unfixed` _boolean_ | Unfixed indicates to ignore vulnerabilities for which no fix exists |  |  |


### VulnerabilityScanOptions



VulnerabilityScanOptions provides configurations about running a scan for your generated image



_Appears in:_
- [Image](#image)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `enabled` _boolean_ | Enabled indicates whether to run vulnerability scan for image |  |  |
| `failOnFinding` _boolean_ | FailOnFinding indicates whether to fail the build run if the vulnerability scan results in vulnerabilities |  |  |
| `ignore` _[VulnerabilityIgnoreOptions](#vulnerabilityignoreoptions)_ | Ignore refers to ignore options for vulnerability scan |  |  |


### VulnerabilitySeverity

_Underlying type:_ _string_

VulnerabilitySeverity is an enum for the possible values for severity of a vulnerability



_Appears in:_
- [Vulnerability](#vulnerability)

| Field | Description |
| --- | --- |
| `critical` | Critical indicates a critical severity<br /> |
| `high` | High indicates a high severity<br /> |
| `medium` | Medium indicates a medium severity<br /> |
| `low` | Low indicates a low severity<br /> |
| `unknown` | Unknown indicates an unknown severity<br /> |


### WhenGitHub



WhenGitHub attributes to match GitHub events.



_Appears in:_
- [TriggerWhen](#triggerwhen)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `events` _[GitHubEventName](#githubeventname) array_ | Events GitHub event names. |  | MinItems: 1 <br /> |
| `branches` _string array_ | Branches slice of branch names where the event applies. |  |  |


### WhenImage



WhenImage attributes to match Image events.



_Appears in:_
- [TriggerWhen](#triggerwhen)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `names` _string array_ | Names fully qualified image names. |  |  |


### WhenObjectRef



WhenObjectRef attributes to reference local Kubernetes objects.



_Appears in:_
- [TriggerWhen](#triggerwhen)

| Field | Description | Default | Validation |
| --- | --- | --- | --- |
| `name` _string_ | Name target object name. |  |  |
| `status` _string array_ | Status object status. |  |  |
| `selector` _object (keys:string, values:string)_ | Selector label selector. |  |  |


