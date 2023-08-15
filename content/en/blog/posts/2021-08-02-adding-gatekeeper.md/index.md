---
date: 2021-08-02
title: "Gatekeeper Policies with Shipwright"
linkTitle: "Gatekeeper Policies with Shipwright"
description: "Restricting Shipwright to trusted sources using Gatekeeper"
author: "Blair Drummond ([@blairdrummond](https://github.com/blairdrummond))"
resources:
- src: "**.{png}"
  title: "Figure #:counter"
---


[Gatekeeper](https://github.com/open-policy-agent/gatekeeper) is a customizable [admission webhook](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/#what-are-admission-webhooks) for Kubernetes, which allows you to configure [policy](https://www.openpolicyagent.org/docs/latest/policy-language/) over what resources can be created in the cluster. In particular, we can use Gatekeeper to add policy to Shipwright [`Build`](/docs/build/)s. In this example, you can see how you can use a policy to control what source repositories Shipwright is allowed to build, so that you can have more control over what code executes inside your cluster.

[![Gatekeeper](opa.png)](https://github.com/securekubernetes/securekubernetes/blob/master/docs/img/opa.png)

## Only allow builds of allowed sources

Unless you are able to build images without root access in the build-process, there are risks to building arbitrary [Open Container Initiative (OCI)](https://opencontainers.org/) images within your cluster. Because of these risks, an organization may want to limit builds to trusted sources, such as specific github organizations or an internally hosted git server. This is an example of how that can be configured using Gatekeeper.

### Step 0. Install Gatekeeper

If you do not have Gatekeeper installed already, see install instructions [here](https://open-policy-agent.github.io/gatekeeper/website/docs/install/#installation). These examples were tested with version 3.4.

*At the time of writing 3.5 has [an open issue](https://github.com/open-policy-agent/gatekeeper/issues/1468) with parameters, but there is an open PR to fix it.*

### Step 1. Configure Gatekeeper to watch for `Build` resources

Either Create or append to your gatekeeper-system config. This configmap specifies all resources that Gatekeeper will monitor.

```yaml
apiVersion: config.gatekeeper.sh/v1alpha1
kind: Config
metadata:
  name: config
  namespace: "gatekeeper-system"
spec:
  sync:
    syncOnly:
      - group: "shipwright.io"
        version: "v1alpha1"
        kind: "Build"
```

### Step 2. Create the ShipwrightAllowlist Constraint Template

This constraint template will let us create our [`ShipwrightAllowlist`](#create-your-shipwrightallowlist-constraint); in the parameters to the `ShipwrightAllowlist` we will specify the allowed sources, and this constraint template will apply the logic.

*This constraint template is based on [this example](https://github.com/open-policy-agent/gatekeeper/blob/07e2fd0507dacb83bfa1d0625981beeead9976a1/demo/agilebank/templates/k8sallowedrepos_template.yaml) in the Gatekeeper docs.*

```yaml
apiVersion: templates.gatekeeper.sh/v1beta1
kind: ConstraintTemplate
metadata:
  name: shipwrightallowlist
spec:
  crd:
    spec:
      names:
        kind: ShipwrightAllowlist
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package shipwrightallowlist

        violation[{"msg": msg}] {
          input.review.object.kind == "Build"
          repo_url := input.review.object.spec.source.url
          # Remove the protocol from the url
          repo = strings.replace_n({
            "https://": "",
            "http://": "",
            "git://": "",
            "ssh://": "",
          }, repo_url)

          # is the repo in the allowlist?
          allowlist := [
            good | source = input.parameters.allowedsources[_];
            good = startswith(repo, source)
          ]
          not any(allowlist)

          msg := sprintf("The Build repo has not been pre-approved: %v. Allowed sources are: %v", [repo, input.parameters.allowedsources])
        }
```

### Step 3. Create your ShipwrightAllowlist constraint

The ConstraintTemplate we created above creates a new Custom Resource Definition (CRD) called `ShipwrightAllowlist`. With this CRD created, we can define a list of allowed sources to build from!

```yaml
apiVersion: constraints.gatekeeper.sh/v1beta1
kind: ShipwrightAllowlist
metadata:
  name: shipwrightallowlist
spec:
  match:
    kinds:
      - apiGroups: ["shipwright.io"]
        kinds: ["Build"]
  parameters:
    # Remember to terminate the sources with a `/` at the end.
    # Don't include the protocol. I.e.
    # GOOD: "github.com/shipwright-io/"
    # BAD:  "https://github.com/shipwright-io"
    allowedsources:
      - "github.com/shipwright-io/"
```


### Step 4. Test it out!

#### An allowed Build

This `Build` below will be created, as is under the `github.com/shipwright-io/` organization, so it is allowed by our policy.

```yaml
# sample-go-build.yaml
apiVersion: shipwright.io/v1alpha1
kind: Build
metadata:
  name: buildah-golang-build
spec:
  source:
    # We trust github.com/shipwright-io/
    url: https://github.com/shipwright-io/sample-go
    contextDir: docker-build
  strategy:
    name: buildah
    kind: ClusterBuildStrategy
  dockerfile: Dockerfile
  output:
    image: image-registry.openshift-image-registry.svc:5000/build-examples/taxi-app
```

Create it

```sh
$ kubectl apply -f sample-go-build.yaml
build.shipwright.io/buildah-golang-build created
```

#### A disallowed Build

However the build below will not be created, as it belongs to `github.com/docker-library/`

```yaml
# hello-world-build.yaml
apiVersion: shipwright.io/v1alpha1
kind: Build
metadata:
  name: kaniko-hello-world-build
  annotations:
    build.shipwright.io/build-run-deletion: "true"
spec:
  source:
    # Not an approved source!!!
    url: https://github.com/docker-library/hello-world
    contextDir: .
  strategy:
    name: kaniko
    kind: ClusterBuildStrategy
  dockerfile: Dockerfile.build
  output:
    image: image-registry.openshift-image-registry.svc:5000/build-examples/hello-world
```

Attempting to create this will yield an error.

```sh
$ kubectl apply -f hello-world-build.yaml
Error from server ([shipwrightallowlist] The Build repo has not been pre-approved: github.com/docker-library/hello-world. Allowed sources are: ["github.com/shipwright-io/"]): error when creating "hello-world-build.yaml": admission webhook "validation.gatekeeper.sh" denied the request: [shipwrightallowlist] The Build repo has not been pre-approved: github.com/docker-library/hello-world. Allowed sources are: ["github.com/shipwright-io/"]
```


## That's it!

With just a few yaml files, we can add layers of protection to the cluster. You can checkout [Gatekeeper](https://open-policy-agent.github.io/gatekeeper/website/docs/) to learn more about the Kubernetes admission webhook, and also checkout [Open Policy Agent](https://www.openpolicyagent.org/) which powers Gatekeeper and provides the policy language.
