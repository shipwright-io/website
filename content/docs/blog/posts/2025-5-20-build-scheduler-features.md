---
title: "Shipwright build scheduler features"
date: 2025-05-20T11:39:00-06:00
draft: false
author: "Dylan Orzel ([@dorzel](https://github.com/dorzel))"
---

## New Build Scheduler Features

A new set of build scheduling features introduced in [v0.15](https://shipwright.io/docs/blog/posts/2025-02-28-release-v0.15) allows users to specify node selectors, custom schedulers, and tolerations for builds.

These make it easier to schedule builds on clusters with nodes of multiple CPU architectures, use a scheduler that is tuned to a certain workflow, or just more general control of which nodes builds run on.

### CLI flags to use build scheduler features

With these features also comes new CLI flags (introduced in v0.16) that allow specifying nodeSelectors and custom schedulers on the command line when using `shp` with `Builds` or `BuildRuns`.

In the following commands, `--node-selector` and `--scheduler-name` sets these fields on the `Build` or `BuildRun` objects:

- `shp build create`
- `shp build run`
- `shp build upload`
- `shp buildrun create`

### Example with `shp build run` and `--node-selector`

We can specify a build to be scheduled to a node with certain labels by using a node selector. Here, we'll schedule a build to a node with an ARM CPU architecture. Starting with an example build:

```bash
$ shp build create test-golang-build \
  --output-image=kind.local/test/test-golang-build \
  --source-git-url=https://github.com/shipwright-io/sample-go \
  --source-context-dir=docker-build \
  --strategy-name=buildah-shipwright-managed-push
```

We'll run the build and specify the arm64 architecture in the node selector flag:

```bash
$ shp build run test-golang-build --node-selector=kubernetes.io/arch=arm64
```

and see that the created BuildRun now has a nodeSelector specified and has been scheduled on the arm64 node:

```yaml
apiVersion: shipwright.io/v1beta1
kind: BuildRun
metadata:
  creationTimestamp: "2025-05-20T17:27:01Z"
  generateName: test-golang-build-
  generation: 1
  labels:
    build.shipwright.io/generation: "1"
    build.shipwright.io/name: test-golang-build
  name: test-golang-build-glghq
  namespace: default
  resourceVersion: "31512392"
  uid: 19f02c99-1d24-44c0-a5f9-ab544fdf55ae
spec:
  build:
    name: test-golang-build
  nodeSelector:
    kubernetes.io/arch: arm64
```

```bash
$ kubectl get pod test-golang-build-glghq-tfhnn-pod -o jsonpath='{.spec.nodeName} {.spec.nodeSelector}'

arm-node.compute.internal {"kubernetes.io/arch":"arm64"}

$ kubectl get node arm-node.compute.internal -o jsonpath='{.metadata.labels.kubernetes\.io/arch}'

arm64
```

### Example with `shp build create` and `--scheduler-name`

This time we'll specify a scheduler name `test-scheduler` that is assumed to be a custom scheduler that has been deployed to the cluster already.

Instead of specifying these options when running the build, we can also specify them when creating the build:

```bash
$ shp build create test-golang-build \
  --output-image=kind.local/test/test-golang-build \
  --source-git-url=https://github.com/shipwright-io/sample-go \
  --source-context-dir=docker-build \
  --strategy-name=buildah-shipwright-managed-push \
  --scheduler-name=test-scheduler
```

and see that the scheduler name appears in the Build yaml:

```yaml
apiVersion: shipwright.io/v1beta1
kind: Build
metadata:
  creationTimestamp: "2025-05-20T17:49:07Z"
  generation: 1
  name: test-golang-build
  namespace: default
  resourceVersion: "31518385"
  uid: bd2333fb-71eb-4228-bc5f-5a466032fcc5
spec:
  output:
    image: kind.local/test/test-golang-build
  schedulerName: test-scheduler
  source:
    contextDir: docker-build
    git:
      url: https://github.com/shipwright-io/sample-go
    type: Git
  strategy:
    kind: ClusterBuildStrategy
    name: buildah-shipwright-managed-push
status:
  message: all validations succeeded
  reason: Succeeded
  registered: "True"
```

After running the build with `shp build run test-golang-build`, we see that the schedulerName got picked up by the build pod:

```bash
$ kubectl get pods test-golang-build-j9vbd-qr9cr-pod -o jsonpath='{.spec.schedulerName}'

test-scheduler
```

### Example with setting tolerations on a `BuildRun`

We'll start with the same example build as above:

```bash
$ shp build create test-golang-build \
  --output-image=kind.local/test/test-golang-build \
  --source-git-url=https://github.com/shipwright-io/sample-go \
  --source-context-dir=docker-build \
  --strategy-name=buildah-shipwright-managed-push
```

```yaml
apiVersion: shipwright.io/v1beta1
kind: Build
metadata:
  creationTimestamp: "2025-05-20T18:29:43Z"
  generation: 1
  name: test-golang-build
  namespace: default
  resourceVersion: "31529978"
  uid: f393de53-e389-4e25-a29a-a434505bd82e
spec:
  output:
    image: kind.local/test/test-golang-build
  source:
    contextDir: docker-build
    git:
      url: https://github.com/shipwright-io/sample-go
    type: Git
  strategy:
    kind: ClusterBuildStrategy
    name: buildah-shipwright-managed-push
```

In this example we have a three node cluster, so let's taint all of the nodes with `test-key` and `test-value`. This will prevent any pod from scheduling on these nodes unless it tolerates this taint:

```bash
$ kubectl get nodes -o name
node/test-node-1
node/test-node-2
node/test-node-3

$ kubectl taint nodes test-node-1 test-key=test-value:NoSchedule
node/test-node-1 tainted
$ kubectl taint nodes test-node-2 test-key=test-value:NoSchedule
node/test-node-2 tainted
$ kubectl taint nodes test-node-3 test-key=test-value:NoSchedule
node/test-node-3 tainted
```

We see that if we create a BuildRun now, it will fail to schedule:

```bash
$ shp build run test-golang-build

$ kubectl get events
LAST SEEN   TYPE      REASON             OBJECT                                  MESSAGE
...
2m54s       Normal    Pending            taskrun/test-golang-build-bqw9s-hbkds   pod status "PodScheduled":"False"; message: "0/3 nodes are available: 3 node(s) had untolerated taint {test-key: test-value}. preemption: 0/3 nodes are available: 3 Preemption is not helpful for scheduling."
...
```

Let's patch the Build with the following toleration in order to have it tolerate the node taint:

```yaml
tolerations:
  - key: "test-key"
    operator: "Equal"
    value: "test-value"
    effect: "NoSchedule"
```

```bash
$ kubectl patch Build test-golang-build --type=merge -p '{"spec":{"tolerations":[{"key":"test-key","operator":"Equal","value":"test-value"}]}}'

$ shp build run test-golang-build
```

Now we see that the build is successfully scheduled:

```bash
$ kubectl get events
LAST SEEN   TYPE      REASON             OBJECT                                  MESSAGE
...
109s        Normal    Scheduled          pod/test-golang-build-k7zc4-492d2-pod   Successfully assigned default/test-golang-build-k7zc4-492d2-pod to ip-10-0-2-69.us-east-2.compute.internal
...
```

### Conclusion

Shipwright's new build scheduling options make it much easier to control where builds get placed in the cluster and give more options to those who are operating in multi-arch environments or with other constraints.