---
title: "Configuration"
draft: false
---

The controller is installed into Kubernetes with reasonable defaults. However, there are some settings that can be overridden using environment variables in [`controller.yaml`](https://github.com/shipwright-io/build/blob/v0.5.1/deploy/500-controller.yaml).

The following environment variables are available:

| Environment Variable | Description |
| --- | --- |
| `CTX_TIMEOUT` | Override the default context timeout used for all Custom Resource Definition reconciliation operations. |
| `KANIKO_CONTAINER_IMAGE` | Specify the Kaniko container image to be used for the runtime image build instead of the default, for example `gcr.io/kaniko-project/executor:v1.6.0`. |
| `REMOTE_ARTIFACTS_CONTAINER_IMAGE` | Specify the container image used for the `.spec.sources` remote artifacts download, by default it uses `busybox:latest`. |
| `GIT_CONTAINER_TEMPLATE` | JSON representation of a [Container](https://pkg.go.dev/k8s.io/api/core/v1#Container) template that is used for steps that clone a Git repository. Default is `{"image":"quay.io/shipwright/git:latest", "command":["/ko-app/git"], "securityContext":{"runAsUser":1000,"runAsGroup":1000}}`. The following properties are ignored as they are set by the controller: `args`, `name`. |
| `GIT_CONTAINER_IMAGE` | Custom container image for Git clone steps. If `GIT_CONTAINER_TEMPLATE` is also specifying an image, then the value for `GIT_CONTAINER_IMAGE` has precedence. |
| `BUILD_CONTROLLER_LEADER_ELECTION_NAMESPACE` |  Set the namespace to be used to store the `shipwright-build-controller` lock, by default it is in the same namespace as the controller itself. |
| `BUILD_CONTROLLER_LEASE_DURATION` |  Override the `LeaseDuration`, which is the duration that non-leader candidates will wait to force acquire leadership. |
| `BUILD_CONTROLLER_RENEW_DEADLINE` |  Override the `RenewDeadline`, which is the duration that the acting leader will retry refreshing leadership before giving up. |
| `BUILD_CONTROLLER_RETRY_PERIOD` |  Override the `RetryPeriod`, which is the duration the LeaderElector clients should wait between tries of actions. |
| `BUILD_MAX_CONCURRENT_RECONCILES` | The number of concurrent reconciles by the build controller. A value of 0 or lower will use the default from the [controller-runtime controller Options](https://pkg.go.dev/sigs.k8s.io/controller-runtime/pkg/controller#Options). Default is 0. |
| `BUILDRUN_MAX_CONCURRENT_RECONCILES` | The number of concurrent reconciles by the buildrun controller. A value of 0 or lower will use the default from the [controller-runtime controller Options](https://pkg.go.dev/sigs.k8s.io/controller-runtime/pkg/controller#Options). Default is 0. |
| `BUILDSTRATEGY_MAX_CONCURRENT_RECONCILES` | The number of concurrent reconciles by the buildstrategy controller. A value of 0 or lower will use the default from the [controller-runtime controller Options](https://pkg.go.dev/sigs.k8s.io/controller-runtime/pkg/controller#Options). Default is 0. |
| `CLUSTERBUILDSTRATEGY_MAX_CONCURRENT_RECONCILES` | The number of concurrent reconciles by the clusterbuildstrategy controller. A value of 0 or lower will use the default from the [controller-runtime controller Options](https://pkg.go.dev/sigs.k8s.io/controller-runtime/pkg/controller#Options). Default is 0. |
| `KUBE_API_BURST` | Burst to use for the Kubernetes API client. See [Config.Burst](https://pkg.go.dev/k8s.io/client-go/rest#Config.Burst). A value of 0 or lower will use the default from client-go, which currently is 10. Default is 0. |
| `KUBE_API_QPS` | QPS to use for the Kubernetes API client. See [Config.QPS](https://pkg.go.dev/k8s.io/client-go/rest#Config.QPS). A value of 0 or lower will use the default from client-go, which currently is 5. Default is 0. |
| `TERMINATION_LOG_PATH` | Path of the termination log. This is where controller application will write the reason of its termination. Default value is `/dev/termination-log`. |
